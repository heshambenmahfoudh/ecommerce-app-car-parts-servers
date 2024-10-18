import express from 'express'
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from '../Controller/ProductController.js'
import { validateTokenAdmin } from '../utils/TokenValidation.js'
import { createProductValidator } from '../utils/validator/productValidator.js'

const productRouter = express.Router()
// CREATE PRODUCT
productRouter.post(
  '/products',
  createProductValidator,
  validateTokenAdmin,
  createProduct,
)
// UPDATE PRODUCT
productRouter.put('/products/:id', validateTokenAdmin, updateProductById)
// DELETE PRODUCT
productRouter.delete('/products/:id', validateTokenAdmin, deleteProductById)
// GET PRODUCT
productRouter.get('/products/find/:id', getProductById)
// GET ALL PRODUCT
productRouter.get('/products/', getAllProducts)
export default productRouter
