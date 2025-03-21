import React, { useState, useEffect } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryAPI";

const CreateQuestion = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  
  const [question, setQuestion] = useState({
    questionText: "",
    options: [{ optionText: "", isCorrect: false }],
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleOptionChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedOptions = question.options.map((option, i) =>
      i === index ? { ...option, [name]: type === "checkbox" ? checked : value } : option
    );
    setQuestion({ ...question, options: updatedOptions });
  };

  const addOption = () => {
    setQuestion({
      ...question,
      options: [...question.options, { optionText: "", isCorrect: false }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...question,
        subjectId: selectedSubject,
        language: selectedLanguage,
        classMock: selectedClass,
        chapter: selectedChapter,
      };
      
      await axios.post(SummaryApi.postQuestion.url, payload);
      alert("Question created successfully!");
      setQuestion({ questionText: "", options: [{ optionText: "", isCorrect: false }] });
      setSelectedSubject("");
      setSelectedLanguage("");
      setSelectedClass("");
      setSelectedChapter("");
    } catch (error) {
      console.error("Error creating question:", error);
      alert("Failed to create question.");
    }
  };


  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2">Subject:</label>
          <select
            name="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="" disabled>
              Select Subject
            </option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Class:</label>
          <select
            name="selectedClass"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="" disabled>
              Select Class
            </option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
          </select>
        </div>
        <div>
          <label>Chapter:</label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="" disabled>Select Chapter</option>
            {[...Array(15).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Language:</label>
          <select
            name="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="" disabled>
              Select Language
            </option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Question Text:</label>
          <input
            type="text"
            name="questionText"
            value={question.questionText}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <h4>Options</h4>
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                name="optionText"
                value={option.optionText}
                onChange={(e) => handleOptionChange(index, e)}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
              <label>
                <input
                  type="checkbox"
                  name="isCorrect"
                  checked={option.isCorrect}
                  onChange={(e) => handleOptionChange(index, e)}
                />
                Correct
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Add Option
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
