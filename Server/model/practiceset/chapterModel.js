const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
  title: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
})

module.exports = mongoose.model('Chapter', chapterSchema)
