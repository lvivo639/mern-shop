import express from 'express'
import {addOrderItems} from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleware.js'
import {getOrderById, updateOrderToPaid} from "../controllers/orderController";

const router = express.Router()

router.route('/')
    .post(protect, addOrderItems)

router.route('/:id')
    .get(protect, getOrderById)


router.route('/:id/pay')
    .put(protect, updateOrderToPaid)


export default router