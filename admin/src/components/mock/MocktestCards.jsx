import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

import { useNavigate } from 'react-router-dom'
import SummaryApi from "../../common/SummaryAPI";
const baseUrl = import.meta.env.VITE_BACKEND_URL
const MockTestList = () => {
  const [mockTests, setMockTests] = useState([])
  const [mockminiTests, setMiniMockTests] = useState([])

  const navigate = useNavigate()

  // Fetch mock tests from API
  useEffect(() => {
    const fetchMockTests = async (req) => {
      try {
        const response = await axios.get(SummaryApi.GetMocktest.url)
        const responsemini = await axios.get(SummaryApi.GetminiMocktest.url)

        setMockTests(response.data.data)
        setMiniMockTests(responsemini.data.data)
      } catch (error) {
        console.error('Error fetching mock tests:', error)
      }
    }

    fetchMockTests()
  }, [])

  // Start a test
  const handleStartTest = (mockTestId) => {
    navigate(`/dashboard/start/${mockTestId}`)
  }
  console.log(mockTests)

  // Delete a mock test
  const handleDeleteTest = async (mockTestId) => {
    try {
      const response = await axios.delete(
        SummaryApi.DeleteMock.url.replace(':mockTestId', mockTestId)
      )
      if (response.status === 200) {
        // Remove the deleted test from the state
        setMockTests(mockTests.filter((test) => test._id !== mockTestId))
        setMiniMockTests(
          mockminiTests.filter((test) => test._id !== mockTestId)
        )

        alert('Mock test deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting mock test:', error)
      alert('Failed to delete mock test.')
    }
  }

  return (
    <div className="flex">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Mini Mock Tests
        </h1>
        <div className="grid grid-row-1 md:grid-row-2 lg:grid-row-3 gap-6">
          {mockTests.map((mockTest) => (
            <div
              key={mockTest._id}
              className="p-4 border border-gray-200 rounded shadow-sm bg-white relative"
            >
              {/* Delete Button - Positioned on top of the card */}
              <button
                onClick={() => handleDeleteTest(mockTest._id)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
                <FaTrashAlt />
              </button>

              <div className="flex justify-around items-center">
                <img
                  src={`${baseUrl}/files/${mockTest.MockLogo}`}
                  alt={mockTest.title}
                  className="w-12 h-12 rounded-full object-fill"
                />
                <h2 className="text-lg font-bold text-gray-800">
                  {mockTest.title}
                </h2>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <strong>Subject:</strong>{' '}
                  {mockTest.subject?.subjectName || 'N/A'}
                </p>
                <p>
                  <strong>Duration:</strong> {mockTest.duration || 'N/A'}{' '}
                  minutes
                </p>
                <p>
                  <strong>Total Marks:</strong> {mockTest.totalMarks || 'N/A'}
                </p>
                <p>
                  <strong>Language:</strong> {mockTest.language || 'N/A'}
                </p>
                <button
                  // onClick={() => handleStartTest(mockTest._id)}
                  className="bg-red-500 text-white rounded-xl font-bold w-full py-2 my-2"
                >
                  Start Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container  mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mock Tests</h1>
        <div className="grid grid-row-1 md:grid-row-2 lg:grid-row-3 gap-6">
          {mockminiTests.map((mockTest) => (
            <div
              key={mockTest._id}
              className="p-4 border border-gray-200 rounded shadow-sm bg-white relative"
            >
              {/* Delete Button - Positioned on top of the card */}
              <button
                onClick={() => handleDeleteTest(mockTest._id)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
                <FaTrashAlt />
              </button>

              <div className="flex justify-around items-center">
                <img
                  src={`${baseUrl}/files/${mockTest.MockLogo}`}
                  alt={mockTest.title}
                  className="w-12 h-12 rounded-full object-fill"
                />
                <h2 className="text-lg font-bold text-gray-800">
                  {
                    (mockTest.title, console.log(mockTest.MockLogo)) // Should log the filename like 'logo.png'
                  }
                </h2>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <strong>Subject:</strong>{' '}
                  {mockTest.subject?.subjectName || 'N/A'}
                </p>
                <p>
                  <strong>Duration:</strong> {mockTest.duration || 'N/A'}{' '}
                  minutes
                </p>
                <p>
                  <strong>Total Marks:</strong> {mockTest.totalMarks || 'N/A'}
                </p>
                <p>
                  <strong>Language:</strong> {mockTest.language || 'N/A'}
                </p>
                <button
                  // onClick={() => handleStartTest(mockTest._id)}
                  className="bg-red-500 text-white rounded-xl font-bold w-full py-2 my-2"
                >
                  Start Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MockTestList
