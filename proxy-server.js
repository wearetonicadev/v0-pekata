const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');

const app = express();

// Proxy para desarrollo
app.use('/api', createProxyMiddleware({
  target: 'https://backend.pekatafoods.com/api/v1',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remover /api del path
  },
  onProxyReq: (proxyReq, req, res) => {
    // Mantener headers originales
    console.log('Proxying request to:', proxyReq.path);
  },
}));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
