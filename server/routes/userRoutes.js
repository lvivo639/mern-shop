import express from 'express'
import {authUser, getUserProfile, registerUser} from "../controllers/userContoller.js";
import {protect} from "../middleware/authMiddleware.js";
import {updateUserProfile} from "../controllers/userContoller.js";

const router = express.Router()

router.route('/')
    .post(registerUser)

router.route('/login')
    .post(authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router