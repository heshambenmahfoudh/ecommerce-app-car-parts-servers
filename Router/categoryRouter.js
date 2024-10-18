import express from 'express'
import {
  deletedCategoryById,
  getAllCategory,
  getCategoryById,
  updatedCategoryById,
  CreateCategory,
} from '../Controller/CategoryController.js'
import {
  validateTokenAdmin,
  validateTokenUser,
} from '../utils/TokenValidation.js'
import { createCategoryValidator } from '../utils/validator/categoryValidator.js'

const categoryRoute = express.Router()

// CREATE CATEGORY
categoryRoute.post(
  '/categories',
  createCategoryValidator,
  validateTokenAdmin,
  CreateCategory,
)

// UPDATE CATEGORY
categoryRoute.put('/categories/:id', validateTokenAdmin, updatedCategoryById)

// DLETE CATEGORY
categoryRoute.delete('/categories/:id', validateTokenAdmin, deletedCategoryById)

// GET CATEGORY
categoryRoute.get('/categories/find/:id', getCategoryById)

// GET ALL CATEGORIES
categoryRoute.get('/categories', getAllCategory)

export default categoryRoute
