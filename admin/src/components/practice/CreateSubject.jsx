import { useState } from 'react'
import axios from 'axios'
import SummaryApi from '../../common/SummaryAPI'
import SubjectsTable from './SubjectTable'

const CreateSubjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    class: '10',
  })

  const [message, setMessage] = useState('')

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        SummaryApi.createSUbject.url,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      setMessage(response.data.message)
      setFormData({ name: '', class: '10' }) // Reset Form
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong!')
    }
  }

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg border border-[#fd645b] rounded-xl border-r-4 border-b-4 p-5 ">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create Subject
        </h2>

        {message && <p className="text-green-600 text-center">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 ">
          {/* Subject Name Input */}
          <div>
            <label className="block text-gray-700">Subject Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
              placeholder="Enter subject name"
              required
            />
          </div>

          {/* Class Selection */}
          <div>
            <label className="block text-gray-700">Select Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
            >
              <option value="10">Class 10</option>
              <option value="12">Class 12</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Create Subject
          </button>
        </form>
      </div>{' '}
      <SubjectsTable />
    </>
  )
}

export default CreateSubjectForm
