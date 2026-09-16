import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Load environment configuration
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'iceking2026';
const JWT_SECRET = process.env.JWT_SECRET || 'ochacho-royal-ice-secret-key-2026';
const BOOKINGS_WEBHOOK_URL = process.env.BOOKINGS_WEBHOOK_URL || '';

// In-memory rate limiter maps
const loginAttempts = new Map(); // ip -> { count, resetAt }
const contactAttempts = new Map(); // ip -> { count, resetAt }

// Clean up expired rate limit entries every 10 minutes
// .unref() allows the process to exit cleanly without waiting for this timer
const _cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of loginAttempts.entries()) {
    if (now > data.resetAt) loginAttempts.delete(ip);
  }
  for (const [ip, data] of contactAttempts.entries()) {
    if (now > data.resetAt) contactAttempts.delete(ip);
  }
}, 10 * 60 * 1000).unref();

/**
 * Timing-safe string comparison using SHA-256 hashes
 */
function timingSafeEqual(a, b) {
  const hashA = crypto.createHash('sha256').update(String(a)).digest();
  const hashB = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Generate a cryptographically signed HMAC token
 */
export function createSessionToken(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

/**
 * Verify HMAC token
 */
export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [data, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');

  try {
    const valid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
    if (!valid) return null;

    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Helper to parse JSON body from Node IncomingMessage
 */
export function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

/**
 * Helper to send JSON response
 */
function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

/**
 * Handle API requests
 */
export async function handleApiRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';

  // 1. POST /api/auth/login
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    const now = Date.now();
    const attempts = loginAttempts.get(clientIp) || { count: 0, resetAt: now + 15 * 60 * 1000 };

    if (now < attempts.resetAt && attempts.count >= 5) {
      return sendJson(res, 429, {
        error: 'Too many failed attempts. Access locked for 15 minutes.'
      });
    }

    try {
      const body = await parseJsonBody(req);
      const { password } = body;

      if (!password || !timingSafeEqual(password, ADMIN_PASSWORD)) {
        attempts.count += 1;
        loginAttempts.set(clientIp, attempts);
        return sendJson(res, 401, {
          error: 'Invalid management credentials.'
        });
      }

      // Successful login -> reset rate limit
      loginAttempts.delete(clientIp);

      const expiresAt = Date.now() + 8 * 60 * 60 * 1000; // 8 hours
      const token = createSessionToken({
        role: 'admin',
        subject: 'ice-king-management',
        exp: expiresAt,
        iat: Date.now()
      });

      return sendJson(res, 200, {
        success: true,
        token,
        expiresAt
      });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // 2. GET /api/auth/verify
  if (pathname === '/api/auth/verify' && req.method === 'GET') {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    const session = verifySessionToken(token);

    if (!session) {
      return sendJson(res, 401, { valid: false, error: 'Unauthorized or expired session' });
    }

    return sendJson(res, 200, { valid: true, user: session.role, expiresAt: session.exp });
  }

  // 3. POST /api/contact (Booking Form with Validation & Honeypot)
  if (pathname === '/api/contact' && req.method === 'POST') {
    const now = Date.now();
    const attempts = contactAttempts.get(clientIp) || { count: 0, resetAt: now + 60 * 60 * 1000 };

    if (now < attempts.resetAt && attempts.count >= 5) {
      return sendJson(res, 429, {
        error: 'Booking submission limit reached. Please email bookings@icekingochacho.com directly.'
      });
    }

    try {
      const body = await parseJsonBody(req);
      const { name, email, eventType, budget, message, bot_trap } = body;

      // Honeypot spam trap check: bots fill hidden fields
      if (bot_trap) {
        // Silently return success to waste bot resources
        return sendJson(res, 200, {
          success: true,
          message: 'Inquiry received.'
        });
      }

      // Server-side validation
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return sendJson(res, 400, { error: 'Please provide a valid contact name.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.trim())) {
        return sendJson(res, 400, { error: 'Please provide a valid email address.' });
      }

      if (!message || typeof message !== 'string' || message.trim().length < 5) {
        return sendJson(res, 400, { error: 'Please provide details about your booking inquiry.' });
      }

      attempts.count += 1;
      contactAttempts.set(clientIp, attempts);

      const submission = {
        timestamp: new Date().toISOString(),
        clientIp,
        name: name.trim().slice(0, 100),
        email: email.trim().slice(0, 150),
        eventType: (eventType || 'General Showcase').slice(0, 100),
        budget: (budget || 'Not specified').slice(0, 50),
        message: message.trim().slice(0, 2000)
      };

      // Write to persistent bookings log
      try {
        const logPath = path.resolve(process.cwd(), 'server', 'bookings.log');
        fs.appendFileSync(logPath, JSON.stringify(submission) + '\n', 'utf8');
      } catch (err) {
        console.error('Failed to log booking submission:', err);
      }

      // Dispatch to webhook if configured
      if (BOOKINGS_WEBHOOK_URL) {
        try {
          await fetch(BOOKINGS_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: `🚨 *New Booking Inquiry for Ice King Ochacho*\n*Name:* ${submission.name}\n*Email:* ${submission.email}\n*Event:* ${submission.eventType}\n*Budget:* ${submission.budget}\n*Message:* ${submission.message}`
            })
          });
        } catch (webhookErr) {
          console.error('Webhook notification error:', webhookErr);
        }
      }

      return sendJson(res, 200, {
        success: true,
        message: 'Your booking inquiry has been securely delivered to Ochacho Music Group management.'
      });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // Not found
  return sendJson(res, 404, { error: 'Not found' });
}
