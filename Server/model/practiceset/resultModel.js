const mongoose = require('mongoose')

const testResultSchema = new mongoose.Schema({
  mockSetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MockSet', // Reference to the mock test set
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  learnerId: {
    type: String,
    // required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject', // Reference to the subject
    required: true,
  },
  name: {
    type: String,
    ref: 'Subject', // Reference to the subject
    required: true,
  },
  learnerName: {
    type: String,
    // required: true,
  },
  correctAnswers: {
    type: Number,
    // required: true,
  },
  wrongAnswers: {
    type: Number,
    // required: true,
  },
  score: {
    type: Number,
    // required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
})

const TestResult = mongoose.model('TestResult', testResultSchema)

module.exports = TestResult
