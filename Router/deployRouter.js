import express from 'express'
const router = express.Router()
import multer from 'multer'
import ApiErr from '../utils/apiErr.js'
import { ERR } from '../utils/httpStatus.js'
import { validateTokenUser } from '../utils/TokenValidation.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    const fileName = `photos_${Date.now()}.${file.mimetype.split('/')[1]}`
    cb(null, fileName)
  },
})
const deploied = multer({ storage: storage })

router.post('/deploy', validateTokenUser, deploied.single('photo'), (req, res) => {
  try {
    const { filename } = req.file
    return res.status(200).json(filename)
  } catch (err) {
    next(new ApiErr(ERR, 500, 'Failed to Deploy Image'))
  }
})
export default router
