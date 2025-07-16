# Disqus SSO Demo

A complete Disqus Single Sign-On (SSO) implementation using Cloudflare Workers and vanilla JavaScript, demonstrating how to integrate Disqus authentication with your own user system.

## 🚀 Live Demo

- **Frontend Demo**: `https://disqus.github.io/sso-demo/`
- **Backend API**: `https://sso-serverless.ctang-402.workers.dev`

## 📋 What's Included

This monorepo contains:

### Backend (`packages/backend/`)
- **Cloudflare Workers** serverless function
- **Disqus SSO API** with HMAC-SHA1 authentication
- **CORS-enabled** endpoints for frontend integration
- **Environment variables** for secure key management
- **Comprehensive tests** using Vitest

### Frontend (`packages/frontend-vanilla/`)
- **Vanilla JavaScript** demo application
- **jQuery integration** for AJAX calls
- **Environment detection** (localhost vs production)
- **Live Disqus integration** with login/logout functionality
- **Responsive design** that works on mobile and desktop

## 🛠️ Key Features

- **🔐 Secure Authentication**: HMAC-SHA1 signed payloads for Disqus SSO
- **☁️ Serverless**: Runs on Cloudflare Workers edge network
- **🌐 CORS Ready**: Configured for cross-origin requests
- **📱 Responsive**: Works on all devices
- **🔧 Environment Aware**: Automatically detects local vs production
- **⚡ Fast**: Edge-deployed with minimal latency
- **🧪 Well Tested**: Comprehensive test suite

## 🏗️ Project Structure

```
sso-demo/
├── packages/
│   ├── backend/                 # Cloudflare Workers backend
│   │   ├── src/
│   │   │   ├── index.js        # Main worker entry point
│   │   │   └── sso.js          # Disqus SSO logic
│   │   ├── test/
│   │   │   └── sso.test.js     # Test suite
│   │   ├── wrangler.toml       # Cloudflare Workers config
│   │   └── package.json
│   └── frontend-vanilla/        # Vanilla JS frontend
│       ├── index.html          # Main demo page
│       ├── src/
│       │   └── disqus-sso.js   # SSO client library
│       └── package.json
├── .github/
│   └── workflows/
│       ├── deploy.yml          # Backend deployment
│       └── deploy-pages.yml    # Frontend deployment
└── package.json                # Monorepo configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 22+ 
- Yarn package manager
- Cloudflare account (for backend deployment)
- Disqus account with SSO enabled

### 1. Clone and Install
```bash
git clone https://github.com/disqus/sso-demo.git
cd sso-demo
yarn install
```

### 2. Configure Environment
```bash
# Copy example environment file
cp packages/backend/.dev.vars.example packages/backend/.dev.vars

# Edit with your Disqus keys
nano packages/backend/.dev.vars
```

### 3. Start Development
```bash
# Start backend (Cloudflare Workers)
yarn dev

# In another terminal, serve frontend
yarn dev:vanilla
```

### 4. Test Locally
- Backend API: `http://localhost:8787`
- Frontend Demo: `http://localhost:3000` (or open `packages/frontend-vanilla/index.html`)

## 📡 API Endpoints

### `POST /sso`
Generate Disqus SSO payload for user authentication.

**Request:**
```json
{
  "user": {
    "id": "123",
    "username": "john_doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

**Response:**
```json
{
  "success": true,
  "sso": "eyJpZCI6IjEyMyIsInVzZXJuYW1lIjoi...",
  "timestamp": 1642694400
}
```

### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": 1642694400
}
```

## 🔧 Configuration

### Backend Environment Variables
```bash
# Required
DISQUS_SECRET_KEY=your_disqus_secret_key
DISQUS_PUBLIC_KEY=your_disqus_public_key

# Optional
ALLOWED_ORIGINS=https://yourdomain.com,http://localhost:3000
```

### Frontend Configuration
The frontend automatically detects the environment:
- **Development**: Uses `http://localhost:8787`
- **Production**: Uses `https://sso-serverless.ctang-402.workers.dev`

## 🚢 Deployment

### Backend (Cloudflare Workers)
Automatically deployed via GitHub Actions when you push to `main`:

1. Configure secrets in GitHub repository settings:
   - `CLOUDFLARE_API_TOKEN`
   - `DISQUS_SECRET_KEY`
   - `DISQUS_PUBLIC_KEY`

2. Push to main branch:
   ```bash
   git push origin main
   ```

### Frontend (GitHub Pages)
Automatically deployed when frontend files change:

1. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Select "GitHub Actions" as source

2. Push changes:
   ```bash
   git push origin main
   ```

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run backend tests only
yarn workspace @disqus-sso/backend test

# Run tests in watch mode
yarn workspace @disqus-sso/backend test --watch
```

## 🔒 Security

- **HMAC-SHA1 Signatures**: All SSO payloads are cryptographically signed
- **Environment Variables**: Sensitive keys stored securely
- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: All user inputs are validated
- **No Secrets in Code**: All sensitive data uses environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/disqus/sso-demo/issues)
- **Disqus SSO Docs**: [Disqus SSO Documentation](https://help.disqus.com/en/articles/1717214-single-sign-on)
- **Cloudflare Workers**: [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

## 🔗 Related

- [Disqus SSO Documentation](https://help.disqus.com/en/articles/1717214-single-sign-on)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [GitHub Pages](https://pages.github.com/)
