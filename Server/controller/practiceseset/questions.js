const chapterModel = require("../../model/practiceset/chapterModel");
const questionModel = require("../../model/practiceset/questionModel");
const subjectModel = require("../../model/practiceset/subjectModel");

// Create a new question
exports.createQuestions = async (req, res) => {
  try {
    const { className, subjectId, chapterId, questionText, options, language } =
      req.body;

    // Validate subject and chapter
    const subject = await subjectModel.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const chapter = await chapterModel.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    // Validate options
    if (!options || options.length < 2) {
      return res
        .status(400)
        .json({ message: "At least two options are required" });
    }

    // Ensure at least one correct option
    const hasCorrectOption = options.some((option) => option.isCorrect);
    if (!hasCorrectOption) {
      return res
        .status(400)
        .json({ message: "At least one option must be correct" });
    }

    // Create and save question
    const newQuestion = new questionModel({
      className,
      language,
      questionText,
      options,
      subject: subjectId,
      chapter: chapterId,
    });

    await newQuestion.save();
    res
      .status(201)
      .json({
        message: "Question created successfully",
        question: newQuestion,
      });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all questions for a chapter
exports.getQuestionsByChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const questions = await questionModel
      .find({ chapter: chapterId })
      .populate("subject chapter");

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await questionModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedQuestion)
      return res.status(404).json({ message: "Question not found" });

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await questionModel
      .find()
      .populate({
        path: "subject",
        select: "name class",
        model: "SubjectModel", // Ensure the correct model name
      }) // Populate subject name
      .populate("chapter", "title"); // Populate chapter title
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
};

// Update Question
exports.updateQuestions = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuestion = await questionModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Failed to update question", error });
  }
};

// Delete Question
exports.deleteQuestions = async (req, res) => {
  try {
    const { id } = req.params;
    await questionModel.findByIdAndDelete(id);
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete question", error });
  }
};
