import { useState, useEffect } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryAPI";
import QuestionTable from "./QuestionTable";

const QuestionBank = () => {
  const [formData, setFormData] = useState({
    className: "",
    subjectId: "",
    chapterId: "",
    questionText: "",
    language: "English",
    options: [{ optionText: "", isCorrect: false }],
  });

  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      if (formData.className) {
        try {
          const response = await axios.get(SummaryApi.GetSubjectByClass.url.replace(":className", formData.className));
          setSubjects(response.data.subjects || []);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      } else {
        setSubjects([]);
        setChapters([]);
      }
    };
    fetchSubjects();
  }, [formData.className]);

  useEffect(() => {
    const fetchChapters = async () => {
      if (formData.subjectId) {
        try {
          const response = await axios.get(SummaryApi.GetChapterBySubjectid.url.replace(":subjectId", formData.subjectId));
          setChapters(response.data.chapters || []);
        } catch (error) {
          console.error("Error fetching chapters:", error);
        }
      } else {
        setChapters([]);
      }
    };
    fetchChapters();
  }, [formData.subjectId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData.options];
    newOptions[index][field] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, { optionText: "", isCorrect: false }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(SummaryApi.CreateQuestion.url, formData);
      setMessage(response.data.message);
      setFormData({ className: "", subjectId: "", chapterId: "", questionText: "", language: "English", options: [{ optionText: "", isCorrect: false }] });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
    <div className="max-w-lg mx-auto bg-white shadow-lg border border-[#fd645b] rounded-xl border-r-4 border-b-4 p-5">
      <h2 className="text-xl font-semibold mb-4 text-center">Create Question</h2>
      {message && <p className="text-green-600 text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="className" value={formData.className} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
          <option value="">Select a class</option>
          <option value="10">Class 10</option>
          <option value="12">Class 12</option>
        </select>

        <select name="subjectId" value={formData.subjectId} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject._id} value={subject._id}>{subject.name}</option>
          ))}
        </select>

        <select name="chapterId" value={formData.chapterId} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
          <option value="">Select a chapter</option>
          {chapters.map((chapter) => (
            <option key={chapter._id} value={chapter._id}>{chapter.title}</option>
          ))}
        </select>

        <select name="language" value={formData.language} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>

        <input type="text" name="questionText" value={formData.questionText} onChange={handleChange} placeholder="Enter question" className="w-full px-3 py-2 border rounded-lg" required />

        {formData.options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input type="text" value={option.optionText} onChange={(e) => handleOptionChange(index, "optionText", e.target.value)} placeholder={`Option ${index + 1}`} className="w-full px-3 py-2 border rounded-lg" required />
            <input type="checkbox" checked={option.isCorrect} onChange={(e) => handleOptionChange(index, "isCorrect", e.target.checked)} className="h-5 w-5" />
          </div>
        ))}

        <button type="button" onClick={addOption} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Add Option</button>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-red-600">Create Question</button>
      </form>
    </div>
    </>
  );
};

export default QuestionBank;
