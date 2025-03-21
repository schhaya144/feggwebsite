import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaTrashAlt } from 'react-icons/fa'
import SummaryApi from '../../common/SummaryAPI'

const PracticesetCards = () => {
  const [mockSets, setMockSets] = useState([])
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    fetchMockSets()
  }, [])

  const fetchMockSets = async () => {
    try {
      const response = await axios.get(SummaryApi.Getpracticeset.url)
      setMockSets(response.data.data)
    } catch (error) {
      console.error('Error fetching Practice set:', error)
    }
  }

  const confirmDelete = (id) => {
    setDeleteId(id)
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await axios.delete(
        SummaryApi.DeletePracticeset.url.replace(':id', deleteId)
      )
      setMockSets(mockSets.filter((mockSet) => mockSet._id !== deleteId))
      setDeleteId(null)
      alert('Practice Set deleted successfully')
    } catch (error) {
      console.error('Error deleting mock set:', error)
      alert('Failed to delete Practice Set')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {mockSets.map((mockSet) => (
        <div key={mockSet._id} className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Class: {mockSet.className}</h2>
          <p className="text-sm">Subject: {mockSet.subject?.name || 'N/A'}</p>
          <p className="text-sm">Total Marks: {mockSet.totalMarks}</p>
          <p className="text-sm">Duration: {mockSet.duration} min</p>

          <button
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => confirmDelete(mockSet._id)}
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg font-semibold">
              Are you sure you want to delete this Practice Set?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PracticesetCards
