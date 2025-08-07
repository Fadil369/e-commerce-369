/**
 * JWT Authentication utilities for E-Commerce 369
 * Secure authentication following BrainSAIT standards
 */

/**
 * JWT utility functions using Web Crypto API
 */
export class JWTAuth {
  constructor(secret) {
    this.secret = secret || 'fallback-secret-change-in-production';
  }

  /**
   * Generate JWT token
   */
  async generateToken(payload, expiresIn = '7d') {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const expiration = now + this.parseExpiration(expiresIn);

    const jwtPayload = {
      ...payload,
      iat: now,
      exp: expiration
    };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(jwtPayload));
    
    const signature = await this.sign(`${encodedHeader}.${encodedPayload}`);
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  /**
   * Verify JWT token
   */
  async verifyToken(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return { valid: false, error: 'Invalid token format' };
      }

      const [encodedHeader, encodedPayload, signature] = parts;
      
      // Verify signature
      const expectedSignature = await this.sign(`${encodedHeader}.${encodedPayload}`);
      if (signature !== expectedSignature) {
        return { valid: false, error: 'Invalid signature' };
      }

      // Decode payload
      const payload = JSON.parse(this.base64UrlDecode(encodedPayload));
      
      // Check expiration
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        return { valid: false, error: 'Token expired' };
      }

      return { valid: true, payload };
    } catch (error) {
      console.error('JWT validation error:', error.message);
      return { valid: false, error: 'Token validation failed' };
    }
  }

  /**
   * Refresh token if it's close to expiration
   */
  async refreshToken(token) {
    const verification = await this.verifyToken(token);
    if (!verification.valid) {
      return verification;
    }

    const { payload } = verification;
    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpiration = payload.exp - now;

    // Refresh if less than 1 day remaining
    if (timeUntilExpiration < 86400) {
      const newPayload = { ...payload };
      delete newPayload.iat;
      delete newPayload.exp;
      
      const newToken = await this.generateToken(newPayload);
      return { valid: true, token: newToken, refreshed: true };
    }

    return { valid: true, token, refreshed: false };
  }

  /**
   * Extract user from Authorization header
   */
  async extractUserFromHeader(authHeader) {
    if (!authHeader?.startsWith('Bearer ')) {
      return { valid: false, error: 'Missing or invalid authorization header' };
    }

    const token = authHeader.substring(7);
    const verification = await this.verifyToken(token);
    
    if (!verification.valid) {
      return verification;
    }

    return { valid: true, user: verification.payload };
  }

  /**
   * Sign data using HMAC SHA-256
   */
  async sign(data) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(this.secret);
    const messageData = encoder.encode(data);

    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, messageData);
    return this.base64UrlEncode(new Uint8Array(signature));
  }

  /**
   * Base64 URL encode
   */
  base64UrlEncode(data) {
    let input;
    if (typeof data === 'string') {
      input = new TextEncoder().encode(data);
    } else {
      input = data;
    }
    
    const base64 = btoa(String.fromCharCode.apply(null, input));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  /**
   * Base64 URL decode
   */
  base64UrlDecode(str) {
    const padded = str + '='.repeat((4 - str.length % 4) % 4);
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(base64);
    return new TextDecoder().decode(new Uint8Array([...binary].map(c => c.charCodeAt(0))));
  }

  /**
   * Parse expiration string to seconds
   */
  parseExpiration(expiresIn) {
    const units = {
      's': 1,
      'm': 60,
      'h': 3600,
      'd': 86400,
      'w': 604800
    };

    const match = expiresIn.match(/^(\d+)([smhdw])$/);
    if (!match) {
      return 86400; // Default to 1 day
    }

    const [, value, unit] = match;
    return parseInt(value) * units[unit];
  }
}

/**
 * Middleware for authentication
 */
export async function requireAuth(request, env) {
  const authHeader = request.headers.get('Authorization');
  const jwt = new JWTAuth(env.JWT_SECRET);
  
  const result = await jwt.extractUserFromHeader(authHeader);
  if (!result.valid) {
    return new Response(
      JSON.stringify({ error: 'Authentication required', message: result.error }),
      { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  return result.user;
}

/**
 * Middleware for admin authentication
 */
export async function requireAdmin(request, env) {
  const user = await requireAuth(request, env);
  
  if (user instanceof Response) {
    return user; // Authentication failed
  }

  if (!user.isAdmin) {
    return new Response(
      JSON.stringify({ error: 'Admin access required' }),
      { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  return user;
}

/**
 * Generate password reset token
 */
export async function generatePasswordResetToken(userId, env) {
  const jwt = new JWTAuth(env.JWT_SECRET);
  const token = await jwt.generateToken(
    { 
      userId, 
      type: 'password_reset',
      timestamp: Date.now()
    }, 
    '1h'
  );
  
  return token;
}

/**
 * Verify password reset token
 */
export async function verifyPasswordResetToken(token, env) {
  const jwt = new JWTAuth(env.JWT_SECRET);
  const result = await jwt.verifyToken(token);
  
  if (!result.valid || result.payload.type !== 'password_reset') {
    return { valid: false, error: 'Invalid reset token' };
  }
  
  return { valid: true, userId: result.payload.userId };
}
