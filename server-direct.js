const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3011; // Changed port to 3009

// Serve static files from the public directory for resources
app.use(express.static(path.join(__dirname, 'public')));

// Special handling for problematic URLs containing %PUBLIC_URL%
app.use((req, res, next) => {
  const url = req.url;
  if (url.includes('%PUBLIC_URL%')) {
    console.log('Intercepted PUBLIC_URL reference in request:', url);
    // We'll handle this in a special way
    const fixedUrl = url.replace(/%PUBLIC_URL%\//g, '');
    console.log('Redirecting to:', fixedUrl);
    return res.redirect(fixedUrl);
  }
  next();
});

// Direct route to serve the game HTML for root path
app.get('/', (req, res) => {
  console.log('Root request received');
  const htmlPath = path.join(__dirname, 'public', 'edge-maxing.html');
  
  // Check if the file exists
  if (fs.existsSync(htmlPath)) {
    console.log('File found, serving:', htmlPath);
    res.sendFile(htmlPath);
  } else {
    console.error('File not found:', htmlPath);
    res.status(404).send('Game file not found. Please check the server configuration.');
  }
});

// Catch-all route for other paths
app.get('*', (req, res) => {
  console.log('Request received for:', req.url);
  
  // For all other requests, serve the game
  const htmlPath = path.join(__dirname, 'public', 'edge-maxing.html');
  if (fs.existsSync(htmlPath)) {
    res.sendFile(htmlPath);
  } else {
    res.status(404).send('Game file not found.');
  }
});

// Error handling middleware should be at the end
app.use((err, req, res, next) => {
  if (err instanceof URIError) {
    console.error('URI Error detected and handled:', err.message);
    return res.status(400).send('Bad Request');
  }
  console.error('Server error:', err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Edge Maxing Game server is running on port ${port}`);
  console.log(`Go to http://localhost:${port} to play the game`);
}); 