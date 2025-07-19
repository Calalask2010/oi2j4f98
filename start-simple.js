// Simple server without vite dependencies for Railway
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

console.log('🚀 Starting simple HireHand server...');

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'HireHand Platform Simple'
  });
});

// API routes
app.post('/api/contact', (req, res) => {
  console.log('Contact form submission:', req.body);
  res.json({ 
    success: true, 
    message: 'Contact message submitted successfully',
    id: Date.now()
  });
});

app.get('/api/contact-messages', (req, res) => {
  res.json({ 
    success: true, 
    messages: [
      {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        message: "Test message",
        createdAt: new Date().toISOString()
      }
    ]
  });
});

// Serve static files
const staticPath = path.join(__dirname, 'dist', 'public');
console.log('📁 Static files path:', staticPath);

app.use(express.static(staticPath));

// Catch all for SPA
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  console.log('📄 Serving index.html from:', indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Server Error');
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log('🚀 Server started successfully');
  console.log(`📍 Listening on 0.0.0.0:${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`❤️ Health check: http://localhost:${port}/api/health`);
  console.log('💼 HireHand Platform is ready!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Received SIGTERM, shutting down gracefully');
  process.exit(0);
});