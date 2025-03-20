#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Node.js is installed
if ! command_exists node; then
    echo "Error: Node.js is not installed. Please install Node.js and try again."
    exit 1
}

# Check if npm is installed
if ! command_exists npm; then
    echo "Error: npm is not installed. Please install npm and try again."
    exit 1
}

# Check if netlify-cli is installed globally
if ! command_exists netlify; then
    echo "Installing netlify-cli globally..."
    npm install -g netlify-cli
}

# Build the project
echo "Building the project..."
if ! npm run build; then
    echo "Error: Build failed. Please check your code and try again."
    exit 1
}

# Deploy to Netlify
echo "Deploying to Netlify..."
if ! netlify deploy --prod; then
    echo "Error: Deployment failed. Please check your Netlify configuration and try again."
    exit 1
}

echo "Deployment completed successfully!"