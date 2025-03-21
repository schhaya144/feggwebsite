// models/job.js
const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },

  type: { type: String, required: true }, // e.g., Full-time, Part-time
  salary: { type: String, required: true },
  salaryCurrency: { type: String, required: true }, // e.g., USD, INR
  description: { type: String, default: 'No description provided' },
  responsibilities: { type: [String], default: [] },
  requirements: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  postedDate: { type: Date, required: true },
  experienceYears: { type: Number, required: true },
  educationLevel: { type: String, required: true }, // e.g., Bachelor's, Master's
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job
