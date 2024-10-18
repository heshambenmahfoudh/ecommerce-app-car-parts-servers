import ApiErr from '../apiErr.js'
import { FAIL } from '../httpStatus.js'

export const createUserValidator = (req, res, next) => {
  const { firstname, lastname, username, password } = req.body
  const pattern = /^[^# ]+@[^ ]+\.[a-z]{2,3}$/
  if (!firstname) {
    return next(new ApiErr(FAIL, 403, `User Firstname is Required`))
  }
  if (!lastname) {
    return next(new ApiErr(FAIL, 403, `User Lastname is Required`))
  }
  if (!username) {
    return next(new ApiErr(FAIL, 403, `User Username Email is Required`))
  }
  if (!!username.match(pattern) === false) {
    return next(new ApiErr(FAIL, 403, `User Username Email Not Valid`))
  }
  if (!password) {
    return next(new ApiErr(FAIL, 403, `User Password is Required`))
  }
  next()
}
