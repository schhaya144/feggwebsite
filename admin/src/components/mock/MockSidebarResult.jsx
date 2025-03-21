import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SummaryApi from "../../common/SummaryAPI";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const MockSidebarResult = () => {
  const [results, setResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchPhone, setSearchPhone] = useState('')
  const [mockFilter, setMockFilter] = useState('all')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const resultsPerPage = 10

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(SummaryApi.getALLResult.url, {
          params: {
            mocktype: mockFilter === 'all' ? undefined : mockFilter,
            startDate: startDate ? startDate.toISOString() : undefined,
            endDate: endDate ? endDate.toISOString() : undefined,
          },
        })
        console.log('API Response:', response.data)

        console.log('Fetched Results:', response.data)
        setResults(response.data)
        setFilteredResults(response.data)
      } catch (err) {
        console.error('Error fetching results:', err)
        setError('Error fetching results')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [mockFilter, startDate, endDate])

  useEffect(() => {
    if (!results || !Array.isArray(results)) {
      setFilteredResults([])
      return
    }

    let filtered = [...results]
    console.log('Initial Results:', filtered)

    if (searchPhone) {
      filtered = filtered.filter((result) =>
        result.userPhone?.includes(searchPhone)
      )
      console.log('After Phone Filter:', filtered)
    }

    if (mockFilter && mockFilter !== 'all') {
      filtered = filtered.filter((result) => result.mocktype === mockFilter)
    }

    if (startDate && endDate) {
      filtered = filtered.filter((result) => {
        const resultDate = new Date(result.createdAt)
        return resultDate >= startDate && resultDate <= endDate
      })
      console.log('After Date Filter:', filtered)
    }

    setFilteredResults(filtered)
  }, [searchPhone, mockFilter, startDate, endDate, results])

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage) || 1
  const displayedResults = filteredResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  )

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Results</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Phone Number"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          className="px-4 py-2 border rounded"
        />

        <select
          value={mockFilter}
          onChange={(e) => setMockFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">all</option>

          <option value="mock">Mock</option>
          <option value="miniMock">Mini Mock</option>
        </select>

        <div className="flex items-center gap-2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            className="px-4 py-2 border rounded"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            className="px-4 py-2 border rounded"
          />
        </div>
      </div>

      <table className="min-w-full table-auto border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">S. No</th>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Mock Type</th>
            <th className="px-4 py-2 border">Score</th>
            <th className="px-4 py-2 border">Correct Answers</th>
            <th className="px-4 py-2 border">Wrong Answers</th>
            <th className="px-4 py-2 border">Total Questions</th>
            <th className="px-4 py-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {displayedResults.map((result, i) => (
            <tr key={result._id}>
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{result.userName || 'N/A'}</td>
              <td className="border px-4 py-2">{result.userPhone || 'N/A'}</td>
              <td className="border px-4 py-2">{result.mocktype || 'N/A'}</td>
              <td className="border px-4 py-2">{result.score || 0}</td>
              <td className="border px-4 py-2">{result.correctAnswers || 0}</td>
              <td className="border px-4 py-2">{result.wrongAnswers || 0}</td>
              <td className="border px-4 py-2">{result.totalQuestions || 0}</td>
              <td className="border px-4 py-2">
                {new Date(result.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default MockSidebarResult
