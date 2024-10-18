import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Contact', contactSchema)
