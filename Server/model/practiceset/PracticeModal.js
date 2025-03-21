import mongoose from 'mongoose'

const mockpracticeSchema = new mongoose.Schema({
  className: { type: String, required: true },
  subject: { type: String, required: true },
  userName: { type: String, required: true },
  userInput: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
})

export default mongoose.model('PracticeTest', mockpracticeSchema)
