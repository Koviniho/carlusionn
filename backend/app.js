// app.js
import express from 'express'
import cors from 'cors'
import router from './src/routes/index.js'
import { swaggerServe, swaggerSetup } from './swagger.js'
import { ApiError } from './src/utils/api.utils.js'
import { ALLOWED_ORIGINS } from './src/config/env.config.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { errorHandler, successHandler } from './src/config/logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(successHandler)
app.use(errorHandler)

// Middleware to parse JSON
app.use(express.json())

// CORS configuration
const allowedOrigins = ALLOWED_ORIGINS

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
    }),
)

// Explicit handling for preflight OPTIONS requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.sendStatus(204)
})

// Simple root route (optional, aber praktisch)
app.get('/', (req, res) => {
    res.status(200).send('Carlusion backend is running')
})

// Healthcheck-Route für Docker
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

// API routes
app.use('/', router)
app.use('/api-doc', swaggerServe, swaggerSetup)

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        })
    } else {
        console.error('Server Error:', err)
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal Server Error',
        })
    }
})

export { app }
