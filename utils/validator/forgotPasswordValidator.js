import ApiErr from '../apiErr.js'
import { FAIL } from '../httpStatus.js'

export const forgotPasswordValidator = (req, res, next) => {
  const { username } = req.body
  console.log('object', username)
  const pattern = /^[^# ]+@[^ ]+\.[a-z]{2,3}$/
  if (!username) {
    return next(new ApiErr(FAIL, 403, `User Username is Required`))
  }
  if (!!username?.match(pattern) === false) {
    return next(new ApiErr(FAIL, 403, `User Username Email Not Valid`))
  }

  next()
}
