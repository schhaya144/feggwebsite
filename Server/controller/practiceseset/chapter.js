const chapterModel = require('../../model/practiceset/chapterModel')
const subjectModel = require('../../model/practiceset/subjectModel')

// Create a new chapter
exports.createChapter = async (req, res) => {
  try {
    const { title, subject, className } = req.body

    if (!title || !subject || !className) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const subjectExists = await subjectModel.findOne({
      _id: subject,
      class: className,
    })

    if (!subjectExists) {
      return res
        .status(400)
        .json({ message: 'Invalid subject for the selected class' })
    }

    const newChapter = new chapterModel({ title, subject })
    await newChapter.save()

    res
      .status(201)
      .json({ message: 'Chapter created successfully', newChapter })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Get all chapters for a subject
exports.getChaptersByid = async (req, res) => {
  try {
    const { subjectId } = req.params

    // Check if subjectId is provided
    if (!subjectId) {
      return res.status(400).json({ message: 'Subject ID is required' })
    }

    const chapters = await chapterModel.find({ subject: subjectId })

    if (!chapters.length) {
      return res
        .status(404)
        .json({ message: 'No chapters found for this subject' })
    }

    res.status(200).json({ chapters })
  } catch (error) {
    console.error('Error fetching chapters:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
// get
exports.getChapters = async (req, res) => {
  try {
    const chapters = await chapterModel
      .find()
      .populate({
        path: 'subject',
        select: 'name class',
        model: 'SubjectModel', // Ensure the correct model name
      })
      .sort({ title: -1 })

    res.status(200).json(chapters)
  } catch (error) {
    console.error('Error fetching chapters:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

// Update a chapter
exports.updateChapter = async (req, res) => {
  try {
    const { title, subject } = req.body
    const updatedChapter = await chapterModel.findByIdAndUpdate(
      req.params.id,
      { title, subject },
      { new: true }
    )

    if (!updatedChapter)
      return res.status(404).json({ message: 'Chapter not found' })

    res
      .status(200)
      .json({ message: 'Chapter updated successfully', updatedChapter })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
// Delete chapter
exports.deleteChapter = async (req, res) => {
  try {
    const deletedChapter = await chapterModel.findByIdAndDelete(req.params.id)
    if (!deletedChapter)
      return res.status(404).json({ message: 'Chapter not found' })

    res.status(200).json({ message: 'Chapter deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
