# Disqus SSO Frontend - Boards

A vanilla JavaScript demo of Disqus SSO against **Boards**, using the same Cloudflare Workers backend as the comments examples.

The comments demos (`frontend-vanilla` and `frontend-react`) are left unchanged so they stay copy-pasteable publisher examples.

## Features

- **Same Worker as comments**: `POST /sso` returns `remote_auth_s3` + public key
- **Boards embed**: `boards.js` + `DISQUS_BOARDS.authenticate()`
- **Environment Detection**: localhost in development, production Worker on GitHub Pages

## Usage

### Local Development

1. Make sure your backend is running:
   ```bash
   yarn dev
   ```

2. Serve this page:
   ```bash
   yarn dev:boards
   ```

3. Open `http://localhost:3002`

The Boards site (`boards-ssoglitch`) must belong to the same Disqus organization as the SSO application, and its `corsAllowedOrigins` must include `http://localhost:3002` (and `https://disqus.github.io` for the hosted demo).

## How It Works

1. **Login Button**: Calls your backend API with test user data
2. **SSO Integration**: Writes `page.api_key` / `page.remote_auth_s3` onto `disqus_boards_config` and calls `DISQUS_BOARDS.authenticate()`
3. **Logout Button**: Applies the same empty SSO auth the comments demos use

Boards uses `routerMode: 'hash'` so discussion routes live in the URL fragment. `basePath` is derived from `window.location.pathname` because this page is served from `/` locally and `/sso-demo/boards/` on GitHub Pages.

## API Integration

- **Development**: `http://localhost:8787/sso`
- **Production**: `https://sso-demo-worker.disqus-a67.workers.dev/sso`
