import BrandModel from '../Models/BrandModel.js'
import ProductModel from '../Models/ProductModel.js'
import ApiErr from '../utils/apiErr.js'
import { ERR, FAIL, SUCCESS } from '../utils/httpStatus.js'

// CREATE BRAND
export const CreateBrand = async (req, res, next) => {
  const oldBrand = await BrandModel.findOne({ name: req.body.name })
  if (oldBrand) {
    return next(
      new ApiErr(FAIL, 403, `Brand (${req.body.name}) Alredy Created `),
    )
  }
  try {
    const newBrand = await BrandModel.create({ ...req.body })
    const savedBrand = await newBrand.save()
    res.status(200).json({ status: SUCCESS, data: savedBrand })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Create Brand'))
  }
}

// GET BRAND
export const getBrandById = async (req, res, next) => {
  try {
    const brand = await BrandModel.findById(req.params.id)
    if (!brand) {
      return next(new ApiErr(FAIL, 403, ` Brand Not Found `))
    }
    res.status(200).json({ status: SUCCESS, data: brand })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Brand'))
  }
}

// UPDATE BRAND
export const updateBrandById = async (req, res, next) => {
  try {
    const updatedBrand = await BrandModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    )
    res.status(200).json({ status: SUCCESS, data: updatedBrand })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Updated Brand'))
  }
}

// DELETE BRAND
export const deletedBrandById = async (req, res, next) => {
  try {
    const brand = await BrandModel.findById(req.params.id)
    await ProductModel.deleteMany({ brand: brand._id })

    await BrandModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: SUCCESS,
      message: 'Brand has been Deleted',
    })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Deleted Brand'))
  }
}

// GET ALL BRANDS
export const getAllBrands = async (req, res, next) => {
  try {
    const skip = (req.query.page - 1) * req.query.limit
    const brands = req.query.car
      ? await BrandModel.find({ name: req.query.car }).sort({
          createdAt: -1,
        })
      : await BrandModel.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(req.query.limit)
    res.status(200).json({ status: SUCCESS, data: brands })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Brands'))
  }
}
