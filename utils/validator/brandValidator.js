import ApiErr from '../apiErr.js'
import { FAIL } from '../httpStatus.js'

export const createBrandValidator = (req, res, next) => {
  const { name, description, img } = req.body
  if (!img) {
    return next(new ApiErr(FAIL, 403, `Brand Img is Required`))
  }
  if (!name) {
    return next(new ApiErr(FAIL, 403, `Brand Name is Required`))
  }
  if (name.length < 3) {
    return next(new ApiErr(FAIL, 403, `Brand Name is Short`))
  }
  if (name.length > 13) {
    return next(new ApiErr(FAIL, 403, `Brand Name is Long`))
  }
  if (!description) {
    return next(new ApiErr(FAIL, 403, `Brand Description is Required`))
  }
  next()
}
