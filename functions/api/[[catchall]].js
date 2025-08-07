// Cloudflare Worker for API routes
// This file handles serverless API endpoints for the e-commerce platform

import {
  validateProduct,
  validateOrder,
  sanitizeInput,
  RateLimit,
  validateEmail,
  validatePassword
} from '../utils/validation.js';
import {
  JWTAuth,
  requireAuth,
  requireAdmin,
  hashPassword,
  verifyPassword
} from '../utils/auth.js';
import { PaymentProcessor } from '../utils/payments.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS headers for cross-origin requests
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Content-Type": "application/json",
    };

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route handling
      if (pathname.startsWith("/api/products")) {
        return handleProducts(request, env, corsHeaders);
      }
      if (pathname.startsWith("/api/cart")) {
        return handleCart(request, env, corsHeaders);
      }
      if (pathname.startsWith("/api/orders")) {
        return handleOrders(request, env, corsHeaders);
      }
      if (pathname.startsWith("/api/auth")) {
        return handleAuth(request, env, corsHeaders);
      }
      if (pathname.startsWith("/api/payments")) {
        return handlePayments(request, env, corsHeaders);
      }

      return new Response("Not Found", {
        status: 404,
        headers: corsHeaders,
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: "Internal Server Error",
          message: error.message,
        }),
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }
  },
};

// Product management functions with validation and auth
async function handleProducts(request, env, corsHeaders) {
  const url = new URL(request.url);
  const productId = url.pathname.split("/").pop();

  // Rate limiting
  const rateLimit = new RateLimit(env.SESSIONS);
  const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
  const rateLimitResult = await rateLimit.checkLimit(`products:${clientIP}`, 60, 60000);

  if (!rateLimitResult.allowed) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded', resetTime: rateLimitResult.resetTime }),
      { status: 429, headers: corsHeaders }
    );
  }

  if (request.method === "GET") {
    if (productId && productId !== "products") {
      // Get single product
      const product = await getProductFromDB(productId, env.DB);
      if (!product) {
        return new Response(
          JSON.stringify({ error: 'Product not found' }),
          { status: 404, headers: corsHeaders }
        );
      }
      return new Response(JSON.stringify(product), { headers: corsHeaders });
    }

    // Get all products with pagination and validation
    const page = Math.max(1, parseInt(url.searchParams.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit")) || 20));
    const category = sanitizeInput(url.searchParams.get("category") || '');
    const search = sanitizeInput(url.searchParams.get("search") || '');

    const products = await getProductsFromDB(
      { page, limit, category, search },
      env.DB
    );
    return new Response(JSON.stringify(products), { headers: corsHeaders });
  }

  if (request.method === "POST") {
    // Create new product (admin only)
    const adminAuth = await requireAdmin(request, env);
    if (adminAuth instanceof Response) {
      return adminAuth; // Return auth error
    }

    try {
      const newProduct = await request.json();
      const created = await createProductInDB(newProduct, env.DB);

      if (!created.success) {
        return new Response(
          JSON.stringify({ error: created.error }),
          { status: 400, headers: corsHeaders }
        );
      }

      return new Response(JSON.stringify(created), {
        status: 201,
        headers: corsHeaders,
      });
    } catch (error) {
      console.error('Product creation error:', error.message);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON data' }),
        { status: 400, headers: corsHeaders }
      );
    }
  }

  return new Response("Method Not Allowed", {
    status: 405,
    headers: corsHeaders,
  });
}

// Cart management with Durable Objects
async function handleCart(request, env, corsHeaders) {
  const url = new URL(request.url);
  const cartId = url.pathname.split("/").pop();

  // Get cart Durable Object
  const cartObjectId = env.CART_MANAGER.idFromString(cartId);
  const cartObject = env.CART_MANAGER.get(cartObjectId);

  if (request.method === "GET") {
    const cart = await cartObject.fetch(request);
    return new Response(await cart.text(), { headers: corsHeaders });
  }

  if (request.method === "POST") {
    const addResponse = await cartObject.fetch(request);
    return new Response(await addResponse.text(), { headers: corsHeaders });
  }

  if (request.method === "DELETE") {
    const deleteResponse = await cartObject.fetch(request);
    return new Response(await deleteResponse.text(), { headers: corsHeaders });
  }

  return new Response("Method Not Allowed", {
    status: 405,
    headers: corsHeaders,
  });
}

