import OrderModel from '../Models/OrderModel.js'
import UserModel from '../Models/UserModel.js'
import ApiErr from '../utils/apiErr.js'
import { ERR, SUCCESS } from '../utils/httpStatus.js'

// CREATE ORDER
export const createOrder = async (req, res, next) => {
  const newOrder = new OrderModel(req.body)
  try {
    const savedOrder = await newOrder.save()
    res.status(200).json({ status: SUCCESS, data: savedOrder })
  } catch (err) {
    console.log(err)
    next(new ApiErr(ERR, 500, 'Failed to Create Order'))
  }
}

// UPDATED ORDER
export const updatedOrderById = async (req, res, next) => {
  console.log(req.body.status)
  try {
    const updateOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    )

    res.status(200).json({ status: SUCCESS, data: updateOrder })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Updated Order'))
  }
}

// DELETE ORDER
export const deleteOrderById = async (req, res, next) => {
  const { id } = req.params
  try {
    await OrderModel.findByIdAndDelete(id)

    res.status(200).json({ status: SUCCESS, message: 'Order has been Deleted' })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Deleted Message'))
  }
}

// GET ORDER
export const getOrderById = async (req, res, next) => {
  const { id } = req.params
  try {
    const order = await OrderModel.findById(id)
    res.status(200).json({ status: SUCCESS, data: order })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Order'))
  }
}

// GET ORDER OF USER
export const getOrdersOfUser = async (req, res, next) => {
  const { id, limit } = req.params
  try {
    const orders = await OrderModel.find({ userId: id })
      .limit(limit)
      .populate('userId')
      .sort({ _id: -1 })
    res.status(200).json({ status: SUCCESS, data: orders })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Orders Of User'))
  }
}

// GET ALL ORDERS
export const getAllOrders = async (req, res, next) => {
  const { limit} = req.query
  console.log(limit);
  try {
    // const userName = await UserModel.find({
    //   firstname: { $regex: value, $options: 'i' },
    //   lastname: { $regex: value, $options: 'i' },
    // })
    // const userId = userName?.[0]?._id.toString()
    const orders = await OrderModel.find()
      .limit(limit)
      .populate('userId')
      .sort({ _id: -1 })
    res.status(200).json({ status: SUCCESS, data: orders })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Orders'))
  }
}

// GET EARNING
export const getEarningMounthly = async (req, res, next) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  console.log(lastMonth)
  try {
    const earningMonthly = await OrderModel.aggregate([
      { $match: { createdAt: { $gte: lastMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$totalPrice',
        },
      },
      {
        $group: { _id: '$month', total: { $sum: '$sales' } },
      },
    ])
    res.status(200).json({ status: SUCCESS, data: earningMonthly })
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Fetching Earning Monthly'))
  }
}
// GET EARNING
export const getAllEarning = async (req, res, next) => {
  try {
    let allEarning = 0
    const allOrder = await OrderModel.find()
    allOrder?.map(({ totalPrice }) => {
      allEarning += totalPrice
    })

    res.status(200).json({ status: SUCCESS, data: allEarning })
  } catch (err) {
    console.log(err)
    next(new ApiErr(ERR, 500, 'Failed to Fetching All Earning'))
  }
}
