import ApiErr from '../apiErr.js'
import { FAIL } from '../httpStatus.js'

export const createSettingValidator = (req, res, next) => {
  const { title, description, img } = req.body
  if (!img) {
    return next(new ApiErr(FAIL, 403, `Setting Img is Required`))
  }
  if (!title) {
    return next(new ApiErr(FAIL, 403, `Setting Title is Required`))
  }
  if (title.length > 60) {
    return next(new ApiErr(FAIL, 403, `Setting Title  is Long `))
  }
  if (title.length < 40) {
    return next(new ApiErr(FAIL, 403, `Setting Title is Short`))
  }
  if (!description) {
    return next(new ApiErr(FAIL, 403, `Setting Description is Required`))
  }
  if (description.length > 300) {
    return next(new ApiErr(FAIL, 403, `Setting Description  is Long`))
  }
  if (description.length < 100) {
    return next(new ApiErr(FAIL, 403, `Setting Description is Short`))
  }
  next()
}
