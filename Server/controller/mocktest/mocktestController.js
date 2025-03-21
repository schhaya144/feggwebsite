const mongoose = require('mongoose')
const Subject = require('../../model/mocktest/subjectModel')
const Question = require('../../model/mocktest/questionsModel')
const MockTest = require('../../model/mocktest/mocktestModel')


const createMockTest = async (req, res) => {
  console.log(req.body, req.file) // To inspect the received data

  try {
    // File handling
    const MockLogo = req.file ? req.file.filename : '' // Ensure file is handled properly

    const {
      title,
      mocktype,
      description,
      subjectId,
      language,
      duration,
      classMock,
      chapter,
      totalMarks,
      selectedQuestions = [],
      numberOfQuestions,
    } = req.body

    const numQuestions = parseInt(numberOfQuestions)

    // Subject validation
    const subject = await Subject.findById(subjectId)
    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: 'Subject not found' })
    }

    let questions = []

    if (numQuestions > 0) {
      // Fetch random questions if `numQuestions` is provided
      const availableQuestions = await Question.aggregate([
        {
          $match: {
            subjectId: new mongoose.Types.ObjectId(subjectId),
            language,
            classMock,
            chapter,
          },
        },
        { $sample: { size: numQuestions } },
      ])

      if (availableQuestions.length < numQuestions) {
        return res.status(400).json({
          success: false,
          message: `Only ${availableQuestions.length} questions are available in the bank for the selected subject and language.`,
        })
      }

      questions = availableQuestions
    } else {
      // Validate manually selected questions
      questions = await Question.find({
        _id: { $in: selectedQuestions },
        subjectId,
        language,
        chapter,
        classMock
      })

      if (questions.length !== selectedQuestions.length) {
        return res.status(400).json({
          success: false,
          message:
            'Some selected questions are invalid or do not match the subject and language.',
        })
      }
    }

    // Calculate marks per question
    const marksPerQuestion = (totalMarks / questions.length).toFixed(2)

    // Create the mock test
    const mockTest = new MockTest({
      MockLogo,
      title,
      mocktype,
      description,
      subject: { subjectId: subject._id, subjectName: subject.name },
      questions: questions.map((q) => ({
        questionId: q._id,
        marks: parseFloat(marksPerQuestion),
      })),
      duration,
      totalMarks,
      classMock, // Store class here
      language,
      chapter, // Store chapter here
      numberOfQuestions: questions.length, // Save the actual number of questions
    })

    console.log('MockTest object:', mockTest) // Debugging the mockTest

    await mockTest.save()

    res.status(201).json({ success: true, data: mockTest })
  } catch (error) {
    console.error(error) // Detailed error logging
    res.status(400).json({ success: false, error: error.message })
  }
}


// get mock test
const getMockTests = async (req, res) => {
  try {
    const { mocktype } = req.query // Get mocktype from query params
    const query = mocktype ? { mocktype } : {} // If mocktype is provided, filter by it

    const mockTests = await MockTest.find(query).sort({ createdAt: -1 })

    res.status(200).json({ success: true, data: mockTests })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

const getStartMockTest = async (req, res) => {
  try {
    const mockTest = await MockTest.findById(req.params.mockTestId)
      .populate('questions.questionId')
      .exec()

    if (!mockTest) {
      return res
        .status(404)
        .json({ success: false, message: 'Mock Test not found' })
    }

    res.status(200).json({ success: true, data: mockTest })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

const mockTestDelete = async (req, res) => {
  try {
    const mockTestId = req.params.id
    await MockTest.findByIdAndDelete(mockTestId)
    res.status(200).send({ message: 'Mock test deleted successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Error deleting mock test' })
  }
}

// controllers/mockTestController.js

const getMockTestById = async (req, res) => {
  try {
    // Fetch mock test by ID from the database
    const mockTest = await MockTest.findById(req.params.id).populate(
      'questions.questionId'
    )

    if (!mockTest) {
      return res
        .status(404)
        .json({ success: false, message: 'Mock test not found' })
    }

    res.status(200).json({ success: true, data: mockTest })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}

module.exports = {
  createMockTest,
  getMockTests,
  getStartMockTest,
  mockTestDelete,
  getMockTestById,
}
