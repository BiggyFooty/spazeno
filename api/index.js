// Simple API endpoint for Vercel
module.exports = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Sparez API is running',
    version: '1.0.0',
    language: req.headers['accept-language'] || 'en',
    timestamp: new Date().toISOString()
  });
};
