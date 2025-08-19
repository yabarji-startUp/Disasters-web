import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || 10000

// --- RPS Middleware (doit être AVANT routes/static) ---
const rpsWindow = new Array(10).fill(0) // 10 "tranches" de 100ms = 1s
let rpsIndex = 0

setInterval(() => {
  rpsIndex = (rpsIndex + 1) % rpsWindow.length
  rpsWindow[rpsIndex] = 0
}, 100)

app.use((req, res, next) => {
  rpsWindow[rpsIndex]++
  next()
})

app.use((_, res, next) => {
  res.set('Timing-Allow-Origin', '*')
  next()
})

app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors())

// Middleware pour API cross-origin (RGESN 4.1)
app.use('/api', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Cross-Origin-Resource-Policy', 'cross-origin')
  next()
})

app.use(compression())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// --- Static assets avec CORS, COEP et Cache (RGESN 3.1) ---
app.use(
  '/static',
  (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Cross-Origin-Resource-Policy', 'cross-origin')
    res.set('Cross-Origin-Opener-Policy', 'same-origin')
    res.set('Cross-Origin-Embedder-Policy', 'require-corp')
    
    // Cache headers based on file type (RGESN 3.1)
    const ext = path.extname(req.path).toLowerCase()
    if (ext === '.webp' || ext === '.jpg' || ext === '.png') {
      res.set('Cache-Control', 'public, max-age=86400') // 1 day for images
    } else if (ext === '.css' || ext === '.js') {
      res.set('Cache-Control', 'public, max-age=3600') // 1 hour for CSS/JS
    } else {
      res.set('Cache-Control', 'public, max-age=300') // 5 minutes for others
    }
    
    next()
  },
  express.static(path.join(__dirname, 'static'), {
    extensions: ['js', 'css', 'jpg', 'webp'],
    maxAge: '1d'  // Cache for 1 day (RGESN 3.1)
  })
)

// --- Frontend static files (production build) ---
app.use(express.static(path.join(__dirname, '..', 'dist'), {
  maxAge: '1h', // Cache for 1 hour
  setHeaders: (res, path) => {
    // Cache headers for frontend assets
    if (path.endsWith('.js') || path.endsWith('.css')) {
      res.set('Cache-Control', 'public, max-age=3600') // 1 hour
    } else if (path.endsWith('.html')) {
      res.set('Cache-Control', 'no-cache') // No cache for HTML
    }
  }
}))

// --- API server ---
app.get('/api/server', (_, res) => {
  res.set('Cache-Control', 'no-store')
  const rps = rpsWindow.reduce((a, b) => a + b, 0)
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage().rss,
    load: +os.loadavg()[0].toFixed(2),
    rps,
    port: PORT
  })
})

// --- Health check endpoint ---
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// --- Optimized image route (RGESN 2.1) ---
app.get('/static/large', (req, res) => {
  // Cache headers for optimized images (RGESN 3.1)
  res.set('Cache-Control', 'public, max-age=86400') // 1 day
  
  const acceptHeader = req.headers.accept || ''
  if (acceptHeader.includes('image/webp')) {
    res.sendFile(path.join(__dirname, 'static', 'large.webp'))
  } else {
    res.sendFile(path.join(__dirname, 'static', 'large.jpg'))
  }
})

// --- API payload optimisé (RGESN 4.1) ---
app.get('/api/payload', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 100
  
  // Données optimisées avec pagination (RGESN 4.1)
  const optimizedData = Array(limit).fill(null).map((_, i) => ({
    id: (page - 1) * limit + i + 1,
    value: Math.random().toString(36).substring(7),
    timestamp: Date.now()
  }))
  
  res.json({
    data: optimizedData,
    pagination: {
      page,
      limit,
      total: 10000, // Total simulé
      hasMore: page * limit < 10000
    },
    ts: Date.now()
  })
})

// --- API data optimisée (RGESN 4.1) ---
app.get('/api/data', (req, res) => {
  // Cache et compression via middleware Express (RGESN 4.1)
  res.set('Cache-Control', 'public, max-age=300') // 5 minutes
  
  const compressedData = {
    users: Array(50).fill(null).map((_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`
    })),
    metrics: {
      active: Math.floor(Math.random() * 1000),
      total: 10000,
      growth: Math.random() * 0.1
    }
  }
  
  res.json(compressedData)
})



// --- SPA fallback route (serve index.html for all non-API routes) ---
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' })
  }
  
  // Serve index.html for all other routes (SPA routing)
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🔧 API server: http://localhost:${PORT}/api/server`)
  console.log(`📁 Static files: http://localhost:${PORT}/`)
})