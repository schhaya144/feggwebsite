// controllers/jobController.js
const Job = require('../model/JobSchema')
const mongoose = require('mongoose')

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Add a new job
const addJob = async (req, res) => {
  const {
    title,
    location,
    type,
    salary,
    salaryCurrency,
    description = 'No description provided',
    responsibilities = [],
    requirements = [],
    benefits = [],
    skills = [],
    postedDate,
    experienceYears,
    educationLevel,
  } = req.body

  try {
    const newJob = new Job({
      title,
      location,
      type,
      salary,
      salaryCurrency,
      description,
      responsibilities,
      requirements,
      benefits,
      skills,
      postedDate,
      experienceYears,
      educationLevel,
    })
    await newJob.save()
    res.status(201).json(newJob)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update job details
const updateJob = async (req, res) => {
  const { id } = req.params
  const {
    title,
    location,
    type,
    salary,
    salaryCurrency,
    description = 'No description provided',
    responsibilities = [],
    requirements = [],
    benefits = [],
    skills = [],
    postedDate,
    experienceYears,
    educationLevel,
  } = req.body

  try {
    const job = await Job.findById(id)

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    job.title = title
    job.location = location
    job.type = type
    job.salary = salary
    job.salaryCurrency = salaryCurrency
    job.description = description
    job.responsibilities = responsibilities
    job.requirements = requirements
    job.benefits = benefits
    job.skills = skills
    job.postedDate = postedDate
    job.experienceYears = experienceYears
    job.educationLevel = educationLevel

    await job.save()
    res.status(200).json(job)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete a job

const deleteJob = async (req, res) => {
  const { id } = req.params
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' })
  }
  try {
    // Find the job by ID
    const job = await Job.findByIdAndDelete(id)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    // Remove the job
    res.status(200).json({ message: 'Job deleted successfully' })
  } catch (error) {
    console.error('Error in deleteJob:', error) // Log error for debugging
    res.status(500).json({ message: 'Server error. Please try again later.' })
  }
}

module.exports = { getJobs, addJob, updateJob, deleteJob }
