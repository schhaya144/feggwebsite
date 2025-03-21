import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa'
import '../App.css'
import SummaryApi from '../common/SummaryAPI'
const baseUrl = import.meta.env.VITE_BACKEND_URL

const PreviousPaper = () => {
  const [uploads, setUploads] = useState([])
  const [filteredUploads, setFilteredUploads] = useState([])
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})
  const [formData, setFormData] = useState({
    year: '',
    className: '10',
    subject: '',
    language: 'English',
    session: 'June',
    file: null,
    answerKey: null,
  })
  const [filters, setFilters] = useState({
    year: '',
    className: '',
    subject: '',
  })

  const subjects = {
    10: [
      '',
      'हिंदी (201)',
      'अंग्रेज़ी (202)',
      'मराठी (204)',
      'उर्दू (206)',
      'संस्कृत (209)',
      'गणित (211)',
      'विज्ञान (212)',
      'सामाजिक विज्ञान (213)',
      'अर्थशास्त्र (214)',
      'व्यवसाय अध्ययन (215)',
      'गृह विज्ञान (216)',
      'भारतीय संस्कृति (223)',
      'उद्यमिता (249)',
    ],
    12: [
      '',

      'हिंदी (301)',
      'अंग्रेज़ी (302)',
      'संस्कृत (309)',

      'गणित (311)',
      'गृह विज्ञान  (सिद्धांत एवं प्रयोगात्मक) (321)',
      'अर्थशास्त्र (318)',

      'भारतीय  (सिद्धांत एवं प्रयोगात्मक)(321)',
      'इतिहास (315)',
      'व्यवसाय अध्ययन (319)',
    ],
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios
      .get(SummaryApi.PreviousPaper.url)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setUploads(response.data)
        } else {
          setUploads([])
        }
      })
      .catch((error) => console.error('Error fetching eBooks:', error))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] })
  }

  // Handle Activate/Deactivate
  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`${SummaryApi.previouspaperstatus.url}/${id}`, {
        isActive: !currentStatus,
      })

      // Update status in state without re-fetching data
      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, isActive: !currentStatus } : upload
        )
      )
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.file) {
      const data = new FormData()
      Object.keys(formData).forEach((key) => data.append(key, formData[key]))

      try {
        const response = await axios.post(
          SummaryApi.PreviousPaperpost.url,
          data,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        setUploads([...uploads, response.data])
        setFormData({
          year: '',
          className: '10',
          subject: subjects['10'][0],
          language: 'English',
          session: 'June',
          file: null,
          answerKey: null,
        })
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }
  }

  const handleEditChange = (e, id) => {
    const { name, value } = e.target

    setUploads((prevUploads) =>
      prevUploads.map((upload) =>
        upload._id === id ? { ...upload, [name]: value } : upload
      )
    )

    if (editId === id) {
      setEditData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleEdit = (id) => {
    const selectedUpload = uploads.find((upload) => upload._id === id)
    setEditId(id)
    setEditData({ ...selectedUpload }) // Ensure a copy is stored
  }

  const handleSave = async (id) => {
    try {
      const updatedData = uploads.find((upload) => upload._id === id) // Get updated data
      await axios.put(
        `${SummaryApi.PreviousPaperupdate.url}/${id}`,
        updatedData
      )
      setEditId(null)
      fetchData()
    } catch (error) {
      console.error('Error updating file:', error)
    }
  }

  useEffect(() => {
    if (!Array.isArray(uploads)) return
    const filteredData = uploads.filter(
      (upload) =>
        (!filters.year || upload.year === filters.year) &&
        (!filters.className || upload.className === filters.className) &&
        (!filters.subject || upload.subject === filters.subject)
    )
    setFilteredUploads(filteredData)
  }, [filters, uploads])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await axios.delete(`${SummaryApi.PreviousPaperId.url}/${id}`)
        fetchData() // Refresh data after deletion
      } catch (error) {
        console.error('Error deleting file:', error)
      }
    }
  }

  return (
    <div className="p-4 bg-white">
      <h2 className="text-3xl font-bold mb-4">Previous Year Paper Upload</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border  border-[#fd645b] rounded-xl border-r-4 border-b-4 p-5">
          <div className="mb-4">
            <label className="font-semibold">Year:</label>
            <input
              name="year"
              type="text"
              value={formData.year}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded focus:ring-2 focus:ring-[#fd645b]"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="flex-1">
              <label className="font-semibold">Class:</label>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded focus:ring-2 focus:ring-[#fd645b]"
              >
                <option value="10">10</option>
                <option value="12">12</option>
              </select>
            </div>
            <div className="flex-1">
              <label>Subject:</label>
             <input type="text" name="subject"  value={formData.subject}  onChange={handleChange}
              required
              className="border p-2 w-full rounded focus:ring-2 focus:ring-[#fd645b]"/>
            </div>
            <div className="flex-1">
              <label className="font-semibold">Session:</label>
              <select
                name="session"
                value={formData.session}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded focus:ring-2 focus:ring-[#fd645b]"
              >
                <option value="June">June</option>
                <option value="December">December</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap mt-4">
            <div className="flex-1">
              <label className="font-semibold">Medium:</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded focus:ring-2 focus:ring-[#fd645b]"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="font-semibold">Upload Paper:</label>
              <input
                name="file"
                type="file"
                onChange={handleFileChange}
                required
                className="border p-2 w-full rounded focus:ring-2 focus:ring-[#fd645b]"
              />
            </div>
            <div className="flex-1">
              <label className="font-semibold">Upload Answer Key:</label>
              <input
                name="answerKey"
                type="file"
                onChange={handleFileChange}
                className="border p-2 w-full rounded focus:ring-2 focus:ring-[#fd645b]"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#fd645b] text-white p-2 rounded-lg font-semibold w-full sm:w-auto focus:ring-2 focus:ring-[#fd645b] hover:bg-white hover:text-[#fd645b] border-[#fd645b] border transition-all"
        >
          Upload
        </button>
      </form>

      {/* ============= filter Section================== */}
      <div className="my-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold text-lg mb-2">Filter Papers</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex-1">
            <label className="font-semibold">Class:</label>
            <select
              name="className"
              value={filters.className}
              onChange={(e) =>
                setFilters({ ...filters, className: e.target.value })
              }
              className="border p-2 w-full rounded"
            >
              <option value="">All</option>
              <option value="10">10</option>
              <option value="12">12</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="font-semibold">Subject:</label>
            <select
              name="subject"
              value={filters.subject}
              onChange={(e) =>
                setFilters({ ...filters, subject: e.target.value })
              }
              className="border p-2 w-full rounded"
            >
              <option value="">All</option>
              {subjects[filters.className || '10']?.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="font-semibold">Year:</label>
            <input
              type="text"
              name="year"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="border p-2 w-full rounded"
              placeholder="Enter Year"
            />
          </div>

          <div className="flex-1 self-end">
            <button
              onClick={() =>
                setFilters({ year: '', className: '', subject: '' })
              }
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold mt-5 mb-1">Uploaded Files:</h3>
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-[#fd645b] text-white">
            <th>S.No</th>
            <th>Subject</th>
            <th>Class</th>
            <th>Year</th>
            <th>Session</th>
            <th>Language</th>
            <th>Paper</th>
            <th>Answer Key</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploads.map((upload, index) => (
            <tr key={upload._id} className="text-center">
              <td>{index + 1}</td>
              <td>
                {editId === upload._id ? (
                  <input
                    type="text"
                    name="subject"
                    value={upload.subject}
                    onChange={(e) => handleEditChange(e, upload._id)}
                  />
                ) : (
                  upload.subject
                )}
              </td>{' '}
              <td>
                {editId === upload._id ? (
                  <input
                    type="text"
                    name="className"
                    value={upload.className}
                    onChange={(e) => handleEditChange(e, upload._id)}
                  />
                ) : (
                  upload.className
                )}
              </td>
              <td>
                {editId === upload._id ? (
                  <input
                    type="text"
                    name="year"
                    value={upload.year}
                    onChange={(e) => handleEditChange(e, upload._id)}
                  />
                ) : (
                  upload.year
                )}
              </td>
              <td>
                {editId === upload._id ? (
                  <input
                    type="text"
                    name="session"
                    value={upload.session}
                    onChange={(e) => handleEditChange(e, upload._id)}
                  />
                ) : (
                  upload.session
                )}
              </td>
              <td>
                {editId === upload._id ? (
                  <input
                    type="text"
                    name="language"
                    value={upload.language}
                    onChange={(e) => handleEditChange(e, upload._id)}
                  />
                ) : (
                  upload.language
                )}
              </td>
              <td>
                <a href={`${baseUrl}/${upload.file}`} target="_blank">
                  View
                </a>
              </td>
              <td>
                <a href={`${baseUrl}/${upload.answerKey}`} target="_blank">
                  View
                </a>
              </td>
              <td>
                <button
                  onClick={() => toggleStatus(upload._id, upload.isActive)}
                  className={`p-2 rounded-lg ${
                    upload.isActive
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {upload.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
              <td>
                {editId === upload._id ? (
                  <button
                    onClick={() => handleSave(upload._id)}
                    className="bg-green-500 text-white p-2 rounded-lg mx-1"
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(upload._id)}
                    className="bg-blue-500 text-white p-2 rounded-lg mx-1"
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(upload._id)}
                  className="bg-red-500 text-white p-2 rounded-lg mx-1"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PreviousPaper
