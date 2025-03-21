const subjectModel = require('../../model/practiceset/subjectModel')

// Create a new subject
exports.createSubjects = async (req, res) => {
  try {
    const { name, class: className } = req.body

    if (!name || !className) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const newSubject = new subjectModel({ name, class: className })
    await newSubject.save()

    res
      .status(201)
      .json({ message: 'Subject created successfully', newSubject })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Get all subjects
exports.getSubjectss = async (req, res) => {
  try {
    const subjects = await subjectModel.find().sort({ name: -1 })
    res.status(200).json(subjects)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Get subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await subjectModel.findById(req.params.id)
    if (!subject) return res.status(404).json({ message: 'Subject not found' })

    res.status(200).json(subject)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Update Subject API
exports.updateSubjects = async (req, res) => {
  try {
    const { id } = req.params
    const { name, class: subjectClass } = req.body

    const updatedSubject = await subjectModel.findByIdAndUpdate(
      id,
      { name, class: subjectClass },
      { new: true }
    )

    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' })
    }

    res
      .status(200)
      .json({ message: 'Subject updated successfully', updatedSubject })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update subject', error })
  }
}

// Delete subject
exports.deleteSubjects = async (req, res) => {
  try {
    const deletedSubject = await subjectModel.findByIdAndDelete(req.params.id)
    if (!deletedSubject)
      return res.status(404).json({ message: 'Subject not found' })

    res.status(200).json({ message: 'Subject deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

exports.getSubjectsByClass = async (req, res) => {
  try {
    const { className } = req.params

    if (!className) {
      return res.status(400).json({ message: 'Class name is required' })
    }

    const subjects = await subjectModel.find({ class: className })

    res.status(200).json({ subjects })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
