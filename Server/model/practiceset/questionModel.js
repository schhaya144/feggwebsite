const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  // className: { type: String, required: true },
  language: { type: String },
  questionText: String,
  options: [
    {
      optionText: { type: String, required: true },
      isCorrect: { type: Boolean, default: false },
    },
  ],
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
})

module.exports = mongoose.model('QuestionModel', questionSchema)
