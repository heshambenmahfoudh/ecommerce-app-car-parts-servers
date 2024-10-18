import express from 'express'
import {
  forgotPassword,
  loginUser,
  RegisterUser,
} from '../Controller/AuthController.js'
import { forgotPasswordValidator } from '../utils/validator/forgotPasswordValidator.js'
import { createLoginValidator } from '../utils/validator/loginValidator.js'
import { createUserValidator } from '../utils/validator/userValidator.js'

const authRouter = express.Router()

// REGISTER USER
authRouter.post('/auth/register', createUserValidator, RegisterUser)

// LOGIN USER
authRouter.post('/auth/login', createLoginValidator, loginUser)

// FORGOT PASS
authRouter.put(
  '/auth/forgot-password',
  forgotPasswordValidator,
  forgotPassword,
)

export default authRouter
