import http from 'http';
import { handleApiRequest } from './server/api.js';

const server = http.createServer(handleApiRequest);

server.listen(3999, async () => {
  console.log('Testing API server on port 3999...');
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`FAIL: ${name} ->`, err.message);
      failed++;
    }
  }

  await test('Login with wrong password returns 401', async () => {
    const res = await fetch('http://localhost:3999/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'wrongpassword' }),
    });
    if (res.status !== 401) throw new Error(`Expected 401, got ${res.status}`);
  });

  let token = '';
  await test('Login with correct password returns 200 & JWT token', async () => {
    const res = await fetch('http://localhost:3999/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: process.env.ADMIN_PASSWORD || 'iceking2026' }),
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!data.token) throw new Error('Token missing in response');
    token = data.token;
  });

  await test('Verify token returns valid: true', async () => {
    const res = await fetch('http://localhost:3999/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!data.valid) throw new Error('Expected valid: true');
  });

  await test('Contact endpoint accepts valid booking', async () => {
    const res = await fetch('http://localhost:3999/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Lagos Festival Ltd',
        email: 'promoter@lagosfestival.com',
        eventType: 'Beach Festival',
        budget: 'NGN 10M - 25M',
        message: 'Headline performance inquiry for December 2026.',
      }),
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error('Expected success: true');
  });

  await test('Contact endpoint silently traps bots with honeypot', async () => {
    const res = await fetch('http://localhost:3999/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Spam Bot',
        email: 'spam@bot.com',
        message: 'Spam message',
        bot_trap: 'I am a bot',
      }),
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  await test('Contact endpoint rejects invalid email', async () => {
    const res = await fetch('http://localhost:3999/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test',
        email: 'not-an-email',
        message: 'Test message',
      }),
    });
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
  });

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  server.close(() => process.exit(failed > 0 ? 1 : 0));
});
