const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userPhone: { type: String, required: true },
  mockTestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MockTest',
    required: true,
  },
  mocktype: { type: String, required: true },
  score: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Result = mongoose.model('Result', resultSchema)

module.exports = Result
