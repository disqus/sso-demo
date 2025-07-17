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
   cd /Users/ctang/Projects/sso-serverless
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
4. **Logout Button**: Clears the current user and resets Disqus using the `window.DISQUS.reset()` API
5. **State Management**: Uses React hooks for managing loading states and debug information

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

### DisqusSSO Component Details

The main component (`DisqusSSO.jsx`) demonstrates:

- **State Management**: Uses `useState` for login status and debug information
- **SSO Integration**: Configures the `DiscussionEmbed` component with SSO settings
- **API Calls**: Makes POST requests to the backend using Axios
- **Disqus Reset**: Uses `window.DISQUS.reset()` for logout functionality
- **Error Handling**: Graceful error states and user feedback

## Deployment

This can be deployed to GitHub Pages alongside the vanilla JS version by:

1. Building the React app
2. Copying the build output to a `/react/` subdirectory
3. Serving both versions from the same GitHub Pages site

The React version would be available at: `https://[username].github.io/sso-serverless-worker/react/`

## Development Notes

- Uses modern React patterns with functional components and hooks
- Leverages the **official `disqus-react` package** for better integration than manual script loading
- Implements proper cleanup in useEffect to prevent memory leaks
- Handles loading states and errors gracefully
- Maintains the same visual styling as the vanilla JS version
- Uses Vite for fast development and optimized production builds
- Axios replaces jQuery for cleaner, Promise-based HTTP requests
