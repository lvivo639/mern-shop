import express from 'express'
import {authUser, getUserProfile, registerUser, updateUserProfile} from "../controllers/userContoller.js";
import {protect, admin} from "../middleware/authMiddleware.js";
import {getUsers} from "../controllers/userContoller";

const router = express.Router()

router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)

router.route('/login')
    .post(authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router