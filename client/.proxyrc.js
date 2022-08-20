const { createProxyMiddleware } = require('http-proxy-middleware')

const API_HOST = process.env.API_HOST ?? 'localhost'
const API_PORT = process.env.API_PORT ?? 8080

const API_URL = new URL(`http://${API_HOST}:${API_PORT}`)

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: API_URL.toString(),
      changeOrigin: true,
    }),
  )
}
