import express from 'express'
import dotenv from 'dotenv'
import 'colors'
import path from 'path'
import morgan from 'morgan'

import connectDB from './config/db.js';
import {errorHandler, notFound} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRouters from './routes/userRoutes.js'
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config()
connectDB().then(r => {
})

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRouters)
app.use('/api/orders', orderRoutes)

app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/uploads')))

    app.get('*', (req, res) => {
        res.sendFile((path.resolve(__dirname, 'client', 'build', 'index.html')))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API running...')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Listening ${PORT} port on ${process.env.NODE_ENV} mode`.yellow))
