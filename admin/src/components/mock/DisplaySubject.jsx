import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SummaryApi from '../../common/SummaryAPI'

const DisplaySubjects = () => {
  const [subjects, setSubjects] = useState([])
  const [editSubject, setEditSubject] = useState({
    id: '',
    name: '',
    mockClass: '',
  })

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(SummaryApi.subjects.url)
      setSubjects(response.data.data)
    } catch (error) {
      console.error('Error fetching subjects:', error)
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this subject?'
    )
    if (window.confirm('Are you sure you want to delete this subject?')) {
      console.log('Confirmed!')
    } else {
      console.log('Cancelled!')
    }

    if (!confirmDelete) return

    try {
      await axios.delete(SummaryApi.deleteSubject.url.replace(':id', id))
      alert('Subject deleted successfully!')
      fetchSubjects()
    } catch (error) {
      console.error('Error deleting subject:', error)
      alert('Failed to delete subject.')
    }
  }

  const handleEdit = (id, name, mockClass) => {
    setEditSubject({ id, name, mockClass })
  }

  const handleUpdate = async () => {
    try {
      await axios.put(
        SummaryApi.updateSubject.url.replace(':id', editSubject.id),
        { name: editSubject.name, mockClass: editSubject.mockClass }
      )
      alert('Subject updated successfully!')
      setEditSubject({ id: '', name: '', mockClass: '' })
      fetchSubjects()
    } catch (error) {
      console.error('Error updating subject:', error)
      alert('Failed to update subject.')
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Subjects</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">S.no.</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Class</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, i) => (
            <tr key={subject._id}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {i + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {subject.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {subject.mockClass}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() =>
                    handleEdit(subject._id, subject.name, subject.mockClass)
                  }
                  className="px-4 py-1 mr-2 bg-blue-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(subject._id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editSubject.id && (
        <div className="mt-4 p-4 bg-white rounded-md shadow-md">
          <h3 className="text-lg font-bold">Edit Subject</h3>
          <label className="block text-lg font-medium mb-2">
            Subject Name:
          </label>
          <input
            type="text"
            value={editSubject.name}
            onChange={(e) =>
              setEditSubject({ ...editSubject, name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <label className="block text-lg font-medium mt-4 mb-2">Class:</label>
          <select
            value={editSubject.mockClass}
            onChange={(e) =>
              setEditSubject({ ...editSubject, mockClass: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select class</option>
            <option value="10">10th</option>
            <option value="12">12th</option>
          </select>
          <button
            onClick={handleUpdate}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Update
          </button>
        </div>
      )}
    </div>
  )
}

export default DisplaySubjects
