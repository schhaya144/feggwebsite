import { useState, useEffect } from 'react'
import axios from 'axios'
import SummaryApi from '../../common/SummaryAPI'

const SubjectsTable = () => {
  const [subjects, setSubjects] = useState([])
  const [filteredSubjects, setFilteredSubjects] = useState([])
  const [selectedClass, setSelectedClass] = useState('all')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [editSubject, setEditSubject] = useState(null)
  const [updatedData, setUpdatedData] = useState({ name: '', class: '' })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [subjectToDelete, setSubjectToDelete] = useState(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(SummaryApi.getSubjects.url)
      setSubjects(response.data)
      setFilteredSubjects(response.data)
      setLoading(false)
    } catch (error) {
      setMessage('Failed to fetch subjects')
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const selected = e.target.value
    setSelectedClass(selected)
    setFilteredSubjects(
      selected === 'all'
        ? subjects
        : subjects.filter((subject) => subject.class === selected)
    )
  }

  const confirmDelete = (id) => {
    setSubjectToDelete(id)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    try {
      await axios.delete(
        SummaryApi.DeleteSubjects.url.replace(':id', subjectToDelete)
      )
      setMessage('Subject deleted successfully')
      setShowDeleteModal(false)
      fetchSubjects()
    } catch (error) {
      setMessage('Failed to delete subject')
    }
  }

  const handleEditClick = (subject) => {
    setEditSubject(subject._id)
    setUpdatedData({ name: subject.name, class: subject.class })
    setShowUpdateModal(true)
  }

  const handleUpdate = async () => {
    try {
      await axios.put(
        SummaryApi.updateSubject.url.replace(':id', editSubject),
        updatedData
      )
      setMessage('Subject updated successfully')
      setShowUpdateModal(false)
      fetchSubjects()
    } catch (error) {
      setMessage('Failed to update subject')
    }
  }

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg p-6 mt-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Subjects List</h2>
      {message && <p className="text-red-600 text-center">{message}</p>}
      <div className="mb-4 flex justify-end">
        <select
          value={selectedClass}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="all">All Classes</option>
          <option value="10">Class 10</option>
          <option value="12">Class 12</option>
        </select>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-primary text-white">
              <th className="border px-4 py-2">S.No.</th>
              <th className="border px-4 py-2">Subject Name</th>
              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((subject, i) => (
              <tr key={subject._id} className="text-center">
                <td className="border px-4 py-2">{i + 1}</td>
                <td className="border px-4 py-2">{subject.name}</td>
                <td className="border px-4 py-2">{subject.class}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(subject)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(subject._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">
              Are you sure you want to delete this subject?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Edit Subject</h3>
            <input
              type="text"
              value={updatedData.name}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, name: e.target.value })
              }
              className="border px-3 py-2 w-full mt-2"
            />
            <select
              value={updatedData.class}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, class: e.target.value })
              }
              className="border px-3 py-2 w-full mt-2"
            >
              <option value="10">Class 10</option>
              <option value="12">Class 12</option>
            </select>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubjectsTable
