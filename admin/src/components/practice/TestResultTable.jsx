import { useEffect, useState } from 'react'
import SummaryApi from '../../common/SummaryAPI'

const TestResultsTable = () => {
  const [results, setResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [editingResult, setEditingResult] = useState(null)
  const [formData, setFormData] = useState({
    learnerName: '',
    learnerId: '',
    score: 0,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 10
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedName, setSelectedName] = useState('')

  useEffect(() => {
    fetchResults()
  }, [])

  useEffect(() => {
    filterResults()
  }, [selectedClass, selectedName, results])

  const fetchResults = async () => {
    try {
      const response = await fetch(SummaryApi.getTestResult.url)
      const data = await response.json()
      setResults(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching results:', error)
    }
  }

  const filterResults = () => {
    let filtered = results
    if (selectedClass) {
      filtered = filtered.filter((result) => result.className === selectedClass)
    }
    if (selectedName) {
      filtered = filtered.filter((result) => result.name === selectedName)
    }
    setFilteredResults(filtered)
  }

  const deleteResult = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result?')) return
    try {
      await fetch(SummaryApi.TestResult.url.replace(':id', id), {
        method: 'DELETE',
      })
      fetchResults()
    } catch (error) {
      console.error('Error deleting result:', error)
    }
  }

  const handleEdit = (result) => {
    setEditingResult(result._id)
    setFormData({
      learnerName: result.learnerName,
      learnerId: result.learnerId,
      score: result.score,
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const updateResult = async () => {
    try {
      const apiUrl = SummaryApi.TestResult.url.replace(':id', editingResult)

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update result')
      }

      setEditingResult(null)
      fetchResults()
    } catch (error) {
      console.error('Error updating result:', error)
    }
  }

  const indexOfLastResult = currentPage * resultsPerPage
  const indexOfFirstResult = indexOfLastResult - resultsPerPage
  const currentResults = filteredResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  )

  return (
    <div className=" mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-4 text-red-500">
        Test Results
      </h2>

      <div className="flex justify-around mb-4 border-2 border-[#fd645b] border-double rounded-md py-10">
        <div className="flex justify-center items-center">
          <label className="text-xl font-semibold me-1">Class :</label>
          <select
            className="border p-2 rounded focus:ring-2 focus:ring-[#fd645b]"
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {[...new Set(results.map((result) => result.className))].map(
              (className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              )
            )}
          </select>
        </div>
        <div className="flex justify-center items-center">
          <label className="text-xl font-semibold me-1">Subject name: </label>
          <select
            className="border p-2 rounded focus:ring-2 focus:ring-[#fd645b]"
            onChange={(e) => setSelectedName(e.target.value)}
          >
            <option value="">Select Name</option>
            {[...new Set(results.map((result) => result.name))].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="w-full border-collapse border border-red-500">
        <thead className="bg-red-500 text-white">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Test Name</th>

            <th className="border p-2">Learner ID</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Correct Answer</th>
            <th className="border p-2">Wrong Answer</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((result, index) => (
            <tr key={result._id} className="text-center">
              <td className="border p-2">{indexOfFirstResult + index + 1}</td>
              <td className="border p-2">{result.name}</td>
              <td className="border p-2">{result.learnerId}</td>
              <td
                className={`border p-2 ${
                  result.score >= 50 ? 'text-green-600' : 'text-blue-600'
                }`}
              >
                {editingResult === result._id ? (
                  <input
                    type="number"
                    name="score"
                    value={formData.score}
                    onChange={handleChange}
                    className="border p-1 w-16"
                  />
                ) : (
                  result.score
                )}
              </td>
              <td className="border p-2">{result.correctAnswers}</td>
              <td className="border p-2">{result.wrongAnswers}</td>
              <td className="border p-2">
                {editingResult === result._id ? (
                  <>
                    <button
                      onClick={updateResult}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingResult(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(result)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteResult(result._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-bold">Page {currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              indexOfLastResult < filteredResults.length ? prev + 1 : prev
            )
          }
          disabled={indexOfLastResult >= filteredResults.length}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default TestResultsTable
