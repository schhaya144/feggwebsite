const mongoose = require('mongoose')

const PreviousPaperSchema = new mongoose.Schema(
  {
    year: {
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
    session: {
      type: String,
      enum: ['June', 'December'],
      required: true,
    },
    file: {
      type: String, // Stores the file path of the uploaded paper
      required: true,
    },
    answerKey: {
      type: String, // Stores the file path of the uploaded answer key
      required: false, // Answer key is optional
    },
    isActive: { type: Boolean, default: true }, // Add isActive field
  },
  { timestamps: true }
)

const PreviousPaperModel = mongoose.model('PreviousPaper', PreviousPaperSchema)
module.exports = PreviousPaperModel
