
const Question = require("../../model/mocktest/questionsModel");

const createQuestion = async (req, res) => {
  try {
    const { subjectId, chapter, questionText, options, language, classMock } = req.body;
    
    if (chapter < 1 || chapter > 15) {
      return res.status(400).json({ success: false, message: "Invalid chapter number. It should be between 1 and 15." });
    }

    const question = new Question({
      subjectId,
      chapter,
      questionText,
      options,
      language,
      classMock,
    });

    await question.save();
    res.status(201).json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



  // get 
  const getQuestionsBySubject = async (req, res) => {
    try {
      const { subjectId, language } = req.query;
  
      const filter = {};
      if (subjectId) filter.subjectId = subjectId;
      if (language) filter.language = language;
  
      const questions = await Question.find(filter).populate("subjectId", "name");
  
      if (!questions || questions.length === 0) {
        return res.status(200).json({ success: true, data: [], message: "No questions found for the selected language." });
      }
  
      res.status(200).json({ success: true, data: questions });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  // Update Question
const updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params; // Question ID from URL
    const { questionText, options, language } = req.body; // Data to update

    // Validate the question ID
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    // Update the question fields
    question.questionText = questionText || question.questionText;
    question.language = language || question.language;
    question.options = options || question.options;

    // Save the updated question
    await question.save();

    res.status(200).json({ success: true, data: question, message: "Question updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    res.status(200).json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
  module.exports = { createQuestion, getQuestionsBySubject, updateQuestion, deleteQuestion };