import React, { useState, useEffect } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryAPI";


const QuestionManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [language, setLanguage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(SummaryApi.subjects.url);
        setSubjects(response.data.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(SummaryApi.postQuestion.url, {
          params: { subjectId: selectedSubject, language },
        });
        setQuestions(response.data.data);
        setCurrentQuestionIndex(0); // Reset to the first question on filter change
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [selectedSubject, language]);

  const handleUpdateQuestion = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    try {
      await axios.put(
        SummaryApi.updateQuestion.url.replace(":questionId", currentQuestion._id),
        currentQuestion
      );
      alert("Question updated successfully!");
      setIsEditing(false); // Stop editing after save
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Failed to update the question.");
    }
  };

  const handleInputChange = (field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, index) =>
        index === currentQuestionIndex ? { ...q, [field]: value } : q
      )
    );
  };

  const handleOptionChange = (index, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, qIndex) =>
        qIndex === currentQuestionIndex
          ? {
              ...q,
              options: q.options.map((opt, optIndex) =>
                optIndex === index ? { ...opt, [field]: value } : opt
              ),
            }
          : q
      )
    );
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Delete question 
  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(SummaryApi.DeleteQuestion.url.replace(':questionId',questionId));
      alert("Question deleted successfully!");
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q._id !== questionId)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete the question.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Question Management</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          onChange={(e) => setSelectedSubject(e.target.value)}
          value={selectedSubject}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject._id} value={subject._id}>
              {subject.name}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>
      {isEditing && currentQuestion && (
        <div className="p-6 border border-gray-300 rounded shadow-sm bg-white">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Question Text:
            </label>
            <input
              type="text"
              value={currentQuestion.questionText}
              onChange={(e) =>
                handleInputChange("questionText", e.target.value)
              }
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Options:
            </label>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center gap-4 mb-2">
                <input
                  type="text"
                  value={option.optionText}
                  onChange={(e) =>
                    handleOptionChange(index, "optionText", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) =>
                    handleOptionChange(index, "isCorrect", e.target.checked)
                  }
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleUpdateQuestion}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded shadow-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Question List */}
      <div className="overflow-x-auto mb-6">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">S No.</th>
              <th className="px-4 py-2 border-b">Question Text</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question._id}>
                <td className="px-4 py-2 border-b text-center">{index+1}</td>
                <td className="px-4 py-2 border-b text-center">
                  {question.questionText}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setCurrentQuestionIndex(index);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded shadow-sm hover:bg-red-600 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Question and Options */}
    

      {/* Navigation between questions */}
      <div className="flex justify-between mt-6">
        <button
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow-sm hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow-sm hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionManagement;
