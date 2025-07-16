# Disqus SSO Frontend - Vanilla JavaScript

A simple vanilla JavaScript implementation demo for Disqus SSO integrated with a Cloudflare Workers backend.

## Features

- **Environment Detection**: Automatically uses localhost for development and production URL for deployment
- **jQuery Integration**: Uses jQuery for AJAX calls and DOM manipulation
- **Responsive Design**: Works well on desktop and mobile devices
- **Real-time SSO Testing**: Login/logout functionality with live Disqus integration

## Usage

### Local Development

1. Make sure your backend is running:
   ```bash
   yarn dev
   ```

2. Open `index.html` in your browser or serve it locally:
   ```bash
   yarn dev:vanilla
   ```

### Production

The frontend is automatically deployed to GitHub Pages when changes are pushed to the main branch.

**Live Demo**: [Your GitHub Pages URL will be here]

## How It Works

1. **Login Button**: Calls your backend API with test user data
2. **Environment Detection**: Uses localhost in development, production URL when deployed
3. **SSO Integration**: Passes the SSO payload to Disqus for authentication
4. **Logout Button**: Clears the current user and resets Disqus

## API Integration

The frontend communicates with your Cloudflare Workers backend:

- **Development**: `http://localhost:8787/sso`
- **Production**: `https://sso-serverless.ctang-402.workers.dev/sso`

## Deployment

This frontend is deployed to GitHub Pages automatically via GitHub Actions when you push changes to the main branch.
