const studentRegister = require('../model/studentRegister')

// Fetch student details based on input
exports.getStudentByDetails = async (req, res) => {
  console.log(req.body)
  try {
    const { firstName, middleName, lastName, sssmid, contactNo } = req.body

    // Find student in the database
    const student = await studentRegister.findOne({
      firstName,
      middleName,
      lastName,
      $or: [{ sssmid }, { contactNo }],
      // dob,
    })

    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    console.log(student)
    res.json(student)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

exports.getStudentLernerById = async (req, res) => {
  try {
    const student = await studentRegister.findOne({
      id: req.params.id,
    })
    if (!student) return res.status(404).json({ message: 'Student Not found' })
    res.json(student)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Update Contact No., Email, and Permanent Address
exports.updateStudentLernerid = async (req, res) => {
  try {
    const { id } = req.params
    const { contactNo, mail, permanentAddress } = req.body
    console.log('id', id)
    console.log(contactNo, mail, permanentAddress)
    const updatedStudent = await studentRegister.findOneAndUpdate(
      { _id: id }, // ✅ Correct way to find by ID
      { contactNo, mail, permanentAddress },
      { new: true }
    )
    console.log('data', updatedStudent)
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not founded' })
    }

    res
      .status(200)
      .json({ message: 'Student details updated successfully', updatedStudent })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}
