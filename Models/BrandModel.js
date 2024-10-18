import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    img: {
      type: [String],
    },
  },
  { timestamps: true },
)

export default mongoose.model('Brand', brandSchema)
