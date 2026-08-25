# Disqus SSO Demo

A complete Disqus Single Sign-On (SSO) implementation using a Cloudflare Workers backend with comments (vanilla JavaScript or React) and a separate Boards frontend. The same Worker signs `remote_auth_s3` for both products.

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
- **disqus-react** package for seamless Disqus comments integration

### Frontend - Boards (`packages/frontend-boards/`)
- **Vanilla JavaScript** Boards embed (`boards.js`)
- Same Worker and test users as the comments demos
- **`DISQUS_BOARDS.authenticate()`** after login/logout

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
│   ├── frontend-vanilla/        # Vanilla JS comments frontend
│   │   ├── index.html          # Comments demo page
│   │   └── package.json
│   ├── frontend-boards/         # Vanilla JS Boards frontend
│   │   ├── index.html          # Boards demo page
│   │   └── package.json
│   └── frontend-react/          # React comments frontend
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
│       ├── deploy.yml          # Backend deployment example
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

# Or serve React comments frontend
yarn dev:react

# Or serve Boards frontend
yarn dev:boards
```

### 4. Test Locally
- Backend API: `http://localhost:8787`
- Vanilla comments: `http://localhost:3000` (or open `packages/frontend-vanilla/index.html`)
- React comments: `http://localhost:3001`
- Boards: `http://localhost:3002`

Login as User 1 or User 2 signs a payload via `POST /sso`. Comments apply it with `DISQUS.reset`; Boards apply it with `DISQUS_BOARDS.authenticate`. Logout uses the same hardcoded empty `remote_auth_s3` as the comments demos.

This version of Boards uses hash routing so GitHub Pages reloads keep working. The Boards shortname (`boards-ssoglitch`) must belong to the same Disqus organization as the SSO application, and its `corsAllowedOrigins` must include `https://disqus.github.io` (plus `http://localhost:3002` for local Boards).
