const JobApplication = require('../model/jobApplicationModel')

exports.submitJobApplication = async (req, res) => {
  console.log(req.body)
  try {
    const {
      fullName,
      email,
      contactNumber,
      experience,
      Availabledate,
      NoticePeriod,
      address,
      jobId,
      employmentStatus,
      portfolioLink,
      githubLink,
      cvLink,
    } = req.body

    // Save the file path of the resume
    const resumeFile = req.file ? req.file.path : null

    // Create and save a new job application
    const newApplication = new JobApplication({
      fullName,
      email,
      contactNumber,
      experience,
      Availabledate,
      NoticePeriod,
      address,
      jobId,
      employmentStatus,
      resumeFile,
      portfolioLink, // Optional field for portfolio link
      githubLink, // Optional field for GitHub link
      cvLink, // Optional field for CV link
    })

    await newApplication.save()

    res.status(201).json({ message: 'Application submitted successfully!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to submit the application.' })
  }
}

exports.getJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find() // Fetch all applications from the database
    res.status(200).json(applications)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch applications.' })
  }
}
