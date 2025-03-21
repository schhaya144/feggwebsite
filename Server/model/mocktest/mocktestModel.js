const mongoose = require("mongoose");

const mockTestSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  subject: {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    subjectName: { type: String, required: true },
  },
  questions: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      marks: { type: Number },
    },
  ],
  MockLogo: { type: String, required: true },
  mocktype: { type: String, required: true },
  language: { type: String, required: true },
  duration: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  numberOfQuestions: { type: Number, required: true },
  classMock: { type: String, required: true }, // Store class here
  chapter: { type: Number, required: true, min: 1, max: 15 }, 
  createdAt: { type: Date, default: Date.now },
});

const MockTest = mongoose.model("MockTest", mockTestSchema);

module.exports = MockTest;
