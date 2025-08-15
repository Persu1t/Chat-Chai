const { devIndicatorServerState } = require("next/dist/server/dev/dev-indicator-server-state");

module.exports = {
  images: {
    remotePatterns: [new URL('https://github.com/**')],
  },
  devIndicators: false,
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '04lp7bcq-3000.inc1.devtunnels.ms', // Your tunnel URL
        '*.devtunnels.ms', // Allow all devtunnels
      ],
    },
  },
}