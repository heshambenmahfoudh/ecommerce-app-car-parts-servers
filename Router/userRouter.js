import express from 'express'
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  statusUsers,
  updatedUserById,
} from '../Controller/UserController.js'
import {
  validateTokenAdmin,
  validateTokenUser,
} from '../utils/TokenValidation.js'

const userRouter = express.Router()
// UPDATE USER
userRouter.put('/users/:id', validateTokenUser, updatedUserById)
// DELETE USER
userRouter.delete('/users/:id', validateTokenAdmin, deleteUserById)
// GET USER
userRouter.get('/users/find/:id', validateTokenUser, getUserById)
// GET ALL USER
userRouter.get('/users', validateTokenAdmin, getAllUsers)
// GET STATUS USER
userRouter.get('/users/status', validateTokenAdmin, statusUsers)

export default userRouter
