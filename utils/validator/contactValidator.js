import ApiErr from '../apiErr.js'
import { FAIL } from '../httpStatus.js'

export const createContactValidator = (req, res, next) => {
  const { subject, message } = req.body
  if (!subject) {
    return next(new ApiErr(FAIL, 403, `Contact Subject is Required`))
  }
  if (!message) {
    return next(new ApiErr(FAIL, 403, `Contact Message is Required`))
  }

  next()
}
