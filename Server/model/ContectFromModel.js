const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  company: { type: String, required: false },
  budget: { type: String, required: false },
  purpose: { type: String, required: true },
  leadSource: { type: String, required: true },
  message: { type: String, required: true },
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
