# Disqus SSO Frontend - React

A React implementation of the Disqus SSO demo using Vite as the build tool.

## Features

- **Official Disqus Integration**: Uses the official `disqus-react` package for seamless Disqus embedding
- **Real-time SSO Testing**: Login/logout functionality with live Disqus integration
- **Axios HTTP Client**: Modern HTTP client for API requests instead of jQuery

## Usage

### Local Development

1. Make sure your backend is running:
   ```bash
   yarn dev
   ```

2. Start the React development server:
   ```bash
   yarn workspace @disqus-sso/frontend-react dev
   ```

3. Open your browser to `http://localhost:3001`

### Production Build

```bash
yarn workspace @disqus-sso/frontend-react build
```

The build output will be in the `dist/` directory.

## How It Works

1. **Login Button**: Calls your backend API with test user data using Axios
2. **Environment Detection**: Uses localhost in development, production URL when deployed
3. **SSO Integration**: Passes the SSO payload to Disqus for authentication via the `DiscussionEmbed` component

## Disqus Integration

This implementation uses the **official `disqus-react` package** which provides:

- **`DiscussionEmbed` Component**: Renders the Disqus comment thread with proper React lifecycle management
- **Automatic Script Loading**: Handles loading and cleanup of Disqus scripts
- **SSO Configuration**: Supports Disqus SSO configuration through component props
- **React-Friendly**: Properly integrates with React's virtual DOM and component lifecycle

### Key Advantages of `disqus-react`:

- ✅ **Official Support**: Maintained by Disqus team
- ✅ **React Optimized**: Designed specifically for React applications
- ✅ **Better Performance**: Handles script loading and cleanup automatically
- ✅ **Type Safety**: Includes TypeScript definitions
- ✅ **SSO Ready**: Built-in support for Single Sign-On configuration

## API Integration

The frontend communicates with your Cloudflare Workers backend:

- **Development**: `http://localhost:8787/sso`
- **Production**: `https://sso-serverless.ctang-402.workers.dev/sso`

## Component Structure

- `App.jsx`: Main application component
- `components/DisqusSSO.jsx`: Main SSO component with login/logout functionality and `DiscussionEmbed` integration
- `index.css`: Styling that matches the vanilla JS version
- `main.jsx`: React application entry point