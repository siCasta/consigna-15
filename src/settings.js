import 'dotenv/config'
import express from 'express'
import logger from 'morgan'
import createHttpError from 'http-errors'
import { join } from 'path'
import { dirname } from 'dirname-es'

const app = express()
const __dirname = dirname(import.meta)

// import routes
import apiRoutes from './api/routes/index.js'

// middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, '../public')))

// routes
app.use('/api', apiRoutes)

// 404 handler
app.use((req, res, next) => {
    next(createHttpError(404, 'Not found'))
})

// error handler
app.use((err, req, res, next) => {
    const message = err.message
    const error = process.env.NODE_ENV === 'development' ? err : {}

    res.status(err.status || 500).json({
        message: message,
        status: error?.status,
        stack: error?.stack,
    })
})

export default app
