import mongoose from 'mongoose'

const dbConnection = async () => {
  await mongoose.connect(process.env.MONGODB)
  console.log('mongodb connected successfull... :)')
}

export default dbConnection
