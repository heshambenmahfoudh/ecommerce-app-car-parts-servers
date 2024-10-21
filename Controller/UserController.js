import UserModel from '../Models/UserModel.js'
import { SUCCESS, FAIL, ERR } from '../utils/httpStatus.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import ApiErr from '../utils/apiErr.js'

// UPDATED USER
export const updatedUserById = async (req, res, next) => {
  const { password } = req.body
  const { id } = req.params
  try {
    password && bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true },
    )

    const token = jwt.sign(
      {
        id: updateUser._id,
        isAdmin: updateUser.isAdmin,
      },
      process.env.JWT,
      { expiresIn: '1h' },
    )
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ success: SUCCESS, data: updateUser })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Updated User '))
  }
}

// GET USER
export const getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
      return next(new ApiErr(FAIL, 402, 'User Not Found'))
    }
    res.status(200).json({ status: SUCCESS, data: user })
  } catch (err) {
    next(new ApiErr(ERR, 402, 'Failed to Fetching User'))
  }
}

//  DELETE USER
export const deleteUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    if (!user) {
      return next(new ApiErr(FAIL, 402, 'User Not Found'))
    }
    res.status(200).json({ status: SUCCESS, message: 'User has ben Deleted ' })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Deleted User'))
  }
}

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {
  const { admin, limit } = req.query
  try {
    const users = await UserModel.find({ isAdmin: admin}).limit(limit)

    res.status(200).json({ status: SUCCESS, data: users })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Users'))
  }
}

// STATUS USER
export const statusUsers = async (req, res, next) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
  try {
    const usersStatus = await UserModel.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: { month: { $month: '$createdAt' } },
      },
      {
        $group: { _id: '$month', totalUser: { $sum: 1 } },
      },
    ])
    res.status(200).json({ status: SUCCESS, data: usersStatus })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Status Users'))
  }
}
