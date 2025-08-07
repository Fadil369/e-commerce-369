// Cloudflare Worker for API routes
// This file handles serverless API endpoints for the e-commerce platform

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS headers for cross-origin requests
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route handling
      if (pathname.startsWith('/api/products')) {
        return handleProducts(request, env, corsHeaders);
      } 
      if (pathname.startsWith('/api/cart')) {
        return handleCart(request, env, corsHeaders);
      } 
      if (pathname.startsWith('/api/orders')) {
        return handleOrders(request, env, corsHeaders);
      } 
      if (pathname.startsWith('/api/auth')) {
        return handleAuth(request, env, corsHeaders);
      } 
      if (pathname.startsWith('/api/payments')) {
        return handlePayments(request, env, corsHeaders);
      }

      return new Response('Not Found', { 
        status: 404, 
        headers: corsHeaders 
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: 'Internal Server Error',
        message: error.message 
      }), { 
        status: 500, 
        headers: corsHeaders 
      });
    }
  },
};

// Product management functions
async function handleProducts(request, env, corsHeaders) {
  const url = new URL(request.url);
  const productId = url.pathname.split('/').pop();

  if (request.method === 'GET') {
    if (productId && productId !== 'products') {
      // Get single product
      const product = await getProductFromDB(productId, env.DB);
      return new Response(JSON.stringify(product), { headers: corsHeaders });
    }
    // Get all products with pagination
    const page = url.searchParams.get('page') || 1;
    const limit = url.searchParams.get('limit') || 20;
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    
    const products = await getProductsFromDB({ page, limit, category, search }, env.DB);
    return new Response(JSON.stringify(products), { headers: corsHeaders });
  }

  if (request.method === 'POST') {
    // Create new product (admin only)
    const newProduct = await request.json();
    const created = await createProductInDB(newProduct, env.DB);
    return new Response(JSON.stringify(created), { 
      status: 201, 
      headers: corsHeaders 
    });
  }

  return new Response('Method Not Allowed', { 
    status: 405, 
    headers: corsHeaders 
  });
}

// Cart management with Durable Objects
async function handleCart(request, env, corsHeaders) {
  const url = new URL(request.url);
  const cartId = url.pathname.split('/').pop();

  // Get cart Durable Object
  const cartObjectId = env.CART_MANAGER.idFromString(cartId);
  const cartObject = env.CART_MANAGER.get(cartObjectId);

  if (request.method === 'GET') {
    const cart = await cartObject.fetch(request);
    return new Response(await cart.text(), { headers: corsHeaders });
  }

  if (request.method === 'POST') {
    const addResponse = await cartObject.fetch(request);
    return new Response(await addResponse.text(), { headers: corsHeaders });
  }

  if (request.method === 'DELETE') {
    const deleteResponse = await cartObject.fetch(request);
    return new Response(await deleteResponse.text(), { headers: corsHeaders });
  }

  return new Response('Method Not Allowed', { 
    status: 405, 
    headers: corsHeaders 
  });
}

// Order processing
async function handleOrders(request, env, corsHeaders) {
  if (request.method === 'POST') {
    const orderData = await request.json();
    
    // Process payment first
    const paymentResult = await processPayment(orderData.payment, env);
    
    if (paymentResult.success) {
      // Create order in database
      const order = await createOrderInDB(orderData, env.DB);
      
      // Clear cart
      await clearCartInKV(orderData.cartId, env.SESSIONS);
      
      return new Response(JSON.stringify(order), { 
        status: 201, 
        headers: corsHeaders 
      });
    }
    return new Response(JSON.stringify({ 
      error: 'Payment failed',
      details: paymentResult.error 
    }), { 
      status: 400, 
      headers: corsHeaders 
    });
  }

  if (request.method === 'GET') {
    // Get user orders
    const userId = request.headers.get('X-User-ID');
    const orders = await getUserOrdersFromDB(userId, env.DB);
    return new Response(JSON.stringify(orders), { headers: corsHeaders });
  }

  return new Response('Method Not Allowed', { 
    status: 405, 
    headers: corsHeaders 
  });
}

// Authentication handling
async function handleAuth(request, env, corsHeaders) {
  const url = new URL(request.url);
  const endpoint = url.pathname.split('/').pop();

  if (endpoint === 'login') {
    const loginData = await request.json();
    const loginResult = await authenticateUser(loginData, env.DB);
    return new Response(JSON.stringify(loginResult), { headers: corsHeaders });
  }

  if (endpoint === 'register') {
    const registerData = await request.json();
    const registerResult = await createUser(registerData, env.DB);
    return new Response(JSON.stringify(registerResult), { 
      status: 201, 
      headers: corsHeaders 
    });
  }

  if (endpoint === 'profile') {
    const userId = request.headers.get('X-User-ID');
    const profile = await getUserProfile(userId, env.DB);
    return new Response(JSON.stringify(profile), { headers: corsHeaders });
  }

  return new Response('Not Found', { 
    status: 404, 
    headers: corsHeaders 
  });
}

// Payment processing for Saudi market
async function handlePayments(request, env, corsHeaders) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  const paymentData = await request.json();
  
  // Support for multiple payment methods
  let result;
  if (paymentData.method === 'mada') {
    result = await processMadaPayment(paymentData, env);
  } else if (paymentData.method === 'stc_pay') {
    result = await processStcPayment(paymentData, env);
  } else if (paymentData.method === 'stripe') {
    result = await processStripePayment(paymentData, env);
  } else if (paymentData.method === 'paypal') {
    result = await processPayPalPayment(paymentData, env);
  } else {
    return new Response(JSON.stringify({ 
      error: 'Unsupported payment method' 
    }), { 
      status: 400, 
      headers: corsHeaders 
    });
  }

  return new Response(JSON.stringify(result), { headers: corsHeaders });
}

// Database helper functions (implement based on your schema)
async function getProductFromDB(id, db) {
  const result = await db.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();
  return result;
}

async function getProductsFromDB(params, db) {
  let query = 'SELECT * FROM products WHERE 1=1';
  const bindings = [];
  
  if (params.category) {
    query += ' AND category = ?';
    bindings.push(params.category);
  }
  
  if (params.search) {
    query += ' AND (name LIKE ? OR description LIKE ?)';
    bindings.push(`%${params.search}%`, `%${params.search}%`);
  }
  
  query += ' LIMIT ? OFFSET ?';
  bindings.push(params.limit, (params.page - 1) * params.limit);
  
  const result = await db.prepare(query).bind(...bindings).all();
  return result.results;
}

// Payment processing stubs - implement with actual payment providers
async function processPayment(paymentData, env) {
  return { success: true };
}

async function processMadaPayment(paymentData, env) {
  return { success: true };
}

async function processStcPayment(paymentData, env) {
  return { success: true };
}

async function processStripePayment(paymentData, env) {
  return { success: true };
}

async function processPayPalPayment(paymentData, env) {
  return { success: true };
}

// Database operation stubs
async function createProductInDB(product, db) {
  return { id: 1 };
}

async function createOrderInDB(orderData, db) {
  return { id: 1 };
}

async function clearCartInKV(cartId, kv) {
  return true;
}

async function getUserOrdersFromDB(userId, db) {
  return [];
}

async function authenticateUser(loginData, db) {
  return { success: true };
}

async function createUser(userData, db) {
  return { id: 1 };
}

async function getUserProfile(userId, db) {
  return { id: 1 };
}
