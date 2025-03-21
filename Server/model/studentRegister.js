const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      required: true,
    },
    fatherFirstName: {
      type: String,
      required: true,
    },
    fatherMiddleName: {
      type: String,
      default: '',
    },
    fatherLastName: {
      type: String,
      required: true,
    },
    motherFirstName: {
      type: String,
      required: true,
    },
    motherMiddleName: {
      type: String,
      default: '',
    },
    motherLastName: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    block: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      default: '',
    },
    mail: {
      type: String,
    },
    district: {
      type: String,
      required: true,
    },
    tehsil: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'],
    },
    religion: {
      type: String,
      required: true,
      enum: [
        'Hindu',
        'Muslim',
        'Buddhist',
        'Christian',
        'Jewish',
        'Parsi',
        'Sikh',
        'Jain',
        'Others',
      ],
    },
    category: {
      type: String,
      required: true,
      enum: ['General', 'SC', 'ST', 'OBC', 'EWS'],
    },
    contactNo: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // Assuming contact number is a 10-digit number
    },
    sssmid: {
      type: Number,
      required: true,
      length: 9, // Assuming Samagra ID is 9 digits
    },
    learnerId: {
      type: String,
      required: true,
      length: 14,
    },
    lastClassStudied: {
      type: String,
      required: true,
      enum: ['5th', '6th', '7th', '8th', '9th', '10th'],
    },
    applyFor: {
      type: String,
      required: true,
      enum: ['New Student', 'TOC', 'SYC'],
    },
    appearing: {
      type: String,
      required: true,
      enum: ['10th', '12th'],
    },
    status: {
      type: String,
      required: true,
      enum: ['Pass', 'Fail'],
    },
    declarationAccepted: {
      type: Boolean,
      required: true,
    },
    scheme: {
      type: String,
      required: true,
      enum: [
        'Open School (Parampragat)',
        'RJN (Rook Jana Nahi)',
        'ALC (Aa Laut Chale)',
        'Super Section (SS)',
        'Saksham Bhaiya Behna (SBB)',
      ],
    },
  },
  {
    timestamps: true,
  }
)

const studentRegister = mongoose.model('Students', studentSchema)
module.exports = studentRegister
