import express from 'express'
import {
  createOrder,
  deleteOrderById,
  getAllEarning,
  getAllOrders,
  getEarningMounthly,
  getOrderById,
  getOrdersOfUser,
  updatedOrderById,
} from '../Controller/OrderController.js'
import {
  validateTokenAdmin,
  validateTokenUser,
} from '../utils/TokenValidation.js'
import { createOrderValidator } from '../utils/validator/orderValidator.js'

const orderRouter = express.Router()

// CREATE ORDER
orderRouter.post(
  '/orders',
  createOrderValidator,
  validateTokenUser,
  createOrder,
)

// UPDATE ORDER
orderRouter.put('/orders/:id', validateTokenAdmin, updatedOrderById)

// DELETE ORDER
orderRouter.delete('/orders/:id', validateTokenAdmin, deleteOrderById)

// GET ORDER
orderRouter.get('/orders/find/:id', validateTokenUser, getOrderById)

// GET ALL ORDERS OF USER
orderRouter.get('/orders/:id', validateTokenUser, getOrdersOfUser)

// GET ALL ORDERS OF USER
orderRouter.get('/orders', validateTokenAdmin, getAllOrders)

// GET EARNING MONTHLY
orderRouter.get('/orders/earning/monthly', getEarningMounthly)
// GET EARNING MONTHLY
orderRouter.get('/orders/all/earning', getAllEarning)


export default orderRouter
