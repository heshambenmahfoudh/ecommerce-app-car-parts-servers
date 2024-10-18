import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },

    img: {
      type: [String],
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type:Date,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)
export default mongoose.model('User', userSchema)
