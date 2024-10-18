import CategoryModel from '../Models/CategoryModel.js'
import ProductModel from '../Models/ProductModel.js'
import ApiErr from '../utils/apiErr.js'
import { ERR, FAIL, SUCCESS } from '../utils/httpStatus.js'

// CREATE CATEGORY
export const CreateCategory = async (req, res, next) => {
  const oldCategory = await CategoryModel.findOne({ name: req.body.name })
  if (oldCategory) {
    return next(
      new ApiErr(FAIL, 403, `Category (${req.body.name}) Alredy Created `),
    )
  }

  const newCategory = new CategoryModel(req.body)

  try {
    const savedCategory = await newCategory.save()
    res.status(200).json({ status: SUCCESS, data: savedCategory })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Create Category'))
  }
}

// GET CATEGORY
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await CategoryModel.findById(req.params.id).populate({
      path: 'brand',
      select: 'name',
    })
    if (!category) {
      return next(new ApiErr(FAIL, 403, ` Category  Not Found `))
    }
    res.status(200).json({ status: SUCCESS, data: category })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Category'))
  }
}

// UPDATE CATEGORY
export const updatedCategoryById = async (req, res, next) => {
  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    )
    res.status(200).json({ status: SUCCESS, data: updatedCategory })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Updated Category'))
  }
}

// DELETE CATEGORY
export const deletedCategoryById = async (req, res, next) => {
  try {
    const category = await CategoryModel.findById(req.params.id)
    await ProductModel.deleteMany({ category: category._id })
    await CategoryModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: SUCCESS,
      message: 'Category has been Deleted',
    })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Deleted Category'))
  }
}

// GET ALL CATEGORIES
export const getAllCategory = async (req, res, next) => {
  const { brandId } = req.query

  try {
    const categories = brandId
      ? await CategoryModel.find({ brand: brandId })
          .populate({
            path: 'brand',
            select: 'name',
          })
          .sort({ createdAt: -1 })
      : await CategoryModel.find()
          .populate({
            path: 'brand',
            select: 'name',
          })
          .sort({ createdAt: -1 })
    res.status(200).json({ status: SUCCESS, data: categories })
    console.log(categories)
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Categories'))
  }
}
