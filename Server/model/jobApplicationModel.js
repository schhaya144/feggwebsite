const mongoose = require('mongoose')

const jobApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    experience: { type: Number, required: true },
    Availabledate: { type: String, required: true },
    NoticePeriod: { type: String, required: true },

    address: { type: String, required: true },
    jobId: { type: String, required: true },
    employmentStatus: {
      type: String,
      required: true,
      enum: ['EMPLOYED', 'UNEMPLOYED', 'STUDENT', 'OTHER'],
    },
    resumeFile: { type: String, required: true }, // Path to the uploaded resume file
    portfolioLink: { type: String, required: false }, // Optional field for portfolio link
    githubLink: { type: String, required: false }, // Optional field for GitHub link
    cvLink: { type: String, required: false }, // Optional field for CV link
  },
  { timestamps: true }
)

module.exports = mongoose.model('JobApplication', jobApplicationSchema)
