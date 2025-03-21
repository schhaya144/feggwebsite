import { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryAPI";

const ChapterTable = ({ setFormData, setEditingChapter }) => {
  const [chapters, setChapters] = useState([]);
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState(""); // Filter by Class
  const [selectedSubject, setSelectedSubject] = useState(""); // Filter by Subject
  const itemsPerPage = 5;

  useEffect(() => {
    fetchChapters();
  }, []);

  useEffect(() => {
    filterChapters();
  }, [chapters, selectedClass, selectedSubject]);

  const fetchChapters = async () => {
    try {
      const response = await axios.get(SummaryApi.getChapter.url);
      setChapters(response.data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  const filterChapters = () => {
    let filtered = chapters;

    if (selectedClass) {
      filtered = filtered.filter(chapter => chapter.subject?.class === selectedClass);
    }
    if (selectedSubject) {
      filtered = filtered.filter(chapter => chapter.subject?.name === selectedSubject);
    }

    setFilteredChapters(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this chapter?")) return;

    try {
      await axios.delete(SummaryApi.DeleteChapter.url.replace(":id", id));
      setMessage("Chapter deleted successfully!");
      fetchChapters();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete chapter.");
    }
  };

  const handleEdit = (chapter) => {
    setEditingId(chapter._id);
    setEditTitle(chapter.title);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(SummaryApi.DeleteChapter.url.replace(":id", id), { title: editTitle });

      setMessage("Chapter updated successfully!");
      setEditingId(null);
      fetchChapters();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update chapter.");
    }
  };

  const totalPages = Math.ceil(filteredChapters.length / itemsPerPage);
  const currentChapters = filteredChapters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-6 bg-white p-6">
      {message && <p className="text-center text-red-500">{message}</p>}

      {/* Filters */}
      <div className="flex justify-between mb-4">
        <select
          className="border p-2 rounded"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">All Classes</option>
          {[...new Set(chapters.map(chapter => chapter.subject?.class))].map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          {[...new Set(chapters.map(chapter => chapter.subject?.name))].map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-primary text-white">
            <th className="border p-2">S.No.</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentChapters.length > 0 ? (
            currentChapters.map((chapter, i) => (
              <tr key={chapter._id} className="text-center">
                <td className="border p-2">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                <td className="border p-2">
                  {editingId === chapter._id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border p-1"
                    />
                  ) : (
                    chapter.title
                  )}
                </td>
                <td className="border p-2">{chapter.subject?.name || "N/A"}</td>
                <td className="border p-2">{chapter.subject?.class || "N/A"}</td>
                <td className="border p-2">
                  {editingId === chapter._id ? (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleSave(chapter._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEdit(chapter)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-primary text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(chapter._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No chapters found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mr-2 border rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 border bg-gray-100">{currentPage} / {totalPages}</span>
        <button
          className={`px-4 py-2 ml-2 border rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChapterTable;
