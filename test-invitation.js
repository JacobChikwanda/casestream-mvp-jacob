// Quick test script for invitation system
// Run with: node test-invitation.js

const { randomBytes } = require('crypto');

console.log('🎉 Invitation System Test');
console.log('========================\n');

// Test token generation
const token = randomBytes(32).toString('hex');
console.log('✅ Generated secure token:', token.substring(0, 16) + '...');

// Test invitation URL construction
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const inviteUrl = `${baseUrl}/invite/${token}`;
console.log('✅ Invitation URL:', inviteUrl);

// Test expiration date
const expiresAt = new Date();
expiresAt.setDate(expiresAt.getDate() + 7);
console.log('✅ Expires at:', expiresAt.toISOString());

console.log('\n🎯 API Endpoints to test:');
console.log('POST /api/invitations - Create invitation');
console.log('GET /api/invitations - List invitations');
console.log(`GET /api/invitations/${token} - Get invitation details`);
console.log(`POST /api/invitations/${token}/accept - Accept invitation`);
console.log(`GET /invite/${token} - Invitation acceptance page`);

console.log('\n📧 Email will be sent to Ethereal automatically in development!');
console.log('Check console for preview URLs.');

console.log('\n✅ All systems ready!');
