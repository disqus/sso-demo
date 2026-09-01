# Disqus SSO Serverless

A Cloudflare Workers serverless function that provides Disqus Single Sign-On (SSO) functionality. This project is based on the [official Disqus SSO implementation examples](https://github.com/disqus/DISQUS-API-Recipes/blob/master/sso/) and adapted for serverless deployment.  The main implementation of the SSO logic is in [packages/backend/src/sso.js](https://github.com/disqus/sso-demo/blob/main/packages/backend/src/sso.js).

## Features

- 🚀 **Serverless**: Deployed on Cloudflare Workers
- 🔐 **Secure**: HMAC-SHA1 signature generation for authentication
- 🌐 **CORS Ready**: Proper CORS handling for cross-origin requests
- 📦 **Easy Deploy**: Simple deployment with Wrangler CLI

## Quick Start

### 1. Install Dependencies

```bash
# from the monorepo root
yarn install
```

### 2. Set Up Environment Variables

Copy the environment variables template:

```bash
# from the monorepo root
cp packages/backend/.dev.vars.example packages/backend/.dev.vars
```

Edit `packages/backend/.dev.vars` and add your actual Disqus keys:

```bash
DISQUS_SECRET_KEY=your_actual_secret_key
DISQUS_PUBLIC_KEY=your_actual_public_key
```

### 3. Run Locally

```bash
# from the monorepo root
yarn dev
```

Your serverless function will be available at `http://localhost:8787`

**Production URL:** `https://sso-demo-worker.disqus-a67.workers.dev/`

### 4. Test the API
**Generate SSO Token (Local):**
```bash
curl -X POST http://localhost:8787/sso \
  -H "Content-Type: application/json" \
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

Returns a JSON SSO payload (`pubKey`, `auth`, `test`). `auth` is the `remote_auth_s3` string (`base64_message signature timestamp`). This endpoint does not return a script tag.

**Request Body:**
```json
{
  "user": {
    "id": "string", 
    "username": "string",
    "email": "string",
    "avatar": "string (optional)", // optional - link to that user's avatar. Note: URL must be less than 200 characters and must end in a valid image extension (e.g., .jpg, .png)
    "url": "string (optional)", // optional - link to user's website
    "profile_url": "string (optional)", // optional - link to the user's profile that exists on the site's own domain. This is only used if the SSO integration is linking out to user profiles that exist on the site's own domain, rather than the Disqus profile.
  }
}
```

**Response:**
```json
{
  "sso": {
    "pubKey": "your_disqus_public_key",
    "auth": "base64_message signature timestamp",
    "test": "this is a test field"
  }
}
```

## Testing

Run the test suite:

```bash
# from the monorepo root
yarn test
```

## Deployment

The backend is deployed to: **`https://sso-demo-worker.disqus-a67.workers.dev/`**

### Optional GitHub Actions deploy

The Worker is **not** deployed by a workflow in this repo today. `.github/examples/deploy-backend.yml` is a commented template you can copy to `.github/workflows/` if you want pushes under `packages/backend/` to deploy. You still need the GitHub secrets below.

**Setup:**

1. **Configure GitHub Secrets** in your repository settings (`Settings` → `Secrets and variables` → `Actions`):
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `DISQUS_SECRET_KEY`: Your Disqus secret key
   - `DISQUS_PUBLIC_KEY`: Your Disqus public key

2. **Get Cloudflare API Token:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
   - Create a token with "Edit Cloudflare Workers" permissions
   - Copy the token to the `CLOUDFLARE_API_TOKEN` secret

3. **Enable the workflow (optional):** copy `.github/examples/deploy-backend.yml` to `.github/workflows/deploy-backend.yml`, uncomment it, then:
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```

Once that workflow is enabled, a matching push will:
- Install dependencies
- Run tests
- Deploy to Cloudflare Workers
- Apply the Disqus secrets from GitHub

### Manual Deployment

If you prefer to deploy manually:

### 1. Authenticate with Cloudflare

From the monorepo root (Wrangler is a backend workspace dependency):

```bash
yarn workspace @disqus-sso/backend wrangler login
```

### 2. Set Production Secrets

```bash
yarn workspace @disqus-sso/backend wrangler secret put DISQUS_SECRET_KEY
yarn workspace @disqus-sso/backend wrangler secret put DISQUS_PUBLIC_KEY
```

### 3. Deploy

```bash
yarn deploy:backend
```

## How It Works

1. **User Data**: Your application sends user data to the `/sso` endpoint
2. **JSON Encoding**: User data is encoded as JSON and base64 encoded
3. **Signature**: An HMAC-SHA1 signature is generated using your Disqus secret key
4. **Integration**: The frontend applies `sso.auth` as `remote_auth_s3`. Comments use `DISQUS.reset`; Boards writes the flattened `disqus_boards_config` object and calls `DISQUS_BOARDS.authenticate()`.

Comments:

```
DISQUS.reset({
  reload: true,
  config: function () {
    this.page.remote_auth_s3 = newAuth;
  },
});
```

Boards:

```
window.disqus_boards_config.page = {
  api_key: pubKey,
  remote_auth_s3: newAuth,
};
window.DISQUS_BOARDS.authenticate();
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

## Security Considerations

- Never commit actual API keys to version control
- Use Wrangler secrets for production deployment
- Validate all incoming request data
- Implement rate limiting if needed
- Monitor for unusual traffic patterns

## Troubleshooting

### Common Issues

1. **Invalid signature**: Check that your secret key is correct
2. **CORS errors**: Boards needs `localhost:3002` (or `https://disqus.github.io`) on the forum's `corsAllowedOrigins`. The Worker itself sends `Access-Control-Allow-Origin: *`.
3. **Missing environment variables**: Verify `packages/backend/.dev.vars` exists and has the correct keys

## License

MIT (see the `license` field in `package.json`).

## Related Links

- [Disqus SSO Documentation](https://help.disqus.com/en/articles/1717203-single-sign-on)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Original Python Implementation](https://github.com/disqus/DISQUS-API-Recipes/blob/master/sso/python3/sso.py)
