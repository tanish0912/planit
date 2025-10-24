import express from 'express'
import { body } from 'express-validator'
import { register, login } from '../controllers/authController'

const router = express.Router()

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
]

router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)

export default router
