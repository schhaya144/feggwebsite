const mongoose = require('mongoose')

const ebookSchema = new mongoose.Schema(
  {
    sessionYear: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    file: {
      type: String, // Store the file URL after uploading
      required: true,
    },
    Volume: {
      type: String,
    },
    isActive: { type: Boolean, default: true }, // Add isActive field
  },

  { timestamps: true }
)

const Ebook = mongoose.model('Ebook', ebookSchema)
module.exports = Ebook
