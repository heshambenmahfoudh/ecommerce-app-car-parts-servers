import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    img: {
      type: [String],
    },
    startPrice: {
      type: Number,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: 'Brand',
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
    part: {
      type: String,
    },
    madein: {
      type: String,
    },
    options: [
      {
        model: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
)

export default mongoose.model('Product', productSchema)
