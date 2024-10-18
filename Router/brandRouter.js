import express from 'express'
import {
  CreateBrand,
  deletedBrandById,
  getAllBrands,
  getBrandById,
  updateBrandById,
} from '../Controller/BrandController.js'
import {} from '../Controller/CategoryController.js'
import {
  validateTokenAdmin,
  validateTokenUser,
} from '../utils/TokenValidation.js'
import { createBrandValidator } from '../utils/validator/brandValidator.js'

const brandRoute = express.Router()

// CREATE CATEGORY
brandRoute.post(
  '/brands',
  createBrandValidator,
  validateTokenAdmin,
  CreateBrand,
)

// UPDATE BRAND
brandRoute.put('/brands/:id', validateTokenAdmin, updateBrandById)

// DLETE BRAND
brandRoute.delete('/brands/:id', validateTokenAdmin, deletedBrandById)

// GET BRAND
brandRoute.get('/brands/find/:id', getBrandById)

// GET ALL BRAND
brandRoute.get('/brands', getAllBrands)

export default brandRoute
