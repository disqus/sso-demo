# Disqus SSO Frontend - React

A React comments demo for Disqus SSO, built with Vite and `disqus-react`.

Live demo: [https://disqus.github.io/sso-demo/react/](https://disqus.github.io/sso-demo/react/)

## Features

- **`disqus-react` `DiscussionEmbed`** for the comments thread
- **Axios** for `POST /sso` (no jQuery)
- Host-page login/logout with the same test users as the vanilla demo

## Usage

### Local Development

1. From the monorepo root, start the Worker:
   ```bash
   yarn dev
   ```

2. Start the Vite dev server (either command):
   ```bash
   yarn dev:react
   # equivalent: yarn workspace @disqus-sso/frontend-react dev
   ```

3. Open [http://localhost:3001](http://localhost:3001)

### Production Build

```bash
yarn build:react
# equivalent: yarn workspace @disqus-sso/frontend-react build
```

Output is `packages/frontend-react/dist/`. GitHub Pages copies that tree to `/sso-demo/react/`.

## How It Works

1. **Host-page login (working).** Axios POSTs test user data to `/sso`. The response's `auth` is passed to `DiscussionEmbed` as `remoteAuthS3` (along with `apiKey`).
2. **Host-page logout.** Sets `remoteAuthS3` to the same hardcoded empty payload as the vanilla demo.
3. **`config.sso` (placeholder).** Same comments-recipe `example.com` URLs as vanilla. Disqus may render a publisher login control; those URLs are not a working login.

`DiscussionEmbed` is configured for the `ssoglitch` forum. `config.url` is hardcoded to the GitHub Pages origin even in local dev.

## Disqus Integration

This page uses the **`disqus-react`** package:

- **`DiscussionEmbed`**: comment thread with React lifecycle handling
- SSO fields (`apiKey`, `remoteAuthS3`, optional `sso`) go on the `config` prop

## API Integration

- **Development**: `http://localhost:8787/sso`
- **Production**: `https://sso-demo-worker.disqus-a67.workers.dev/sso`

## Component Structure

- `App.jsx`: application shell
- `components/DisqusSSO.jsx`: login/logout buttons and `DiscussionEmbed`
- `index.css`: styling aligned with the vanilla demo
- `main.jsx`: React entry
