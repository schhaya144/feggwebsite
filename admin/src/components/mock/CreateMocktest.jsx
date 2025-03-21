import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import MockTestList from './MocktestCards'
import SummaryApi from "../../common/SummaryAPI";

const CreateMockTest = () => {
  const [mockTest, setMockTest] = useState({
    MockLogo: '',
    title: '',
    description: '',
    duration: 0,
    totalMarks: 0,
    numberOfQuestions: 0,
    mocktype: 'mock', // Default value
  })

  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const [language, setLanguage] = useState('')
  const [classMock, setClassMock] = useState('')
  const [chapter, setChapter] = useState('')

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(SummaryApi.subjects.url)
        setSubjects(response.data.data)
      } catch (error) {
        console.error('Error fetching subjects:', error)
      }
    }

    fetchSubjects()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setMockTest({ ...mockTest, [name]: value })
  }

  const handleDescriptionChange = (value) => {
    setMockTest({ ...mockTest, description: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const formData = new FormData()
    formData.append('MockLogo', e.target.MockLogo.files[0])
    formData.append('title', mockTest.title)
    formData.append('mocktype', mockTest.mocktype || 'mock')
    formData.append('description', mockTest.description)
    formData.append('duration', Number(mockTest.duration))
    formData.append('totalMarks', Number(mockTest.totalMarks))
    formData.append('numberOfQuestions', Number(mockTest.numberOfQuestions))
    formData.append('subjectId', selectedSubject)
    formData.append('language', language)
    formData.append('classMock', classMock) // Sending classMock
    formData.append('chapter', chapter) // Sending chapter
  
    console.log('Submitting Payload:', formData)
  
    try {
      const response = await axios.post(SummaryApi.Mocktest.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Mock test created:', response.data)
      alert('Mock test created successfully!')
  
      setMockTest({
        MockLogo: '',
        title: '',
        mocktype: 'mock',
        description: '',
        duration: 0,
        totalMarks: 0,
        numberOfQuestions: 0,
      })
      setSelectedSubject('')
    } catch (error) {
      console.error('Error creating mock test:', error)
      alert('Failed to create mock test.')
    }
  }
  

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Mock Test</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Mock Logo:</label>
            <input
              type="file"
              name="MockLogo"
              value={mockTest.MockLogo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Mock Type:</label>
            <select
              name="mocktype"
              value={mockTest.mocktype}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="mock">Mock</option>
              <option value="miniMock">Mini Mock</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={mockTest.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              Description:
            </label>
            <ReactQuill
              value={mockTest.description}
              onChange={handleDescriptionChange}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  ['clean'],
                ],
              }}
              className="w-full border rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Subject:</label>
            <select
              name="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="" disabled>
                Select Subject
              </option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="" disabled>
                Select Language
              </option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
          <div>
  <label className="block text-lg font-medium mb-2">Class:</label>
  <select
    value={classMock}
    onChange={(e) => setClassMock(e.target.value)}
    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
    required
  >
    <option value="" disabled>Select Class</option>
    <option value="10th">10th</option>
    <option value="12th">12th</option>
  </select>
</div>
<div>
  <label className="block text-lg font-medium mb-2">Chapter:</label>
  <select
    value={chapter}
    onChange={(e) => setChapter(e.target.value)}
    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
    required
  >
    <option value="" disabled>Select Chapter</option>
    {[...Array(15).keys()].map((num) => (
      <option key={num + 1} value={num + 1}>{num + 1}</option>
    ))}
  </select>
</div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium mb-2">
                Duration (in minutes):
              </label>
              <input
                type="number"
                name="duration"
                value={mockTest.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">
                Total Marks:
              </label>
              <input
                type="number"
                name="totalMarks"
                value={mockTest.totalMarks}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">
                Number of Questions:
              </label>
              <input
                type="number"
                name="numberOfQuestions"
                value={mockTest.numberOfQuestions}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md"
          >
            Submit Mock Test
          </button>
        </form>
      </div>
      <MockTestList />
    </>
  )
}

export default CreateMockTest
