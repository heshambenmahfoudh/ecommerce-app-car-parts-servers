import ProductModel from '../Models/ProductModel.js'
import ApiErr from '../utils/apiErr.js'
import { ERR, FAIL, SUCCESS } from '../utils/httpStatus.js'

// CREATE PRODUCTS
export const createProduct = async (req, res, next) => {
  const newProduct = new ProductModel(req.body)
  try {
    const savedProduct = await newProduct.save()
    res.status(200).json({ status: SUCCESS, data: savedProduct })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Create Product'))
  }
}

// UPDATE PRODUCTS
export const updateProductById = async (req, res, next) => {
  try {
    const updatedProdutc = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    )
    res.status(200).json({ status: SUCCESS, data: updatedProdutc })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Updated Product'))
  }
}

// DELETE PRODUTC
export const deleteProductById = async (req, res, next) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id)
    res
      .status(200)
      .json({ status: SUCCESS, message: 'product has been deleted' })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Deleted Product'))
  }
}

// GET PRODUCT
export const getProductById = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate([
      { path: 'brand', select: 'name' },
      { path: 'category', select: 'name' },
    ])
    if (!product) {
      return next(new ApiErr(FAIL, 403, ` Product  Not Found `))
    }

    res.status(200).json({ status: SUCCESS, data: product })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Product'))
  }
}

// GET ALL PRODUCTS
export const getAllProducts = async (req, res, next) => {
  const { carId, brandId, part, limit, page } = req.query
  const skip = (page - 1) * limit

  try {
    const products =
      carId && part
        ? await ProductModel.find({
            category: carId,
            part: part,
          })
            .sort({
              createdAt: -1,
            })
            .populate([
              { path: 'brand', select: 'name' },
              { path: 'category', select: 'name' },
            ])
        : brandId
        ? await ProductModel.find({ brand: brandId })
            .sort({
              createdAt: -1,
            })
            .populate([
              { path: 'brand', select: 'name' },
              { path: 'category', select: 'name' },
            ])
        : carId
        ? await ProductModel.find({ category: carId })
            .sort({
              createdAt: -1,
            })
            .populate([
              { path: 'brand', select: 'name' },
              { path: 'category', select: 'name' },
            ])
        : await ProductModel.find()
            .sort({
              createdAt: -1,
            })
            .skip(skip)
            .limit(limit)
            .populate([
              { path: 'brand', select: 'name' },
              { path: 'category', select: 'name' },
            ])
    res.status(200).json({ status: SUCCESS, data: products })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Products'))
  }
}

/*

 try {
    const products =
       carId && part
        ? await ProductModel.find({
            category: carId,
            part: part,
          })
            .sort({
              createdAt: -1,
            })
           .populate([
              { path: 'brand', select: 'name' },
              { path: 'category', select: 'name' },
            ])
        : brandId
        ? await ProductModel.find({ brand: brandId })
            .sort({
              createdAt: -1,
            })
           .populate([
              { path: 'brand', select: 'name' },
              { path: 'category', select: 'name' },
            ])
        : carId
        ? await ProductModel.find({ category: carId })
            .sort({
              createdAt: -1,
            })
           .populate([
              { path: 'brand', select: 'name' },
              { path: 'category', select: 'name' },
            ])
        : await ProductModel.find()
            .sort({
              createdAt: -1,
            })
            .skip(skip)
            .limit(limit)
            .populate([
              { path: 'brand', select: 'name' },
              { path: 'category', select: 'name' },
            ])
    res.status(200).json({ status: SUCCESS, data: products })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Products'))
  }

*/
