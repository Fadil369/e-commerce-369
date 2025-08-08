// Cloudflare Pages Functions Configuration
// This middleware only applies to API routes, not static pages

export const onRequest = [
  // CORS middleware for API routes
  corsMiddleware,
  // Logging middleware
  loggingMiddleware,
];

// CORS middleware for cross-origin requests
async function corsMiddleware({ request, next }) {
  const url = new URL(request.url);
  
  // Only apply to API routes
  if (!url.pathname.startsWith('/api/')) {
    return next();
  }

  const response = await next();

  // Set CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods", 
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: response.headers,
    });
  }

  return response;
}

// Logging middleware for monitoring
async function loggingMiddleware({ request, next }) {
  const url = new URL(request.url);
  
  // Only log API requests to avoid spam
  if (!url.pathname.startsWith('/api/')) {
    return next();
  }

  const start = Date.now();
  const response = await next();
  const duration = Date.now() - start;

  // Log request details
  console.log(
    JSON.stringify({
      method: request.method,
      url: request.url,
      status: response.status,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    })
  );

  return response;
}
