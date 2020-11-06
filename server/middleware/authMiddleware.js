import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization

    if (token && token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (err) {
            res.status(401)
            throw new Error('Not authorized')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized')
    }

})