# Disqus SSO Frontend - Vanilla JavaScript

A vanilla JavaScript comments demo for Disqus SSO against a Cloudflare Workers backend.

Live demo: [https://disqus.github.io/sso-demo/vanilla/](https://disqus.github.io/sso-demo/vanilla/)

## Features

- **Environment detection**: `http://localhost:8787` locally, production Worker on GitHub Pages
- **jQuery** for AJAX and DOM updates
- Host-page login/logout with live Disqus comments (`ssoglitch`)

## Usage

### Local Development

1. From the monorepo root, start the Worker:
   ```bash
   yarn dev
   ```

2. Serve this page over HTTP:
   ```bash
   yarn dev:vanilla
   ```

3. Open [http://localhost:3000](http://localhost:3000)

Do not open `index.html` as a `file://` URL; Disqus and the Worker need an `http` origin.

### Production

GitHub Actions deploys this package to GitHub Pages on pushes that touch the frontends (see `.github/workflows/deploy-pages.yml`).

## How It Works

1. **Host-page login (working).** POSTs test user data to `/sso`, then `DISQUS.reset({ reload: true })` with the new `remote_auth_s3`.
2. **Host-page logout.** Applies the same hardcoded empty `remote_auth_s3` payload as the other demos and resets the embed. It does not call Disqus `/logout/`.
3. **`this.sso` (placeholder).** Optional comments-recipe object so Disqus can show a publisher login control. URLs and images point at `example.com` and are not a working login.

## API Integration

- **Development**: `http://localhost:8787/sso`
- **Production**: `https://sso-demo-worker.disqus-a67.workers.dev/sso`
