# Disqus SSO Frontend - Boards

A vanilla JavaScript demo of Disqus SSO against **Boards**, using the same Cloudflare Workers backend as the comments examples.

The comments demos (`frontend-vanilla` and `frontend-react`) stay copy-pasteable publisher examples. This page is the Boards equivalent: same Worker, same test users, `boards.js` instead of `embed.js`.

Live demo: [https://disqus.github.io/sso-demo/boards/](https://disqus.github.io/sso-demo/boards/)

## Features

- **Same Worker as comments**: `POST /sso` returns `remote_auth_s3` + public key
- **Boards embed**: `boards.js` + `DISQUS_BOARDS.authenticate()`
- **Environment detection**: `http://localhost:8787` locally, production Worker on GitHub Pages
- **Hash routing**: discussion URLs live in the fragment so GitHub Pages reloads keep working

## Usage

### Local Development

1. From the monorepo root, start the Worker:
   ```bash
   yarn dev
   ```

2. Serve this page:
   ```bash
   yarn dev:boards
   ```

3. Open [http://localhost:3002](http://localhost:3002)

The Boards site (`boards-ssoglitch`) must belong to the same Disqus organization as the SSO application, and its `corsAllowedOrigins` must include `http://localhost:3002` (and `https://disqus.github.io` for the hosted demo).

You can load the page without the Worker to inspect layout. Host-page **Login as User 1 / User 2** needs the Worker.

## How It Works

There are two SSO surfaces on this page. Only the first one is wired up.

1. **Host-page buttons (working).** Login POSTs test user data to `/sso`, writes `page.api_key` / `page.remote_auth_s3` onto the flattened `disqus_boards_config` object, and calls `DISQUS_BOARDS.authenticate()`. Logout applies the same empty `remote_auth_s3` payload the comments demos use. `boards.js` reads that object on authenticate; it does not re-invoke the original config function.

2. **In-widget publisher row (`this.sso`, not a working login).** Boards renders a publisher login control when `this.sso.url` is set. This demo copies the comments recipe (`name`, `button`, `icon`, `url`, `logout` on `example.com`). Clicking that row opens or navigates to those placeholders. Production Boards prefers `sso.icon` as the 22px glyph next to the label; a 404 icon shows as a broken image instead of the fallback glyph. There is no login page here, so `useRedirect` and `return_url` are unused.

`SSO_AUTH_ONLY` is a Disqus forum setting, not something this page sends. When that flag is on, Boards hides Disqus login and (if `this.sso.url` is missing) hides publisher login and new-discussion as well.

For a publisher login page that actually signs users in — popup and same-tab `useRedirect`, returning to the current discussion — see [automatic-winner](https://github.com/chrisjtang/automatic-winner) (`/forums/` and `/forums-redirect/`).

Boards uses `routerMode: 'hash'`. `basePath` is derived from `window.location.pathname` because this file is served from `/` locally and `/sso-demo/boards/` on GitHub Pages.

## API Integration

- **Development**: `http://localhost:8787/sso`
- **Production**: `https://sso-demo-worker.disqus-a67.workers.dev/sso`
