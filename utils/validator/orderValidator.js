import ApiErr from '../apiErr.js'
import { FAIL } from '../httpStatus.js'

export const createOrderValidator = (req, res, next) => {
  const { code, city, address, country } = req.body
  if (!code) {
    return next(new ApiErr(FAIL, 403, `Order Code is Required`))
  }
  console.log(typeof code)

  if (!city) {
    return next(new ApiErr(FAIL, 403, `Order City is Required`))
  }
  if (!address) {
    return next(new ApiErr(FAIL, 403, `Order Address is Required`))
  }
  if (!country) {
    return next(new ApiErr(FAIL, 403, `Order Country is Required`))
  }
  next()
}
