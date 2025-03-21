const PracticeTest = require('../../model/UserModelDownload')

// Fetch mock tests for Class 12
exports.getPracticeTests = async (req, res) => {
  try {
    const tests = await PracticeTest.find({ className: '12' })
    res.status(200).json({ success: true, data: tests })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Save a new mock test submission
exports.submitPracticeTest = async (req, res) => {
  console.log(req.body)
  try {
    const { className, subject, userName, userInput } = req.body

    const newTest = new PracticeTest({
      className,
      subject,
      userName,
      userInput,
    })
    await newTest.save()

    res
      .status(201)
      .json({ success: true, message: 'Mock test submitted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
