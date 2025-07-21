import { createHmac } from 'crypto';

/**
 * Generate Disqus SSO authentication script
 * Based on: https://github.com/disqus/DISQUS-API-Recipes/blob/master/sso/python3/sso.py
 * 
 * @param {Object} user - User object containing username, id, and email
 * @param {string} secretKey - Disqus secret key
 * @param {string} publicKey - Disqus public key
 * @returns {string} HTML script tag for Disqus SSO
 */
export function generateDisqusSSO(user, secretKey, publicKey) {
  if (!secretKey || !publicKey) {
    throw new Error('Missing Disqus secret or public key');
  }

  // Create a JSON packet of our data attributes
  const data = JSON.stringify({
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar || undefined,
    url: user.url || undefined,
    profile_url: user.profile_url || undefined,
  });

  // Encode the data to base64
  const message = btoa(data);
  
  // Generate a timestamp for signing the message
  const timestamp = Math.floor(Date.now() / 1000);
  
  // Generate our hmac signature
  const hmac = createHmac('sha1', secretKey);
  hmac.update(`${message} ${timestamp}`);
  const sig = hmac.digest('hex');

  // Return the payload
  return {
    pubKey: publicKey,
    auth: `${message} ${sig} ${timestamp}`,
    test: 'this is a test field', // Example of an optional field
  };
}
