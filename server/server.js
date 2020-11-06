import express from 'express'
import dotenv from 'dotenv'
import 'colors'
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRouters from './routes/userRoutes.js'

dotenv.config()
connectDB().then(r => {})

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRouters)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Listening ${PORT} port on ${process.env.NODE_ENV} mode`.yellow))
