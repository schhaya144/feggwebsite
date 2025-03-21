const moment = require('moment') // assuming you have the Student model defined as shown earlier
const { body, validationResult } = require('express-validator')

const studentRegister = require('../model/studentRegister')
// Function to generate the learnerId
const generateLearnerId = async (lastClassStudied) => {
  const currentDate = new Date()
  const year = currentDate.getFullYear().toString().slice(2) // Last two digits of year
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2) // Two digits of month
  const date = ('0' + currentDate.getDate()).slice(-2) // Two digits of date
  const classDigit = lastClassStudied === '10th' ? '2' : '1' // Class representation

  // Count students registered on the same date
  const studentCount = await studentRegister.countDocuments({
    createdAt: {
      $gte: new Date(currentDate.setHours(0, 0, 0, 0)),
      $lt: new Date(currentDate.setHours(23, 59, 59, 999)),
    },
  })

  const count = ('00000' + (studentCount + 1)).slice(-5) // Five-digit counter

  return `EG${year}${month}${date}${classDigit}${count}`
}

// POST controller to register a new student

const registerStudent = async (req, res) => {
  console.log('Received request body:', req.body)

  // Validate request body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { lastClassStudied, declarationAccepted, ...studentData } = req.body
    const learnerId = await generateLearnerId(lastClassStudied)
    console.log('Generated learner ID:', learnerId)

    const newStudent = new studentRegister({
      ...studentData,
      lastClassStudied,
      learnerId,
      declarationAccepted,
    })

    await newStudent.save()
    res.status(201).json({
      message: `Student registered successfully and learnerId is ${learnerId}`,
      learnerId,
    })
  } catch (err) {
    // // If there's a duplicate key error (e.g., contactNo is already in use)
    // if (err.code === 11000) {
    //   return res.status(400).json({
    //     message: `Contact number ${err.keyValue.contactNo} is already in use. Please provide a different contact number.`,
    //   })
    // }

    // Handle other potential errors (like database connection issues)
    console.error('Error during registration:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// Middleware for validation
const validateStudentRegistration = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('fatherFirstName')
    .notEmpty()
    .withMessage('Father first name is required'),
  body('fatherLastName').notEmpty().withMessage('Father last name is required'),
  body('motherFirstName')
    .notEmpty()
    .withMessage('Mother first name is required'),
  body('motherLastName').notEmpty().withMessage('Father last name is required'),
  body('permanentAddress')
    .notEmpty()
    .withMessage('Permanent address is required'),
  body('block').notEmpty().withMessage('Block is required'),
  body('district').notEmpty().withMessage('District is required'),
  body('tehsil').notEmpty().withMessage('Tehsil is required'),
  body('pincode')
    .isNumeric()
    .withMessage('Pincode must be a number')
    .isLength({ min: 6, max: 6 })
    .withMessage('Pincode must be 6 digits'),
  body('dob').isISO8601().withMessage('Date of birth must be a valid date'),
  body('age').isNumeric().withMessage('Age must be a number'),
  body('gender')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Invalid gender'),
  body('religion')
    .isIn([
      'Hindu',
      'Muslim',
      'Buddhist',
      'Christian',
      'Jewish',
      'Parsi',
      'Sikh',
      'Jain',
      'Others',
    ])
    .withMessage('Invalid religion'),

  body('appearing').isIn(['10th', '12th']).withMessage('Invalid category'),
  body('category')
    .isIn(['General', 'SC', 'ST', 'OBC', 'EWS'])
    .withMessage('Invalid category'),
  body('contactNo')
    .matches(/^[0-9]{10}$/)
    .withMessage('Contact number must be 10 digits'),
  body('sssmid')
    .isNumeric()
    .withMessage('Samagra ID must be a number')
    .isLength({ min: 9, max: 9 })
    .withMessage('Samagra ID must be 9 digits'),
  body('lastClassStudied')
    .isIn(['5th', '6th', '7th', '8th', '9th', '10th'])
    .withMessage('Invalid class'),
  body('applyFor')
    .isIn(['New Student', 'TOC', 'SYC'])
    .withMessage('Invalid applyFor value'),
  body('status').isIn(['Pass', 'Fail']).withMessage('Invalid status'),
  body('declarationAccepted')
    .isBoolean()
    .withMessage('Declaration acceptance must be true or false'),
]

const getAllStudents = async (req, res) => {
  try {
    const allstudent = await studentRegister.find()
    res.status(200).json(allstudent)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error })
  }
}
// Get all students
const getTotalStudents = async (req, res) => {
  try {
    const totalStudents = await studentRegister.countDocuments() // Get total count
    res.status(200).json({ total: totalStudents })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Get a single student by SSSMID
const getStudentById = async (req, res) => {
  try {
    const student = await studentRegister.findOne({ sssmid: req.params.sssmid })
    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.status(200).json(student)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Update student
const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await studentRegister.findByIdAndUpdate(
      req.params.id, // Find student by ID
      { $set: req.body }, // Update with new data
      { new: true, runValidators: true } // Return updated document & validate fields
    )

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' })
    }

    res.status(200).json(updatedStudent)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Delete student by SSSMID
const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await studentRegister.findOneAndDelete(req.params.id)
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' })
    }
    res.status(200).json({ message: 'Student deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  registerStudent,
  getTotalStudents,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  validateStudentRegistration,
}
