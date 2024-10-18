import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    products: {
      type: Object,
    },
    totalPrice: {
      type: Number,
    },
    code: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true },
)

export default mongoose.model('Order', orderSchema)
