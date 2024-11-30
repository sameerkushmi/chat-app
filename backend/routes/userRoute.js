import express from 'express'
import { getOtherUsers, login, logout, refreshToken, register } from '../controllers/userController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
import refreshMiddleware from '../middleware/refreshMiddleware.js'

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/',isAuthenticated,getOtherUsers)
router.get('/refresh',refreshMiddleware,refreshToken)

export default router