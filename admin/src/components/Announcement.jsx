import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SummaryApi from '../common/SummaryAPI'
const baseUrl = import.meta.env.VITE_BACKEND_URL

const AnnouncementUpload = () => {
  const [announcement, setAnnouncement] = useState({
    date: '',
    title: '',
    description: '',
  })
  const [image, setImage] = useState(null)
  const [pdf, setPdf] = useState(null)
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(SummaryApi.getAnnouncements.url)
      setAnnouncements(response.data)
    } catch (error) {
      console.error('Error fetching announcements:', error)
    }
  }
  const handleChange = (e) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value })
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (e.target.name === 'image') setImage(file)
    if (e.target.name === 'pdf') setPdf(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('date', announcement.date)
      formData.append('title', announcement.title)
      formData.append('description', announcement.description)
      if (image) formData.append('image', image)
      if (pdf) formData.append('pdf', pdf)

      await axios.post(SummaryApi.getAnnouncements.url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setMessage('Announcement uploaded successfully!')
      setAnnouncement({ date: '', title: '', description: '' })
      setImage(null)
      setPdf(null)
      fetchAnnouncements()
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to upload announcement')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (announcement) => {
    setAnnouncement(announcement)
    setEditingId(announcement._id)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await axios.delete(
          SummaryApi.DeleteAnnouncements.url.replace(':id', id)
        )
        setMessage('Announcement deleted successfully!')
        fetchAnnouncements()
      } catch (error) {
        setMessage(
          error.response?.data?.error || 'Failed to delete announcement'
        )
      }
    }
  }

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = announcements.slice(indexOfFirstItem, indexOfLastItem)

  const nextPage = () => {
    if (currentPage < Math.ceil(announcements.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className=" mx-auto p-6 bg-white shadow-lg rounded-md  gap-8">
      <div className="">
        <h2 className="text-4xl font-bold mb-4">
          {editingId ? 'Edit Announcement' : 'Upload Announcement'}
        </h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}

        <form
          onSubmit={handleSubmit}
          className="space-y-4  p-2 border border-[#fe0000] rounded-xl border-r-4 border-b-4"
        >
          <div>
            <label className="block font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={announcement.date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={announcement.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={announcement.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div>
            <label className="block font-medium">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Upload PDF</label>
            <input
              type="file"
              name="pdf"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-3xl w-full hover:bg-red-600"
            disabled={loading}
          >
            {loading
              ? 'Processing...'
              : editingId
              ? 'Update Announcement'
              : 'Upload Announcement'}
          </button>
        </form>
      </div>

      <div className="">
        <h2 className="text-xl font-bold mb-4">All Announcements</h2>
        <table className="w-full border-collapse ">
          <thead>
            <tr className="bg-[#fe0000] text-white">
              <th className=" p-2">S.No.</th>
              <th className=" p-2">Date</th>
              <th className=" p-2">Title</th>
              <th className=" p-2">Description</th>
              <th className=" p-2">Image</th>
              <th className=" p-2">PDF</th>
              <th className=" p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((ann, i) => (
                <tr key={ann._id} className="text-center">
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">{ann.date}</td>
                  <td className="border p-2">{ann.title}</td>
                  <td className="border p-2">{ann.description}</td>
                  <td className="border p-2">
                    {ann.image && (
                      <img
                        src={`${baseUrl}/uploads/${ann.image}`}
                        alt="announcement"
                        width="50"
                      />
                    )}
                  </td>
                  <td className="border p-2">
                    {ann.pdf && (
                      <a
                        href={`${baseUrl}/uploads/${ann.pdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View PDF
                      </a>
                    )}
                  </td>
                  <td className="border p-2">
                    <button
                      className="bg-yellow-500 text-white px-5 py-1 rounded mr-1  mb-2 hover:bg-yellow-600"
                      onClick={() => handleEdit(ann)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(ann._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border p-4 text-center text-gray-500"
                >
                  No announcements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={
              currentPage >= Math.ceil(announcements.length / itemsPerPage)
            }
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementUpload
