import bcrypt from 'bcrypt'
import { FAIL, SUCCESS, ERR } from '../utils/httpStatus.js'
import UserModel from '../Models/UserModel.js'
import ApiErr from '../utils/apiErr.js'
import generateJWT from '../utils/generateJWT.js'
import generateToken from '../utils/generateToken.js'
import { addMinutes } from 'date-fns'
import generateEmailTemplate from '../utils/generateEmailTemplate.js'
import { Resend } from 'resend'
 const resend = new Resend('re_iZP369v7_98Rh9RHovtyRTmff9S6ZtCZg')
// REGISTER USER
export const RegisterUser = async (req, res, next) => {
  const oldUser = await UserModel.findOne({
    username: req.body.username,
  })
  if (oldUser) {
    return next(
      new ApiErr(FAIL, 403, `User (${req.body.username}) Alredy Registerd`),
    )
  }

  const newUser = new UserModel({
    ...req.body,
    password: bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(process.env.NUM | 10),
    ),
  })

  try {
    const savedUser = await newUser.save()
    res.status(200).json({ status: SUCCESS, data: savedUser })
  } catch (err) {
    return next(new ApiErr(ERR, 500, 'Failed to Create User'))
  }
}

// LOGIN USER
export const loginUser = async (req, res, next) => {
  const { admin } = req.query

  const userAdmin = await UserModel.findOne({
    isAdmin: true,
  })

  if (admin && !userAdmin) {
    const newAdmin = new UserModel({
      ...req.body,
      firstname: 'admin',
      lastname: 'admin',
      isAdmin: true,
      password: bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(process.env.NUM | 10),
      ),
    })
    try {
      const savedAdmin = await newAdmin.save()
      const token = await generateJWT({
        id: newAdmin._id,
        username: newAdmin.username,
        isAdmin: newAdmin.isAdmin,
      })

      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json({ status: SUCCESS, data: savedAdmin })
    } catch (err) {
      console.log(err)
      return next(new ApiErr(ERR, 500, `Failed To Create  Admin `))
    }
    return
  }

  const user = await UserModel.findOne({ username: req.body.username })
  try {
    if (!user) {
      return next(
        new ApiErr(FAIL, 403, ` User (${req.body.username}) Not Found `),
      )
    }
    const pass = await bcrypt.compare(req.body.password, user.password)
    if (!pass) {
      return next(new ApiErr(FAIL, 402, `Wrong Password or Username  `))
    }

    const token = await generateJWT({
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    })

    const { password, ...otherDetails } = user._doc
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ status: SUCCESS, data: otherDetails })
  } catch (err) {
    next(new ApiErr(ERR, 500, `Failed to Login User`))
  }
}

// FORGOT PASS
export const forgotPassword = async (req, res, next) => {
  const { username } = req.body
  try {
    const existingUser = await UserModel.findOne({ username })
    if (!existingUser) {
      return next(
        new ApiErr(FAIL, 403, ` User (${req.body.username}) Not Found `),
      )
    }
    const resetToken = generateToken().toString()
    const resetTokenExpiry = addMinutes(new Date(), 30)
    await UserModel.updateOne(
      { username },
      { $set: { resetToken, resetTokenExpiry } },
    )
   const htmlText = generateEmailTemplate(resetToken)
    const { data, error } = await resend.emails.send({
      from: 'ecommerce <noreply@carparts.com>',
      to: username,
      subject: 'Password Reset Request', 
      html: 'generateEmailTemplate(resetToken) ',
    })
    if (error) {
      return next(new ApiErr(ERR, 500, error))
    }
    const resultData = {
        userId: existingUser.id,
        emailId:data?.id
    }

    return res.status(200).json({
      status: SUCCESS,
      message: `Password reset email sent to (${existingUser.username}) 
       `,
       data:resultData
    })
  } catch (err) {
    console.log(err)
    return next(new ApiErr(ERR, 500, `Failed To Send ResetToken`))
  }
}
