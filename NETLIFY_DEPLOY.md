# Deploying to Netlify

This guide explains how to deploy your Edge Maxing game to Netlify.

## Prerequisites

1. A Netlify account
2. The Netlify CLI installed globally:
   ```bash
   npm install -g netlify-cli
   ```

## Steps

1. Build your project:
   ```bash
   npm run build
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize your site:
   ```bash
   netlify init
   ```

4. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

## Configuration

The `netlify.toml` file in the root directory contains the necessary configuration for deployment:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This configuration:
- Specifies the build command
- Sets the publish directory
- Configures routing for the SPA

## Continuous Deployment

Netlify will automatically deploy your site when you push changes to your connected repository.