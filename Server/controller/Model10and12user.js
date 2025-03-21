const studentRegister = require('../model/studentRegister')
const UserDownload = require('../model/UserModelDownload')


// Store user download details
exports.storeUserDownload = async (req, res) => {
  console.log(req.body)
  try {
    const { userInput, subject, className } = req.body

    if (!userInput || !subject || !className) {
      return res.status(400).json({
        message: 'Student ID/Contact, Subject, and Class are required',
      })
    }

    // Check if user exists in the registered students collection
    const existingStudent = await studentRegister.findOne({
      $or: [{ contactNo: userInput }, { learnerId: userInput }],
    })

    if (!existingStudent) {
      return res.status(400).json({
        message: 'उपयोगकर्ता नहीं मिला। कृपया पहले पंजीकरण करें।',
      })
    }

    // Proceed with storing the download record
    const newDownload = new UserDownload({ userInput, subject, className })
    await newDownload.save()

    res.status(201).json({ message: 'Download recorded successfully' })
  } catch (error) {
    console.error('Error saving download record:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Fetch all downloads (for admin panel)
exports.getAllDownloads = async (req, res) => {
  try {
    const downloads = await UserDownload.find().sort({ downloadedAt: -1 })
    res.status(200).json(downloads)
  } catch (error) {
    console.error('Error fetching downloads:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
