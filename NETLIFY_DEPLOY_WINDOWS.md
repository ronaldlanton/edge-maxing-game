# Deploying Edge Maxing to Netlify from Windows

This guide helps you deploy the Edge Maxing game to Netlify from a Windows system.

## Deployment Steps

### Prerequisites

1. Install Node.js if you haven't already: [Download Node.js](https://nodejs.org/)
2. Install the Netlify CLI:
   ```
   npm install netlify-cli -g
   ```

### Deploy via Command Prompt or PowerShell

1. Open Command Prompt or PowerShell.

2. Log in to your Netlify account:
   ```
   netlify login
   ```

3. Navigate to the project directory:
   ```
   cd D:\Projects\Trippy\edge-maxing
   ```

4. Build the project:
   ```
   npm run build
   ```

5. Deploy to Netlify:
   ```
   netlify deploy --prod
   ```

6. Follow the prompts to complete the deployment.

### Deploy via Netlify Drop

For a simpler approach, you can use Netlify Drop:

1. Build the project:
   ```
   npm run build
   ```

2. Open the `build` folder (D:\Projects\Trippy\edge-maxing\build)

3. Visit [Netlify Drop](https://app.netlify.com/drop)

4. Drag and drop the entire `build` folder contents onto the Netlify Drop area

## Accessing Your Deployed Game

Once deployed, your game will be available at:

- React UI: `https://your-netlify-site.netlify.app/`
- Standalone Game: `https://your-netlify-site.netlify.app/edge-maxing.html`

## Deployment Script (PowerShell)

You can also create a PowerShell script for easy deployment. Create a file named `deploy-to-netlify.ps1` with the following content:

```powershell
# Edge Maxing Netlify Deployment Script for Windows

Write-Host "===== Edge Maxing Netlify Deployment =====" -ForegroundColor Green
Write-Host ""

# Check if Netlify CLI is installed
try {
    netlify --version | Out-Null
}
catch {
    Write-Host "Netlify CLI not found. Would you like to install it? (y/n)" -ForegroundColor Yellow
    $INSTALL_CLI = Read-Host
    
    if ($INSTALL_CLI -eq "y" -or $INSTALL_CLI -eq "Y") {
        Write-Host "Installing Netlify CLI..." -ForegroundColor Cyan
        npm install netlify-cli -g
    }
    else {
        Write-Host "Netlify CLI is required for deployment. Please install it manually and run this script again." -ForegroundColor Red
        exit 1
    }
}

# Run build
Write-Host "Building project..." -ForegroundColor Cyan
npm run build

# Check if build was successful
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Please fix the errors and try again." -ForegroundColor Red
    exit 1
}

# Check if user is logged in to Netlify
Write-Host "Checking Netlify authentication..." -ForegroundColor Cyan
netlify status

# Deploy to Netlify
Write-Host "Deploying to Netlify..." -ForegroundColor Cyan
netlify deploy --prod

Write-Host ""
Write-Host "===== Deployment Complete =====" -ForegroundColor Green
Write-Host "Your Edge Maxing game should now be live on Netlify!" -ForegroundColor Green
Write-Host "Access the standalone game at: https://your-netlify-site.netlify.app/edge-maxing.html" -ForegroundColor Cyan
```

To run the script, right-click on it and select "Run with PowerShell" or open PowerShell and run:
```
.\deploy-to-netlify.ps1
``` 