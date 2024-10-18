import ContactModule from '../Models/ContactModule.js'
import ApiErr from '../utils/apiErr.js'
import { ERR, FAIL, SUCCESS } from '../utils/httpStatus.js'

// CREATE CONTACT
export const createContact = async (req, res,next) => {
  
 
  const newContact = new ContactModule(req.body)
  try {
    const savedContact = await newContact.save()
    res.status(200).json({ status: SUCCESS, data: savedContact })
  } catch (err) {
    
  next(new ApiErr(ERR, 500, 'Failed to Create Message'))  
}
}

// DELETE CONTACT
export const deleteContactById = async (req, res,next) => {
  try {
    await ContactModule.findByIdAndDelete(req.params.id)

    res
      .status(200)
      .json({ status: SUCCESS, message: 'Message has been Deleted' })
  } catch (err) {
      next(new ApiErr(ERR, 500, 'Failed to Deleted Message'))
  }
}

//  GET CONTACT
export const getContactById = async (req, res,next) => {
  try {
    const getCon = await ContactModule.findById(req.params.id).populate(
      'userId',
    )
    res.status(200).json({ status: SUCCESS, data: getCon })
  } catch (err) {
  next(new ApiErr(ERR, 500, 'Failed to Fetching Message'))  
}
}

// GET ALL CONTACT
export const getAllContacts = async (req, res,next) => {
  try {
    const contacts = req.query.limit
      ? await ContactModule.find()
          .sort({ _id: -1 })
          .limit(req.query.limit)
          .populate('userId')
      : await ContactModule.find().sort({ _id: -1 }).populate('userId')
    res.status(200).json({ status: SUCCESS, data: contacts })
  } catch (err) {
    
   next(new ApiErr(ERR, 500, 'Failed to Fetching Messages'))
}}
