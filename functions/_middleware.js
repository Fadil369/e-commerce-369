// Cloudflare Pages Functions Configuration
// This file configures middleware and edge functions for the e-commerce platform

export const onRequest = [
  // CORS middleware for API routes
  corsMiddleware,
  // Authentication middleware
  authMiddleware,
  // Rate limiting middleware
  rateLimitMiddleware,
  // Logging middleware
  loggingMiddleware,
];

// CORS middleware for cross-origin requests
async function corsMiddleware({ request, next }) {
  const response = await next();
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: response.headers,
    });
  }
  
  return response;
}

// Authentication middleware
async function authMiddleware({ request, next, env }) {
  const url = new URL(request.url);
  
  // Skip authentication for public routes
  const publicRoutes = ['/api/products', '/api/auth/login', '/api/auth/register'];
  const isPublicRoute = publicRoutes.some(route => url.pathname.startsWith(route));
  
  if (isPublicRoute || request.method === 'GET') {
    return next();
  }
  
  // Check for authorization header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // Verify JWT token (implement actual verification)
  const token = authHeader.substring(7);
  const user = await verifyJwtToken(token, env.JWT_SECRET);
  
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // Add user to request context
  request.user = user;
  return next();
}

// Rate limiting middleware
async function rateLimitMiddleware({ request, next, env }) {
  const clientIP = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For');
  const key = `rate_limit:${clientIP}`;
  
  // Get current count from KV
  const current = await env.CACHE.get(key);
  const count = current ? parseInt(current) : 0;
  
  // Check rate limit (100 requests per minute)
  if (count >= 100) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // Increment counter
  await env.CACHE.put(key, (count + 1).toString(), { expirationTtl: 60 });
  
  const response = await next();
  
  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', '100');
  response.headers.set('X-RateLimit-Remaining', (99 - count).toString());
  
  return response;
}

// Logging middleware
async function loggingMiddleware({ request, next }) {
  const start = Date.now();
  const response = await next();
  const duration = Date.now() - start;
  
  // Log request details
  console.log(JSON.stringify({
    method: request.method,
    url: request.url,
    status: response.status,
    duration: `${duration}ms`,
    userAgent: request.headers.get('User-Agent'),
    ip: request.headers.get('CF-Connecting-IP'),
    country: request.cf?.country,
    timestamp: new Date().toISOString(),
  }));
  
  return response;
}

// JWT token verification (implement with actual JWT library)
async function verifyJwtToken(token, secret) {
  try {
    // This is a placeholder - implement actual JWT verification
    // You might want to use a JWT library compatible with Cloudflare Workers
    return { id: 1, email: 'user@example.com' };
  } catch (error) {
    return null;
  }
}
