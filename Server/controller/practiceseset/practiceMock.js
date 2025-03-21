const mongoose = require('mongoose')
const mocksetModel = require('../../model/practiceset/mocksetModel')
const questionModel = require('../../model/practiceset/questionModel')
const subjectModel = require('../../model/practiceset/subjectModel')

exports.createPracticeSet = async (req, res) => {
  try {
    const {
      className,
      subjectId,
      selectedChapters,
      numQuestions,
      totalMarks,
      duration,
      language,
    } = req.body

    // Fetch questions based on selected subject, class, and chapters
    const questions = await questionModel.find({
      subject: subjectId,
      chapter: { $in: selectedChapters },
      language: language || { $exists: true },
    })
    const subject = await subjectModel.findById(subjectId)
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found.' })
    }

    if (questions.length < numQuestions) {
      return res
        .status(400)
        .json({ message: 'Not enough questions available.' })
    }

    // Randomly select the required number of questions
    const selectedQuestions = questions
      .sort(() => 0.5 - Math.random())
      .slice(0, numQuestions)

    // Prepare the mock set data
    const mockSet = new mocksetModel({
      className,
      subject: subjectId,
      name: subject.name, // Use the subject's name
      selectedChapters,
      numQuestions,
      totalMarks,
      duration,
      language,
      questions: selectedQuestions.map((q) => ({
        questionId: q._id,
        marks: totalMarks / numQuestions, // Distribute marks evenly
      })),
    })

    // Save to database
    await mockSet.save()
    res
      .status(201)
      .json({ message: 'Practice set generated successfully!', mockSet })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
}

//   get
exports.getAllMockSets = async (req, res) => {
  try {
    const mockSets = await mocksetModel
      .find()
      .populate('subject')
      .populate('questions.questionId')
    res.status(200).json({ success: true, data: mockSets })
  } catch (error) {
    console.error('Error fetching mock sets:', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}

// DELETE a Mock Set by ID
exports.deleteMockSet = async (req, res) => {
  try {
    const { id } = req.params
    const deletedMockSet = await mocksetModel.findByIdAndDelete(id)

    if (!deletedMockSet) {
      return res
        .status(404)
        .json({ success: false, message: 'Mock Set not found' })
    }

    res
      .status(200)
      .json({ success: true, message: 'Mock Set deleted successfully' })
  } catch (error) {
    console.error('Error deleting mock set:', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}

// start test
exports.startPracticeSet = async (req, res) => {
  try {
    const { mockSetId } = req.params
    const mockSet = await mocksetModel.findById(mockSetId).populate({
      path: 'questions.questionId',
      select: 'questionText options',
    })

    if (!mockSet) {
      return res.status(404).json({ message: 'Practice set not found.' })
    }

    // Include marks with each question
    const formattedQuestions = mockSet.questions.map((q) => ({
      _id: q.questionId._id,
      questionText: q.questionId.questionText,
      options: q.questionId.options,
      marks: q.marks, // Now sending marks along with the question
    }))

    res.status(200).json({
      questions: formattedQuestions,
      duration: mockSet.duration, // Include test duration
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
