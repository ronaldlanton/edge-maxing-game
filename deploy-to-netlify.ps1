# PowerShell script for deploying to Netlify

# Function to check if a command exists
function Test-Command {
    param ($command)
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = 'stop'
    try { if (Get-Command $command) { return $true } }
    catch { return $false }
    finally { $ErrorActionPreference = $oldPreference }
}

# Check if Node.js is installed
if (-not (Test-Command node)) {
    Write-Error "Node.js is not installed. Please install Node.js and try again."
    exit 1
}

# Check if npm is installed
if (-not (Test-Command npm)) {
    Write-Error "npm is not installed. Please install npm and try again."
    exit 1
}

# Check if netlify-cli is installed globally
if (-not (Test-Command netlify)) {
    Write-Host "Installing netlify-cli globally..."
    npm install -g netlify-cli
}

# Build the project
Write-Host "Building the project..."
try {
    npm run build
}
catch {
    Write-Error "Build failed. Please check your code and try again."
    exit 1
}

# Deploy to Netlify
Write-Host "Deploying to Netlify..."
try {
    netlify deploy --prod
}
catch {
    Write-Error "Deployment failed. Please check your Netlify configuration and try again."
    exit 1
}

Write-Host "Deployment completed successfully!"