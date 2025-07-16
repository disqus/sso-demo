# Disqus SSO Frontend - React

A React implementation of the Disqus SSO demo using Vite as the build tool.

## Features

- **React Components**: Modern React with hooks for state management
- **Environment Detection**: Automatically uses localhost for development and production URL for deployment
- **Fetch API**: Uses modern fetch API instead of jQuery
- **Responsive Design**: Works well on desktop and mobile devices
- **Real-time SSO Testing**: Login/logout functionality with live Disqus integration
- **Better Error Handling**: Comprehensive error states and loading indicators
- **Vite Build Tool**: Fast development server and optimized production builds

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

1. **Login Button**: Calls your backend API with test user data using fetch API
2. **Environment Detection**: Uses localhost in development, production URL when deployed
3. **SSO Integration**: Passes the SSO payload to Disqus for authentication
4. **Logout Button**: Clears the current user and resets Disqus
5. **State Management**: Uses React hooks for managing loading states and debug information

## API Integration

The frontend communicates with your Cloudflare Workers backend:

- **Development**: `http://localhost:8787/sso`
- **Production**: `https://sso-serverless.ctang-402.workers.dev/sso`

## Component Structure

- `App.jsx`: Main application component
- `components/DisqusSSO.jsx`: Main SSO component with login/logout functionality
- `index.css`: Styling that matches the vanilla JS version
- `main.jsx`: React application entry point

## Deployment

This can be deployed to GitHub Pages alongside the vanilla JS version by:

1. Building the React app
2. Copying the build output to a `/react/` subdirectory
3. Serving both versions from the same GitHub Pages site

The React version would be available at: `https://[username].github.io/sso-serverless-worker/react/`

## Development Notes

- Uses modern React patterns with functional components and hooks
- Implements proper cleanup in useEffect to prevent memory leaks
- Handles loading states and errors gracefully
- Maintains the same visual styling as the vanilla JS version
- Uses Vite for fast development and optimized production builds
