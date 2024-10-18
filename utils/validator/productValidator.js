import ApiErr from '../apiErr.js'
import { FAIL } from '../httpStatus.js'

export const createProductValidator = (req, res, next) => {
  const {
    title,
    description,
    img,
    startPrice,
    category,
    brand,
    part,
    madein,
    options,
  } = req.body
  if (!img) {
    return next(new ApiErr(FAIL, 403, `Product Img is Required`))
  }
  if (!brand) {
    return next(new ApiErr(FAIL, 403, `Product Brand is Required`))
  }
  if (!category) {
    return next(new ApiErr(FAIL, 403, `Product Category is Required`))
  }
  if (!part) {
    return next(new ApiErr(FAIL, 403, `Product Part is Required`))
  }
  if (!madein) {
    return next(new ApiErr(FAIL, 403, `Product Made In is Required`))
  }
  if (!title) {
    return next(new ApiErr(FAIL, 403, `Product Title is Required`))
  }
  if (!startPrice) {
    return next(new ApiErr(FAIL, 403, `Product startPrice is Required`))
  }
  if (!options?.[0]?.model || !options?.[0]?.price) {
    return next(
      new ApiErr(FAIL, 403, `Product Model and Price Togther is Required`),
    )
  }
  if (!description) {
    return next(new ApiErr(FAIL, 403, `Product Description is Required`))
  }
  next()
}
