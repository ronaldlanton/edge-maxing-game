#!/bin/bash
# Script to deploy Edge Maxing to Netlify

echo "===== Edge Maxing Netlify Deployment ====="
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
  echo "Netlify CLI not found. Would you like to install it? (y/n)"
  read -r INSTALL_CLI
  
  if [ "$INSTALL_CLI" = "y" ] || [ "$INSTALL_CLI" = "Y" ]; then
    echo "Installing Netlify CLI..."
    npm install netlify-cli -g
  else
    echo "Netlify CLI is required for deployment. Please install it manually and run this script again."
    exit 1
  fi
fi

# Run build
echo "Building project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Please fix the errors and try again."
  exit 1
fi

# Check if user is logged in to Netlify
echo "Checking Netlify authentication..."
netlify status

# Deploy to Netlify
echo "Deploying to Netlify..."
netlify deploy --prod

echo ""
echo "===== Deployment Complete ====="
echo "Your Edge Maxing game should now be live on Netlify!"
echo "Access the standalone game at: https://your-netlify-site.netlify.app/edge-maxing.html" 