// Order processing with authentication and validation
async function handleOrders(request, env, corsHeaders) {
  if (request.method === "POST") {
    // Authentication required for creating orders
    const user = await requireAuth(request, env);
    if (user instanceof Response) {
      return user; // Return auth error
    }

    try {
      const orderData = await request.json();

      // Add user ID to order
      orderData.user_id = user.userId;

      // Validate order data
      const validation = validateOrder(orderData);
      if (!validation.valid) {
        return new Response(
          JSON.stringify({
            error: 'Invalid order data',
            details: validation.errors
          }),
          { status: 400, headers: corsHeaders }
        );
      }

      // Process payment first
      const paymentResult = await processPayment(orderData.payment, env);

      if (paymentResult.success) {
        // Create order in database
        const order = await createOrderInDB(orderData, env.DB);

        if (!order.success) {
          return new Response(
            JSON.stringify({
              error: 'Failed to create order',
              details: order.error
            }),
            { status: 500, headers: corsHeaders }
          );
        }

        // Clear cart
        await clearCartInKV(orderData.cartId, env.SESSIONS);

        return new Response(JSON.stringify({
          ...order,
          payment: {
            transaction_id: paymentResult.transactionId,
            status: paymentResult.status
          }
        }), {
          status: 201,
          headers: corsHeaders,
        });
      }

      return new Response(
        JSON.stringify({
          error: "Payment failed",
          details: paymentResult.error,
        }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    } catch (error) {
      console.error('Order processing error:', error.message);
      return new Response(
        JSON.stringify({ error: 'Invalid request data' }),
        { status: 400, headers: corsHeaders }
      );
    }
  }

  if (request.method === "GET") {
    // Get user orders - authentication required
    const user = await requireAuth(request, env);
    if (user instanceof Response) {
      return user; // Return auth error
    }

    const orders = await getUserOrdersFromDB(user.userId, env.DB);
    return new Response(JSON.stringify(orders), { headers: corsHeaders });
  }

  return new Response("Method Not Allowed", {
    status: 405,
    headers: corsHeaders,
  });
}

// Authentication handling with proper validation
async function handleAuth(request, env, corsHeaders) {
  const url = new URL(request.url);
  const endpoint = url.pathname.split("/").pop();

  // Rate limiting for auth endpoints
  const rateLimit = new RateLimit(env.SESSIONS);
  const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
  const rateLimitResult = await rateLimit.checkLimit(`auth:${clientIP}`, 10, 900000); // 10 attempts per 15 minutes

  if (!rateLimitResult.allowed) {
    return new Response(
      JSON.stringify({
        error: 'Too many authentication attempts',
        resetTime: rateLimitResult.resetTime
      }),
      { status: 429, headers: corsHeaders }
    );
  }

  if (endpoint === "login") {
    try {
      const loginData = await request.json();
      const loginResult = await authenticateUser(loginData, env.DB);

      const statusCode = loginResult.success ? 200 : 401;
      return new Response(JSON.stringify(loginResult), {
        status: statusCode,
        headers: corsHeaders
      });
    } catch (error) {
      console.error('Login error:', error.message);
      return new Response(
        JSON.stringify({ error: 'Invalid request data' }),
        { status: 400, headers: corsHeaders }
      );
    }
  }

  if (endpoint === "register") {
    try {
      const registerData = await request.json();
      const registerResult = await createUser(registerData, env.DB);

      const statusCode = registerResult.success ? 201 : 400;
      return new Response(JSON.stringify(registerResult), {
        status: statusCode,
        headers: corsHeaders,
      });
    } catch (error) {
      console.error('Registration error:', error.message);
      return new Response(
        JSON.stringify({ error: 'Invalid request data' }),
        { status: 400, headers: corsHeaders }
      );
    }
  }

  if (endpoint === "profile") {
    // Get user profile - authentication required
    const user = await requireAuth(request, env);
    if (user instanceof Response) {
      return user; // Return auth error
    }

    const profile = await getUserProfile(user.userId, env.DB);
    return new Response(JSON.stringify(profile), { headers: corsHeaders });
  }

  return new Response("Not Found", {
    status: 404,
    headers: corsHeaders,
  });
}

// Payment processing for Saudi market with validation
async function handlePayments(request, env, corsHeaders) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  // Authentication required for payments
  const user = await requireAuth(request, env);
  if (user instanceof Response) {
    return user; // Return auth error
  }

  try {
    const paymentData = await request.json();

    // Validate required fields
    if (!paymentData.method || !paymentData.amount || !paymentData.orderId) {
      return new Response(
        JSON.stringify({
          error: 'Missing required payment data',
          required: ['method', 'amount', 'orderId']
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Add user context to payment
    paymentData.userId = user.userId;
    paymentData.userEmail = user.email;

    // Process payment using appropriate method
    let result;
    if (paymentData.method === "mada") {
      result = await processMadaPayment(paymentData, env);
    } else if (paymentData.method === "stc_pay") {
      result = await processStcPayment(paymentData, env);
    } else if (paymentData.method === "stripe") {
      result = await processStripePayment(paymentData, env);
    } else if (paymentData.method === "paypal") {
      result = await processPayPalPayment(paymentData, env);
    } else {
      return new Response(
        JSON.stringify({
          error: "Unsupported payment method",
          supportedMethods: ['mada', 'stc_pay', 'stripe', 'paypal']
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const statusCode = result.success ? 200 : 400;
    return new Response(JSON.stringify(result), {
      status: statusCode,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Payment processing error:', error.message);
    return new Response(
      JSON.stringify({ error: 'Invalid payment request' }),
      { status: 400, headers: corsHeaders }
    );
  }
}

// Database helper functions (implement based on your schema)
async function getProductFromDB(id, db) {
  const result = await db
    .prepare("SELECT * FROM products WHERE id = ?")
    .bind(id)
    .first();
  return result;
}

async function getProductsFromDB(params, db) {
  let query = "SELECT * FROM products WHERE 1=1";
  const bindings = [];

  if (params.category) {
    query += " AND category = ?";
    bindings.push(params.category);
  }

  if (params.search) {
    query += " AND (name LIKE ? OR description LIKE ?)";
    bindings.push(`%${params.search}%`, `%${params.search}%`);
  }

  query += " LIMIT ? OFFSET ?";
  bindings.push(params.limit, (params.page - 1) * params.limit);

  const result = await db
    .prepare(query)
    .bind(...bindings)
    .all();
  return result.results;
}

// Payment processing implementations using real payment providers
async function processPayment(paymentData, env) {
  const processor = new PaymentProcessor(env);
  return await processor.processPayment(paymentData);
}

async function processMadaPayment(paymentData, env) {
  const processor = new PaymentProcessor(env);
  return await processor.processPayment({ ...paymentData, method: 'mada' });
}

async function processStcPayment(paymentData, env) {
  const processor = new PaymentProcessor(env);
  return await processor.processPayment({ ...paymentData, method: 'stc_pay' });
}

async function processStripePayment(paymentData, env) {
  const processor = new PaymentProcessor(env);
  return await processor.processPayment({ ...paymentData, method: 'stripe' });
}

async function processPayPalPayment(paymentData, env) {
  const processor = new PaymentProcessor(env);
  return await processor.processPayment({ ...paymentData, method: 'paypal' });
}

// Database operation implementations
async function createProductInDB(product, db) {
  try {
    // Validate product data
    const validation = validateProduct(product);
    if (!validation.valid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = await db
      .prepare(`
        INSERT INTO products
        (name_ar, name_en, description_ar, description_en, price, category, sku, stock_quantity, image_urls, sizes, colors, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        product.name_ar,
        product.name_en,
        product.description_ar || '',
        product.description_en || '',
        product.price,
        product.category,
        product.sku,
        product.stock_quantity || 0,
        JSON.stringify(product.image_urls || []),
        JSON.stringify(product.sizes || []),
        JSON.stringify(product.colors || []),
        product.featured || false
      )
      .run();

    return {
      success: true,
      id: result.meta.last_row_id,
      product: { ...product, id: result.meta.last_row_id }
    };
  } catch (error) {
    console.error('Create product error:', error.message);
    return { success: false, error: error.message };
  }
}

async function createOrderInDB(orderData, db) {
  try {
    // Validate order data
    const validation = validateOrder(orderData);
    if (!validation.valid) {
      throw new Error(`Order validation failed: ${validation.errors.join(', ')}`);
    }

    // Calculate total amount
    const totalAmount = orderData.items.reduce((sum, item) =>
      sum + (item.price * item.quantity), 0
    );

    // Create order
    const orderResult = await db
      .prepare(`
        INSERT INTO orders
        (user_id, total_amount, payment_method, shipping_address, billing_address, status)
        VALUES (?, ?, ?, ?, ?, 'pending')
      `)
      .bind(
        orderData.user_id,
        totalAmount,
        orderData.payment_method,
        JSON.stringify(orderData.shipping_address),
        JSON.stringify(orderData.billing_address || orderData.shipping_address)
      )
      .run();

    const orderId = orderResult.meta.last_row_id;

    // Create order items
    for (const item of orderData.items) {
      await db
        .prepare(`
          INSERT INTO order_items
          (order_id, product_id, quantity, price, size, color)
          VALUES (?, ?, ?, ?, ?, ?)
        `)
        .bind(
          orderId,
          item.product_id,
          item.quantity,
          item.price,
          item.size || null,
          item.color || null
        )
        .run();

      // Update product stock
      await db
        .prepare(`
          UPDATE products
          SET stock_quantity = stock_quantity - ?
          WHERE id = ? AND stock_quantity >= ?
        `)
        .bind(item.quantity, item.product_id, item.quantity)
        .run();
    }

    return {
      success: true,
      id: orderId,
      total_amount: totalAmount,
      status: 'pending'
    };
  } catch (error) {
    console.error('Create order error:', error.message);
    return { success: false, error: error.message };
  }
}

async function clearCartInKV(cartId, kv) {
  try {
    await kv.delete(`cart:${cartId}`);
    return { success: true };
  } catch (error) {
    console.error('Clear cart error:', error.message);
    return { success: false, error: error.message };
  }
}

async function getUserOrdersFromDB(userId, db) {
  try {
    const orders = await db
      .prepare(`
        SELECT o.*, GROUP_CONCAT(
          json_object(
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'size', oi.size,
            'color', oi.color
          )
        ) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.user_id = ?
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `)
      .bind(userId)
      .all();

    return {
      success: true,
      orders: orders.results.map(order => ({
        ...order,
        items: order.items ? order.items.split(',').map(item => JSON.parse(item)) : [],
        shipping_address: JSON.parse(order.shipping_address),
        billing_address: JSON.parse(order.billing_address)
      }))
    };
  } catch (error) {
    console.error('Get user orders error:', error.message);
    return { success: false, error: error.message, orders: [] };
  }
}

async function authenticateUser(loginData, db) {
  try {
    const { email, password } = loginData;

    // Validate input
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return { success: false, error: emailValidation.error };
    }

    // Get user from database
    const user = await db
      .prepare('SELECT * FROM users WHERE email = ?')
      .bind(emailValidation.value)
      .first();

    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Verify password
    const passwordValid = await verifyPassword(password, user.password_hash);
    if (!passwordValid) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Generate JWT token
    const jwt = new JWTAuth(process.env.JWT_SECRET);
    const token = await jwt.generateToken({
      userId: user.id,
      email: user.email,
      isAdmin: user.email === 'admin@e-commerce-369.com' // Simple admin check
    });

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        preferred_language: user.preferred_language
      }
    };
  } catch (error) {
    console.error('Authentication error:', error.message);
    return { success: false, error: 'Authentication failed' };
  }
}

async function createUser(userData, db) {
  try {
    const { email, password, first_name, last_name, phone, preferred_language = 'ar' } = userData;

    // Validate inputs
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return { success: false, error: emailValidation.error };
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.error };
    }

    // Check if user already exists
    const existingUser = await db
      .prepare('SELECT id FROM users WHERE email = ?')
      .bind(emailValidation.value)
      .first();

    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const result = await db
      .prepare(`
        INSERT INTO users
        (email, password_hash, first_name, last_name, phone, preferred_language)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .bind(
        emailValidation.value,
        passwordHash,
        sanitizeInput(first_name),
        sanitizeInput(last_name),
        sanitizeInput(phone || ''),
        preferred_language
      )
      .run();

    return {
      success: true,
      id: result.meta.last_row_id,
      message: 'User created successfully'
    };
  } catch (error) {
    console.error('Create user error:', error.message);
    return { success: false, error: 'Failed to create user' };
  }
}

async function getUserProfile(userId, db) {
  try {
    const user = await db
      .prepare(`
        SELECT id, email, first_name, last_name, phone, preferred_language, created_at
        FROM users WHERE id = ?
      `)
      .bind(userId)
      .first();

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, user };
  } catch (error) {
    console.error('Get user profile error:', error.message);
    return { success: false, error: 'Failed to get user profile' };
  }
}
