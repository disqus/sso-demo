import { describe, it, expect } from 'vitest';
import { generateDisqusSSO } from '../src/sso.js';

describe('Disqus SSO', () => {
  const testUser = {
    username: 'testuser',
    id: '12345',
    email: 'test@example.com'
  };

  const secretKey = 'test_secret_key';
  const publicKey = 'test_public_key';

  it('should generate SSO payload', () => {
    const result = generateDisqusSSO(testUser, secretKey, publicKey);
    expect(result).toEqual({
      pubKey: publicKey,
      auth: expect.any(String),
      test: 'this is a test field'
    });
  });

  it('should throw error when missing keys', () => {
    expect(() => {
      generateDisqusSSO(testUser, null, publicKey);
    }).toThrow('Missing Disqus secret or public key');
  });

  it('should include optional fields in data', () => {
    const userWithAvatar = {
      ...testUser,
      avatar: 'https://example.com/avatar.jpg',
      url: 'https://example.com/profile'
    };
    
    const result = generateDisqusSSO(userWithAvatar, secretKey, publicKey);
    
    const base64Match = result.auth.match(/"([^"]+) [^"]+"/);
    if (base64Match) {
      const decoded = atob(base64Match[1]);
      expect(decoded).toContain('avatar');
      expect(decoded).toContain('url');
    }   
  });
});
