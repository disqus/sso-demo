<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Disqus SSO Serverless Project

This is a Cloudflare Workers project that provides Disqus Single Sign-On (SSO) functionality as a serverless function.

## Key Technologies
- **Cloudflare Workers**: Serverless runtime
- **Wrangler**: CLI for Cloudflare Workers development
- **Vitest**: Testing framework
- **Node.js crypto module**: For HMAC signature generation

## Project Structure
- `src/index.js`: Main worker entry point with HTTP handlers
- `src/sso.js`: Disqus SSO logic (ported from Python)
- `test/`: Test files using Vitest
- `wrangler.toml`: Cloudflare Workers configuration
- `.dev.vars.example`: Environment variables template

## Development Guidelines
- Use modern ES modules syntax
- Follow Cloudflare Workers best practices
- Handle CORS properly for cross-origin requests
- Validate all user inputs
- Use environment variables for secrets
- Write tests for all new functionality

## Security Notes
- Never commit actual API keys to git
- Use Wrangler secrets for production deployment
- Validate all incoming request data
- Implement proper error handling
