const express = require('express')
const products = require('./data/products')

const app = express()
const PORT = 8000

app.get('/', (req, res) => {
    res.send('API running...')
})

app.get('/products', (req, res) => {
    res.json(products)
})

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})
app.listen(PORT, console.log(`Listening ${PORT}`))
