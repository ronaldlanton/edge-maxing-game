const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3005;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the game HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'edge-maxing.html'));
});

app.listen(port, () => {
  console.log(`Edge Maxing Game server is running on port ${port}`);
}); 