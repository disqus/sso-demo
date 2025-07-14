import { generateDisqusSSO } from './sso.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (url.pathname === '/sso' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { user } = body;
        
        if (!user || !user.username || !user.id || !user.email) {
          return new Response(JSON.stringify({ 
            error: 'Missing required user fields: username, id, email' 
          }), {
            status: 400,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }

        const ssoScript = generateDisqusSSO(user, env.DISQUS_SECRET_KEY, env.DISQUS_PUBLIC_KEY);
        
        return new Response(JSON.stringify({ 
          sso: ssoScript 
        }), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ 
          error: 'Invalid request body' 
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ 
        status: 'ok', 
        timestamp: new Date().toISOString() 
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return new Response(JSON.stringify({
      message: 'Disqus SSO API',
      endpoints: {
        'POST /sso': 'Generate SSO token',
        'GET /health': 'Health check'
      }
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  },
};
