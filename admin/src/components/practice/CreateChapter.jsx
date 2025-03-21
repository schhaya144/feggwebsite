import { useState, useEffect } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryAPI";
import ChapterTable from "./ChapterTable";

const CreateChapterForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    className: "",
  });

  const [subjects, setSubjects] = useState([]); // Store subjects for dropdown
  const [message, setMessage] = useState("");

  // Fetch Subjects Based on Selected Class
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
      }
    };
  
    fetchSubjects();
  }, [formData.className]); // Re-fetch when className changes

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(SummaryApi.createChapter.url, {
        title: formData.title,
        subject: formData.subject,
        className: formData.className, // Ensure className is sent
      });

      setMessage(response.data.message);
      setFormData({ title: "", subject: "", className: "" });
      setSubjects([]);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
    <div className="max-w-md mx-auto bg-white shadow-lg border border-[#fd645b] rounded-xl border-r-4 border-b-4 p-5">
      <h2 className="text-xl font-semibold mb-4 text-center">Create Chapter</h2>

      {message && <p className="text-green-600 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 ">
        {/* Select Class */}
        <div>
          <label className="block text-gray-700">Select Class</label>
          <select
            name="className"
            value={formData.className}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            required
          >
            <option value="">Select a class</option>
            <option value="10">Class 10</option>
            <option value="12">Class 12</option>
          </select>
        </div>

        {/* Subject Selection */}
        <div>
          <label className="block text-gray-700">Select Subject</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            required
            disabled={!formData.className} // Disable until class is selected
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter Title Input */}
        <div>
          <label className="block text-gray-700">Chapter Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter chapter title"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-red-600 transition"
          disabled={!formData.className || !formData.subject} // Disable if class or subject is not selected
        >
          Create Chapter
        </button>
      </form>
    </div>
   <ChapterTable/></>
  );
};

export default CreateChapterForm;
