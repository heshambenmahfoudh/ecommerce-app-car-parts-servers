import express from 'express'
import { validateTokenAdmin } from '../utils/TokenValidation.js'
import { createSettingValidator } from '../utils/validator/settingValidator.js'
import {
  createSetting,
  deletedSettingById,
  getAllSetting,
  updatedSettingById,
} from '../Controller/SettingController.js'
    
const settingRouter = express.Router()
// CREATE SETTING
settingRouter.post(
  '/setting',
  createSettingValidator,
  validateTokenAdmin,
  createSetting,
)
// UPDATE SETTING
settingRouter.put('/setting/:id', validateTokenAdmin, updatedSettingById)
// DELETE SETTING
settingRouter.delete('/setting/:id', validateTokenAdmin, deletedSettingById)
// GET ALL SETTING
settingRouter.get('/setting', getAllSetting)
export default settingRouter
