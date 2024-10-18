import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './Router/authRouter.js'
import userRouter from './Router/userRouter.js'
import productsRouter from './Router/productRouter.js'
import ordersRouter from './Router/orderRouter.js'
import categoryRouter from './Router/categoryRouter.js'
import brandRouter from './Router/brandRouter.js'
import settingRouter from './Router/settingRouter.js'
import contactsRouter from './Router/contactRouter.js'
import deployRoute from './Router/deployRouter.js'
import { globalErr } from './middleware/errMiddleware.js'
import dbConnection from './config/db.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()
app.use(cors())
mongoose.set('strictQuery', true)
dbConnection()

app.use(express.static('public'))

// MIDDLWARE
app.use('/images', express.static('images'))
app.use('/api/v1', authRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', brandRouter)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', productsRouter)
app.use('/api/v1', ordersRouter)
app.use('/api/v1', settingRouter)
app.use('/api/v1', contactsRouter)
app.use('/api/v1', deployRoute)

// HANDLE ERR IN EXPRESS
app.use(globalErr)

// RUN SERVER IN EXPRESS
const server = app.listen(process.env.PORT, () => {
  console.log(`Starting server running on port (${process.env.PORT})... :) `)
})

// HANDLE ERR OUT EXPRESS
process.on('unhandledRejection', (err) => {
  console.log(`unhandledRejection err 
    :( => 
    errName : ${err.name}  
    errMessage : ${err.message}`)
  server.close(() => {
    console.log(`server close`)
    process.exit(1)
  })
})
