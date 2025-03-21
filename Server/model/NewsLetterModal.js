const mongoose = require('mongoose')

const NewsLetterSchema = new mongoose.Schema({
  image: { type: String, required: true },
  discription: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
})

const NewsLetterModel = mongoose.model('NewsLetter', NewsLetterSchema)
module.exports = NewsLetterModel
