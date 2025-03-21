const mongoose = require('mongoose')

const mockSetSchema = new mongoose.Schema({
  className: { type: String, required: true },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubjectModel',
    required: true,
  },
  name: { type: String, required: true },
  selectedChapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  numQuestions: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  duration: { type: Number, required: true },
  language: { type: String },
  questions: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionModel',
      },
      marks: { type: Number, required: true }, // Add marks for each question
    },
  ],
})

module.exports = mongoose.model('MockSet', mockSetSchema)
