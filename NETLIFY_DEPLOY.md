# Deploying Edge Maxing to Netlify

This guide helps you deploy the Edge Maxing game to Netlify.

## Deployment Steps

### Option 1: Deploy via Netlify UI

1. Log in to your Netlify account at [app.netlify.com](https://app.netlify.com/)
2. Click the "Add new site" button and select "Import an existing project"
3. Connect to your Git provider (GitHub, GitLab, BitBucket)
4. Select the Edge Maxing repository
5. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install the Netlify CLI if you haven't already:
   ```
   npm install netlify-cli -g
   ```

2. Log in to your Netlify account:
   ```
   netlify login
   ```

3. Navigate to the project directory and initialize Netlify:
   ```
   cd edge-maxing
   netlify init
   ```

4. Follow the CLI prompts to configure your site
5. Deploy your site:
   ```
   netlify deploy --prod
   ```

## Accessing Your Deployed Game

Once deployed, your game will be available at:

- React UI: `https://your-netlify-site.netlify.app/`
- Standalone Game: `https://your-netlify-site.netlify.app/edge-maxing.html`

## Configuration Files

The project includes:

- `netlify.toml`: Configures build settings and redirects
- `public/_redirects`: Ensures proper routing for the React app

## Environment Variables

No environment variables are required for this project.

## Custom Domain (Optional)

To set up a custom domain:

1. Go to your site settings in Netlify
2. Navigate to "Domain management"
3. Click "Add custom domain"
4. Follow the instructions to configure your DNS settings 