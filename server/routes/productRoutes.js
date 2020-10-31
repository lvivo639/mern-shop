import express from 'express'
import asyncHandler from 'express-async-handler'
import products from '../data/products.js'

import Product from '../models/productModel.js'

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.getAll()
    res.json(products)
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.getById(req.params.id)
    if (product){
        res.json(product)
    } else {
        res.status(404)
        throw Error('Product not found')
    }
}))

export default router