import { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryAPI";

const QuestionTable = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [message, setMessage] = useState("");
  const [filters, setFilters] = useState({ subject: "", class: "", chapter: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, questions]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(SummaryApi.Getquestion.url);
      setQuestions(response.data);
      setFilteredQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const applyFilters = () => {
    let filtered = questions.filter((q) =>
      (filters.subject ? q.subject?.name === filters.subject : true) &&
      (filters.class ? q.subject?.class === filters.class : true) &&
      (filters.chapter ? q.chapter?.title === filters.chapter : true)
    );
    setFilteredQuestions(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await axios.delete(SummaryApi.Question.url.replace(":id", id));
      setMessage("Question deleted successfully!");
      fetchQuestions();
    } catch (error) {
      setMessage("Failed to delete question.");
    }
  };

  const handleEdit = (question) => {
    setEditingId(question._id);
    setEditData({
      questionText: question.questionText,
      language: question.language,
    });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(SummaryApi.Question.url.replace(":id", id), editData);
      setMessage("Question updated successfully!");
      setEditingId(null);
      fetchQuestions();
    } catch (error) {
      setMessage("Failed to update question.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredQuestions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mt-6 bg-white p-6">
      {message && <p className="text-center text-red-500">{message}</p>}

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Filter by Subject"
          className="border p-2"
          onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by Class"
          className="border p-2"
          onChange={(e) => setFilters({ ...filters, class: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by Chapter"
          className="border p-2"
          onChange={(e) => setFilters({ ...filters, chapter: e.target.value })}
        />
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-primary text-white">
            <th className="border p-2">S.No.</th>
            <th className="border p-2">Question</th>
            <th className="border p-2">Language</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Chapter</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((question, i) => (
              <tr key={question._id} className="text-center">
                <td className="border p-2">{indexOfFirstItem + i + 1}</td>
                <td className="border p-2">
                  {editingId === question._id ? (
                    <input
                      type="text"
                      value={editData.questionText}
                      onChange={(e) => setEditData({ ...editData, questionText: e.target.value })}
                      className="border p-1"
                    />
                  ) : (
                    question.questionText
                  )}
                </td>
                <td className="border p-2">
                  {editingId === question._id ? (
                    <input
                      type="text"
                      value={editData.language}
                      onChange={(e) => setEditData({ ...editData, language: e.target.value })}
                      className="border p-1"
                    />
                  ) : (
                    question.language
                  )}
                </td>
                <td className="border p-2">{question.subject?.name || "N/A"}</td>
                <td className="border p-2">{question.subject?.class || "N/A"}</td>
                <td className="border p-2">{question.chapter?.title || "N/A"}</td>
                <td className="border p-2">
                  {editingId === question._id ? (
                    <button className="bg-green-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleSave(question._id)}>Save</button>
                  ) : (
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleEdit(question)}>Edit</button>
                  )}
                  <button className="bg-primary text-white px-3 py-1 rounded" onClick={() => handleDelete(question._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">No questions found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button disabled={currentPage === 1} className="bg-gray-500 text-white px-4 py-2 mr-2" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <button disabled={indexOfLastItem >= filteredQuestions.length} className="bg-gray-500 text-white px-4 py-2" onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default QuestionTable;
