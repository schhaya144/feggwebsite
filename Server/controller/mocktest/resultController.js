
const MockTest = require("../../model/mocktest/mocktestModel")
const Result = require("../../model/mocktest/resultModel")

const submitMockTest = async (req, res) => {
  try {
    const { mockTestId, answers, userName, userPhone } = req.body

    // Fetch the mock test along with the questions and mockType
    const mockTest = await MockTest.findById(mockTestId).populate(
      'questions.questionId'
    )
    if (!mockTest) {
      return res
        .status(404)
        .json({ success: false, message: 'Mock Test not found' })
    }

    let score = 0
    let correctAnswers = 0
    let wrongAnswers = 0

    // Evaluate answers
    mockTest.questions.forEach((question) => {
      const questionId = question.questionId._id.toString()
      const correctOption = question.questionId.options.find(
        (option) => option.isCorrect
      )

      if (answers[questionId] === correctOption._id.toString()) {
        score += question.marks || 1 // Add marks for the correct answer
        correctAnswers++
      } else {
        wrongAnswers++
      }
    })

    const totalQuestions = mockTest.questions.length

    // Save the result, including the mockType
    const result = new Result({
      userName,
      userPhone,
      mockTestId,
      mocktype: mockTest.mocktype, // Ensure this is correctly populated
      score,
      correctAnswers,
      wrongAnswers,
      totalQuestions,
    })

    await result.save()

    return res
      .status(200)
      .json({ success: true, message: 'Test submitted successfully', result })
  } catch (error) {
    console.error('Error submitting test:', error)
    res.status(500).json({ success: false, error: error.message })
  }
}

//   get result
const getResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId)
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Result not found' })
    }
    res.status(200).json({ success: true, result })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

const getALLResult = async (req, res) => {
  try {
    const query = {}

    // Filter by mockType if provided in query params
    if (req.query.mocktype) {
      query.mocktype = req.query.mocktype
    }

    // Filter by date range if provided
    if (req.query.startDate && req.query.endDate) {
      query.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      }
    }

    // Fetch results from database
    const results = await Result.find(query)
      .sort({ createdAt: -1 }) // Sort by creation date, most recent first
      .populate('mockTestId', 'title') // Populate mockTestId with title

    res.json(results)
  } catch (error) {
    console.error('Error fetching results:', error)
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = { submitMockTest, getResult, getALLResult }
