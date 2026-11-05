import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Circuit Loop Hub — Local Catalog API
function catalogApi(apiUrl) {
  return {
    name: 'circuit-loop-hub-catalog-api',

    configureServer(server) {
      server.middlewares.use('/api/catalog', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-store')

        if (req.method !== 'GET') {
          res.statusCode = 405
          res.end(JSON.stringify({
            success: false,
            error: 'Method not allowed',
          }))
          return
        }

        if (!apiUrl) {
          res.statusCode = 500
          res.end(JSON.stringify({
            success: false,
            error: 'SHEETS_API_URL is not configured',
          }))
          return
        }

        try {
          const response = await fetch(apiUrl, {
            redirect: 'follow',
            signal: AbortSignal.timeout(15000),
          })

          if (!response.ok) {
            throw new Error(`API returned status ${response.status}`)
          }

          const data = await response.json()

          if (data.success !== true || !Array.isArray(data.products)) {
            throw new Error('Invalid catalog response')
          }

          res.statusCode = 200
          res.end(JSON.stringify(data))

        } catch (error) {
          console.error('Catalog API error:', error.message)

          res.statusCode = 502
          res.end(JSON.stringify({
            success: false,
            error: 'Unable to retrieve catalog data',
          }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'SHEETS_')

  return {
    plugins: [
      react(),
      tailwindcss(),
      catalogApi(env.SHEETS_API_URL),
    ],
  }
})