import express from 'express'

import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
} from '../Controller/ContactController.js'
import {
  validateTokenAdmin,
  validateTokenUser,
} from '../utils/TokenValidation.js'
import { createContactValidator } from '../utils/validator/contactValidator.js'

const contactRouter = express.Router()

// CREATE CONTACT
contactRouter.post(
  '/contacts',
  validateTokenUser,
  createContactValidator,
  createContact,
)

// DLETE CONTACT
contactRouter.delete('/contacts/:id', validateTokenAdmin, deleteContactById)

// GET CONTACT
contactRouter.get('/contacts/find/:id', validateTokenAdmin, getContactById)

// GET ALL CONTACT
contactRouter.get('/contacts', validateTokenAdmin, getAllContacts)

export default contactRouter
