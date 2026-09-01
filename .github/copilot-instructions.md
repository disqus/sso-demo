# Disqus SSO Demo

Yarn workspaces monorepo: Cloudflare Worker that signs Disqus `remote_auth_s3`, plus comments (vanilla, React) and Boards frontends.

## Layout

- `packages/backend/src/index.js` — Worker HTTP handler (`POST /sso`, CORS)
- `packages/backend/src/sso.js` — HMAC-SHA1 payload (from the Disqus SSO recipes)
- `packages/backend/test/` — Vitest
- `packages/backend/wrangler.toml` — Worker config
- `packages/backend/.dev.vars.example` — local secrets template (copy to `.dev.vars`)
- `packages/frontend-vanilla/` — comments demo, `yarn dev:vanilla` → `:3000`
- `packages/frontend-react/` — comments demo, `yarn dev:react` → `:3001`
- `packages/frontend-boards/` — Boards demo, `yarn dev:boards` → `:3002`
- `index.html` — GitHub Pages landing page

Run `yarn dev` from the repo root for the Worker (`:8787`). Do not treat repo-root `src/` as the Worker; it lives under `packages/backend/`.

## Conventions

- ES modules in the Worker
- Secrets only in `.dev.vars` / Wrangler secrets, never committed
- Host-page login is the working SSO path; `this.sso` in the frontends is a comments-recipe placeholder (`example.com`), not a working publisher login
- Boards applies credentials with `DISQUS_BOARDS.authenticate()`, comments with `DISQUS.reset`
