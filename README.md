# Disqus SSO Demo

A complete Disqus Single Sign-On (SSO) implementation using a Cloudflare Workers backend with either a vanilla JavaScript or React frontend, demonstrating how to integrate Disqus with your own user system.

Live demo at [https://disqus.github.io/sso-demo/](https://disqus.github.io/sso-demo/)

## 📋 What's Included

This monorepo contains:

### Backend (`packages/backend/`)
- **Cloudflare Workers** serverless function
- **Disqus SSO API** with HMAC-SHA1 authentication
- **CORS-enabled** endpoints for frontend integration
- **Environment variables** for secure key management
- **Comprehensive tests** using Vitest

### Frontend - Vanilla JavaScript (`packages/frontend-vanilla/`)
- **Vanilla JavaScript** demo application
- **jQuery integration** for AJAX calls
- **Environment detection** (localhost vs production)
- **Live Disqus integration** with login/logout functionality

### Frontend - React (`packages/frontend-react/`)
- **React 18** with modern hooks and functional components
- **Vite** for fast development and optimized builds
- **Axios** for HTTP requests to the SSO backend
- **disqus-react** package for seamless Disqus integration

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
│   ├── frontend-vanilla/        # Vanilla JS frontend
│   │   ├── index.html          # Vanilla JS demo page
│   │   └── package.json
│   └── frontend-react/          # React frontend
│       ├── src/
│       │   ├── App.jsx         # Main React component
│       │   ├── components/
│       │   │   └── DisqusSSO.jsx # SSO integration component
│       │   └── main.jsx        # React entry point
│       ├── vite.config.js      # Vite configuration
│       ├── eslint.config.js    # ESLint configuration
│       └── package.json
├── index.html                   # Landing page for demos
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

# In another terminal, serve vanilla frontend
yarn dev:vanilla

# Or serve React frontend
yarn dev:react
```

### 4. Test Locally
- Backend API: `http://localhost:8787`
- Vanilla Frontend: `http://localhost:3000` (or open `packages/frontend-vanilla/index.html`)
- React Frontend: `http://localhost:3001`
