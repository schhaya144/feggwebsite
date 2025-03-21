const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
  name: String,
  class: { type: String },
})

module.exports = mongoose.model('SubjectModel', subjectSchema)
