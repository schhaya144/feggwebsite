import React, { useState } from "react";
import axios from "axios";
import DisplaySubjects from "./DisplaySubject";
import SummaryApi from "../../common/SummaryAPI";

const CreateSubject = () => {
  const [subject, setSubject] = useState({
    name: "",
    mockClass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject({ ...subject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(SummaryApi.subjects.url, subject);
      alert("Subject created successfully!");
      setSubject({ name: "", mockClass: "" }); // Reset form fields after submission
    } catch (error) {
      console.error("Error creating subject:", error);
      alert("Failed to create subject. Check console for details.");
    }
  };

  return (
    <>
      <div className="p-6 max-w-md mx-auto bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Subject</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">
              Subject Name:
            </label>
            <input
              type="text"
              name="name"
              value={subject.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Class:</label>
            <select
              name="mockClass"
              value={subject.mockClass}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select class</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md"
          >
            Create Subject
          </button>
        </form>
      </div>
      <DisplaySubjects />
    </>
  );
};

export default CreateSubject;
