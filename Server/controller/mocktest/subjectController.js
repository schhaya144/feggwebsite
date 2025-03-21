
const Subject = require("../../model/mocktest/subjectModel");


const createSubject = async (req, res) => {
  const { name, mockClass} = req.body;
  try {
    const subject = new Subject({ name,mockClass });
    await subject.save();
    res.status(201).json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// get subject 
const getSubjects = async (req, res) => {
    try {
      const subjects = await Subject.find({});
      res.status(200).json({ success: true, data: subjects });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
// Update subject
const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { mockClass } = req.body;
console.log(mockClass)
  try {
    const subject = await Subject.findByIdAndUpdate(id, { name ,mockClass}, { new: true });
    if (!subject) {
      return res.status(404).json({ success: false, message: 'Subject not found' });
    }
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete subject
const deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) {
      return res.status(404).json({ success: false, message: 'Subject not found' });
    }
    res.status(200).json({ success: true, message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createSubject, getSubjects, updateSubject, deleteSubject };

