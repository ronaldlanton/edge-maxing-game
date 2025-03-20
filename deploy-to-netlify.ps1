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