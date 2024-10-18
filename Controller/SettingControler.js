import SettingMdel from '../Models/SettingMdel.js'
import ApiErr from '../utils/apiErr.js'
import { ERR, FAIL, SUCCESS } from '../utils/httpStatus.js'

//  CREATE SETTING
export const createSetting = async (req, res,next) => {
  
  const newSetting = new SettingMdel(req.body)
  try {
    const savedSetting = await newSetting.save()
    res.status(200).json({ status: SUCCESS, data: savedSetting })
  } catch (err) {
      next(new ApiErr(ERR, 500, 'Failed to Create Setting'))
  }
}

// UPDATE SETTING
export const updatedSettingById = async (req, res,next) => {
  try {
    const updatedSetting = await SettingMdel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    )
    res.status(200).json({ status: SUCCESS, data: updatedSetting })
  } catch (err) {
      next(new ApiErr(ERR, 500, 'Failed to Update Setting'))
  }
}

// DELETE SETTING
export const deletedSettingById = async (req, res,next) => {
  try {
    await SettingMdel.findByIdAndDelete(req.params.id)
    res
      .status(200)
      .json({ status: SUCCESS, message: 'Setting has been Deleted' })
  } catch (err) {
     next(new ApiErr(ERR, 500, 'Failed to Deleted Setting'))
  }
}

// GET ALL SETTING
export const getAllSetting = async (req, res,next) => {
  try {
    const setting = await SettingMdel.find()
    res.status(200).json({ status: SUCCESS, data: setting })
  } catch (err) {
     next(new ApiErr(ERR, 500, 'Failed to Fetching Setting'))
  }
}

