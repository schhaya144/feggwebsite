const mocksetModel = require('../../model/practiceset/mocksetModel')
const TestResult = require('../../model/practiceset/resultModel')

exports.submitTest = async (req, res) => {
  try {
    const {
      mockSetId,
      learnerId,
      learnerName,
      correctAnswers,
      wrongAnswers,
      score,
    } = req.body

    // if (!mockSetId || !learnerId || !learnerName) {
    //   return res.status(400).json({ message: 'All fields are required.' })
    // }

    // Fetch className and subject from mocksetModel
    const mockset = await mocksetModel.findById(mockSetId)
    if (!mockset) {
      return res.status(404).json({ message: 'Mock set not found.' })
    }

    const newTestResult = new TestResult({
      mockSetId,
      learnerId,
      learnerName,
      correctAnswers,
      wrongAnswers,
      score,
      className: mockset.className, // Add className
      subject: mockset.subject, // Add subject
      name: mockset.name, // Add
    })

    await newTestResult.save()
    res.status(201).json({
      message: 'Test result submitted successfully!',
      testResult: newTestResult,
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error submitting test result.', error: error.message })
  }
}

exports.getTestResults = async (req, res) => {
  try {
    const { resultId } = req.params
    const testResult = await TestResult.findById(resultId)

    if (!testResult) {
      return res
        .status(404)
        .json({ success: false, message: 'Result not found' })
    }

    return res.status(200).json({ success: true, data: testResult })
  } catch (error) {
    console.error('Error fetching test result:', error)
    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}
exports.getTestResultsController = async (req, res) => {
  try {
    const results = await TestResult.find().sort({ submittedAt: -1 })
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching results', error: err })
  }
}
exports.updateTestResultsController = async (req, res) => {
  try {
    const updatedResult = await TestResult.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedResult)
      return res.status(404).json({ message: 'Result not found' })
    res.json({ message: 'Test result updated successfully', updatedResult })
  } catch (err) {
    res.status(500).json({ message: 'Error updating result', error: err })
  }
}
exports.deleteTestResultsController = async (req, res) => {
  try {
    const deletedResult = await TestResult.findByIdAndDelete(req.params.id)
    if (!deletedResult)
      return res.status(404).json({ message: 'Result not found' })
    res.json({ message: 'Test result deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting result', error: err })
  }
}
