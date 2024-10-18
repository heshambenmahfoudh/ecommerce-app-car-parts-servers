import mongoose from 'mongoose'

const settingSchema = new mongoose.Schema(
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
  },
  { timestamps: true },
)

export default mongoose.model('Setting', settingSchema)
