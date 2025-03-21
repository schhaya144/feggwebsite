const mongoose = require('mongoose')

const UserDownloadSchema = new mongoose.Schema({
  userInput: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  downloadedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('UserDownload', UserDownloadSchema)
