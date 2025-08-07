/**
 * Input validation and security utilities for E-Commerce 369
 * Follows BrainSAIT security standards with HIPAA-level data protection
 */

// Input validation schemas
export const ValidationSchemas = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^(\+966|966|05|06|07|08|09)\d{8}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  sku: /^[A-Z]{2}\d{3,6}$/,
  arabicText: /^[\u0600-\u06FF\s]+$/,
  price: /^\d+(\.\d{1,2})?$/,
  quantity: /^[1-9]\d*$/
};

/**
 * Sanitize input to prevent XSS attacks
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;

  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Validate email format
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const sanitized = sanitizeInput(email.toLowerCase());
  if (!ValidationSchemas.email.test(sanitized)) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true, value: sanitized };
}

/**
 * Validate Saudi phone number
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Phone number is required' };
  }

  const cleaned = phone.replace(/[\s-()]/g, '');
  if (!ValidationSchemas.phone.test(cleaned)) {
    return { valid: false, error: 'Invalid Saudi phone number format' };
  }

  return { valid: true, value: cleaned };
}

/**
 * Validate password strength
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long' };
  }

  if (!ValidationSchemas.password.test(password)) {
    return {
      valid: false,
      error: 'Password must contain uppercase, lowercase, number, and special character'
    };
  }

  return { valid: true };
}

/**
 * Validate product data
 */
export function validateProduct(product) {
  const errors = [];

  // Required fields
  if (!product.name_ar || !ValidationSchemas.arabicText.test(product.name_ar)) {
    errors.push('Valid Arabic name is required');
  }

  if (!product.name_en || product.name_en.length < 2) {
    errors.push('Valid English name is required');
  }

  if (!product.price || !ValidationSchemas.price.test(product.price.toString())) {
    errors.push('Valid price is required');
  }

  if (!product.sku || !ValidationSchemas.sku.test(product.sku)) {
    errors.push('Valid SKU format required (e.g., AB001)');
  }

  if (product.stock_quantity !== undefined && !ValidationSchemas.quantity.test(product.stock_quantity.toString())) {
    errors.push('Valid stock quantity required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate order data
 */
export function validateOrder(order) {
  const errors = [];

  if (!order.user_id || !Number.isInteger(order.user_id)) {
    errors.push('Valid user ID is required');
  }

  if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
    errors.push('Order must contain at least one item');
  }

  if (!order.shipping_address || typeof order.shipping_address !== 'object') {
    errors.push('Valid shipping address is required');
  }

  if (!order.payment_method || !['mada', 'stc_pay', 'stripe', 'paypal'].includes(order.payment_method)) {
    errors.push('Valid payment method is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Rate limiting utility
 */
export class RateLimit {
  constructor(kv) {
    this.kv = kv;
  }

  async checkLimit(key, limit = 10, windowMs = 60000) {
    const now = Date.now();
    const windowStart = now - windowMs;

    const requestsData = await this.kv.get(`rate_limit:${key}`);
    let requests = requestsData ? JSON.parse(requestsData) : [];

    // Remove old requests outside the window
    requests = requests.filter(timestamp => timestamp > windowStart);

    if (requests.length >= limit) {
      return { allowed: false, resetTime: requests[0] + windowMs };
    }

    // Add current request
    requests.push(now);

    // Store updated requests with TTL
    await this.kv.put(
      `rate_limit:${key}`,
      JSON.stringify(requests),
      { expirationTtl: Math.ceil(windowMs / 1000) }
    );

    return { allowed: true, remaining: limit - requests.length };
  }
}

/**
 * CSRF token validation
 */
export function generateCSRFToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function validateCSRFToken(provided, expected) {
  if (!provided || !expected) return false;
  return provided === expected;
}

/**
 * SQL injection prevention
 */
export function escapeSQLValue(value) {
  if (typeof value === 'string') {
    return value.replace(/'/g, "''");
  }
  return value;
}

/**
 * Data encryption utilities for sensitive data
 */
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + process.env.SALT_SECRET || 'fallback_salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password, hash) {
  const hashedInput = await hashPassword(password);
  return hashedInput === hash;
}

/**
 * Generate secure random tokens
 */
export function generateSecureToken(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
