const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Import additional dependencies (will be installed when needed)
let compression, helmet;
try {
  compression = require('compression');
  helmet = require('helmet');
} catch (err) {
  console.log('Optional dependencies not installed. Run npm install to use them.');
}

// Apply production middleware
if (isProduction) {
  // Use helmet for security headers if available
  if (helmet) {
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
          imgSrc: ["'self'", "https://flagcdn.com", "https://images.unsplash.com", "data:"],
          fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"]
        }
      }
    }));
  } else {
    // Fallback to basic security headers
    app.use((req, res, next) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      next();
    });
  }
  
  // Use compression if available
  if (compression) {
    app.use(compression());
  }
} else {
  // Development security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });
}

// Serve static files from the current directory
app.use(express.static(__dirname, {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0' // Cache for 1 day in production
}));

// Serve index.html for the root path and any other unmatched routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Sparez app is running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`Server started on port ${port}`);
  
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Local URL: http://localhost:${port}`);
    
    // Get local IP addresses to display
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    
    console.log('Network URLs:');
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
          console.log(`http://${net.address}:${port}`);
        }
      }
    }
    
    console.log('\nFor deployment to the internet, see the deployment section in README.md');
  }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
