# Deploying to Netlify on Windows

This guide provides detailed instructions for deploying your Edge Maxing game to Netlify from a Windows environment.

## Prerequisites

1. Node.js and npm installed
2. A Netlify account
3. Git installed
4. PowerShell or Command Prompt

## Installation Steps

1. Install Netlify CLI globally:
   ```powershell
   npm install -g netlify-cli
   ```

2. Verify the installation:
   ```powershell
   netlify --version
   ```

## Deployment Steps

1. Open PowerShell or Command Prompt as Administrator

2. Navigate to your project directory:
   ```powershell
   cd path\to\your\project
   ```

3. Build your project:
   ```powershell
   npm run build
   ```

4. Login to Netlify:
   ```powershell
   netlify login
   ```
   This will open your default browser for authentication.

5. Initialize your Netlify site:
   ```powershell
   netlify init
   ```
   Follow the prompts to:
   - Create a new site
   - Choose your team
   - Set up continuous deployment (optional)

6. Deploy to production:
   ```powershell
   netlify deploy --prod
   ```

## Troubleshooting

### Common Issues

1. **Permission Errors**
   - Run PowerShell as Administrator
   - Check your npm global installation permissions

2. **Build Errors**
   - Ensure all dependencies are installed:
     ```powershell
     npm install
     ```
   - Clear npm cache:
     ```powershell
     npm cache clean --force
     ```

3. **Path Issues**
   - Use correct path separators (backslashes for Windows)
   - Verify your working directory

### Environment Variables

If your app requires environment variables:

1. Create a `.env` file in your project root
2. Add variables to Netlify:
   ```powershell
   netlify env:set KEY VALUE
   ```

## Automated Deployment

You can use the provided PowerShell script for automated deployment:

1. Save `deploy-to-netlify.ps1` in your project root
2. Run the script:
   ```powershell
   .\deploy-to-netlify.ps1
   ```

The script will:
- Build your project
- Handle authentication
- Deploy to Netlify

## Additional Resources

- [Netlify CLI Documentation](https://docs.netlify.com/cli/get-started/)
- [Netlify Build Configuration](https://docs.netlify.com/configure-builds/)
- [Troubleshooting Guide](https://docs.netlify.com/configure-builds/troubleshooting-tips/)

For more help, visit the [Netlify Community](https://community.netlify.com/) or [Netlify Support](https://www.netlify.com/support/).