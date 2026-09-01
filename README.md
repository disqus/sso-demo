# Disqus SSO Demo

A complete Disqus Single Sign-On (SSO) implementation using a Cloudflare Workers backend with comments (vanilla JavaScript or React) and a separate Boards frontend. The same Worker signs `remote_auth_s3` for both products.

Live demos: [landing page](https://disqus.github.io/sso-demo/) · [vanilla comments](https://disqus.github.io/sso-demo/vanilla/) · [React comments](https://disqus.github.io/sso-demo/react/) · [Boards](https://disqus.github.io/sso-demo/boards/)

## 📋 What's Included

This monorepo contains:

### Backend (`packages/backend/`)
- **Cloudflare Workers** serverless function
- **Disqus SSO API** with HMAC-SHA1 authentication
- **CORS-enabled** endpoints for frontend integration
- **Environment variables** for secure key management
- **Tests** using Vitest

### Frontend - Vanilla JavaScript (`packages/frontend-vanilla/`)
- **Vanilla JavaScript** comments demo
- **jQuery** for AJAX calls
- **Environment detection** (localhost vs GitHub Pages)
- Host-page login/logout plus a placeholder `this.sso` object (see below)

### Frontend - React (`packages/frontend-react/`)
- **React 18** with Vite
- **Axios** for HTTP requests to the SSO backend
- **disqus-react** `DiscussionEmbed` for comments

### Frontend - Boards (`packages/frontend-boards/`)
- **Vanilla JavaScript** Boards embed (`boards.js`)
- Same Worker and test users as the comments demos
- **`DISQUS_BOARDS.authenticate()`** after host-page login/logout
- Hash routing so GitHub Pages reloads keep discussion URLs

Host-page **Login as User 1 / User 2** is the working SSO path in every frontend: `POST /sso`, then apply `remote_auth_s3`. Each page also ships a comments-recipe `this.sso` object pointed at `example.com`. That is enough for Disqus/Boards to *render* a publisher login row; it is **not** a working login or logout URL. For a real publisher login page (popup and same-tab `useRedirect`, plus return-to-current-URL) see [automatic-winner](https://github.com/chrisjtang/automatic-winner).

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
│       │   ├── App.jsx
│       │   ├── components/
│       │   │   └── DisqusSSO.jsx
│       │   └── main.jsx
│       ├── vite.config.js
│       └── package.json
├── index.html                   # Landing page for demos
├── .github/
│   ├── workflows/
│   │   └── deploy-pages.yml     # GitHub Pages (vanilla, React, Boards)
│   └── examples/
│       └── deploy-backend.yml   # Optional Workers deploy example
└── package.json                 # Monorepo configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (root `engines` field)
- Yarn
- Cloudflare account (only if you deploy the Worker yourself)
- Disqus account with SSO enabled

### 1. Clone and Install
```bash
git clone https://github.com/disqus/sso-demo.git
cd sso-demo
yarn install
```

### 2. Configure Environment
```bash
cp packages/backend/.dev.vars.example packages/backend/.dev.vars
```

Edit `packages/backend/.dev.vars` with your Disqus application's public and secret keys.

### 3. Start Development
```bash
# Start backend (Cloudflare Workers) — required for Login as User 1 / 2
yarn dev

# In another terminal, one of:
yarn dev:vanilla   # comments, http://localhost:3000
yarn dev:react     # comments, http://localhost:3001
yarn dev:boards    # Boards,   http://localhost:3002
```

Serve the frontends over HTTP (the `yarn dev:*` scripts). Opening `index.html` as a `file://` URL will not talk to the Worker or Disqus reliably.

### 4. Test Locally
- Backend API: `http://localhost:8787`
- Vanilla comments: `http://localhost:3000`
- React comments: `http://localhost:3001`
- Boards: `http://localhost:3002`

Login as User 1 or User 2 signs a payload via `POST /sso`. Comments apply it with `DISQUS.reset`; Boards apply it with `DISQUS_BOARDS.authenticate`. Logout applies the same hardcoded empty `remote_auth_s3` as the comments demos.

The Boards shortname (`boards-ssoglitch`) must belong to the same Disqus organization as the SSO application, and its `corsAllowedOrigins` must include `https://disqus.github.io` (plus `http://localhost:3002` for local Boards). Comments use the `ssoglitch` forum.
