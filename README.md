# Disqus SSO Serverless

A Cloudflare Workers serverless function that provides Disqus Single Sign-On (SSO) functionality. This project is based on the [official Disqus SSO implementation](https://github.com/disqus/DISQUS-API-Recipes/blob/master/sso/) and adapted for serverless deployment.

## Features

- 🚀 **Serverless**: Deployed on Cloudflare Workers
- 🔐 **Secure**: HMAC-SHA1 signature generation for authentication
- 🧪 **Tested**: Comprehensive test suite with Vitest
- 🌐 **CORS Ready**: Proper CORS handling for cross-origin requests
- 📦 **Easy Deploy**: Simple deployment with Wrangler CLI

## Quick Start

### 1. Install Dependencies

```bash
yarn install
```

### 2. Set Up Environment Variables

Copy the environment variables template:

```bash
cp .dev.vars.example .dev.vars
```

Edit `.dev.vars` and add your actual Disqus keys:

```bash
DISQUS_SECRET_KEY=your_actual_secret_key
DISQUS_PUBLIC_KEY=your_actual_public_key
```

### 3. Run Locally

```bash
yarn dev
```

Your serverless function will be available at `http://localhost:8787`

### 4. Test the API

**Health Check:**
```bash
curl http://localhost:8787/health
```

**Generate SSO Token:**
```bash
curl -X POST http://localhost:8787/sso \\
  -H "Content-Type: application/json" \\
  -d '{
    "user": {
      "username": "john_doe",
      "id": "12345",
      "email": "john@example.com"
    }
  }'
```

## API Endpoints

### `POST /sso`

Generates a Disqus SSO authentication script.

**Request Body:**
```json
{
  "user": {
    "username": "string",
    "id": "string", 
    "email": "string",
    "avatar": "string (optional)",
    "url": "string (optional)"
  }
}
```

**Response:**
```json
{
  "sso": "<script type=\"text/javascript\">...</script>"
}
```

### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Testing

Run the test suite:

```bash
yarn test
```

## Deployment

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
```

### 2. Authenticate with Cloudflare

```bash
wrangler auth login
```

### 3. Set Production Secrets

```bash
wrangler secret put DISQUS_SECRET_KEY
wrangler secret put DISQUS_PUBLIC_KEY
```

### 4. Deploy

```bash
yarn deploy
```

## How It Works

1. **User Data**: Your application sends user data to the `/sso` endpoint
2. **JSON Encoding**: User data is encoded as JSON and base64 encoded
3. **Signature**: An HMAC-SHA1 signature is generated using your Disqus secret key
4. **Script Generation**: A JavaScript snippet is returned that configures Disqus SSO
5. **Integration**: Include the returned script in your web page before loading Disqus

## Integration Example

```javascript
// In your frontend application
const response = await fetch('/sso', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user: {
      username: currentUser.username,
      id: currentUser.id,
      email: currentUser.email,
      avatar: currentUser.avatar
    }
  })
});

const { sso } = await response.json();

// Insert the SSO script into your page
document.head.insertAdjacentHTML('beforeend', sso);

// Then load Disqus normally
(function() {
  var d = document, s = d.createElement('script');
  s.src = 'https://YOUR_DISQUS_SHORTNAME.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISQUS_SECRET_KEY` | Your Disqus secret key | Yes |
| `DISQUS_PUBLIC_KEY` | Your Disqus public key | Yes |

## Development

### Project Structure

```
├── src/
│   ├── index.js        # Main worker entry point
│   └── sso.js          # SSO logic
├── test/
│   └── sso.test.js     # Test suite
├── .dev.vars.example   # Environment variables template
├── wrangler.toml       # Cloudflare Workers configuration
└── package.json
```

### Adding Features

1. Create new modules in `src/`
2. Add corresponding tests in `test/`
3. Update the main handler in `src/index.js`
4. Run tests with `yarn test`

## Security Considerations

- Never commit actual API keys to version control
- Use Wrangler secrets for production deployment
- Validate all incoming request data
- Implement rate limiting if needed
- Monitor for unusual traffic patterns

## Troubleshooting

### Common Issues

1. **Invalid signature**: Check that your secret key is correct
2. **CORS errors**: Ensure your frontend domain is properly configured
3. **Missing environment variables**: Verify `.dev.vars` file exists and has correct keys

### Debug Mode

Enable debug logging by setting `DEBUG=true` in your environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Related Links

- [Disqus SSO Documentation](https://help.disqus.com/en/articles/1717203-single-sign-on)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Original Python Implementation](https://github.com/disqus/DISQUS-API-Recipes/blob/master/sso/python3/sso.py)
