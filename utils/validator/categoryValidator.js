import ApiErr from '../apiErr.js'
import { FAIL } from '../httpStatus.js'

export const createCategoryValidator = (req, res, next) => {
  const { name, brand } = req.body

  if (!brand) {
    return next(new ApiErr(FAIL, 403, `Category Brand is Required`))
  }
  if (!name) {
    return next(new ApiErr(FAIL, 403, `Category Name is Required`))
  }
  if (name.length < 3) {
    return next(new ApiErr(FAIL, 403, `Category Name is Short`))
  }
  if (name.length > 13) {
    return next(new ApiErr(FAIL, 403, `Category Name is Long`))
  }
  next()
}
