import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SummaryApi from '../common/SummaryAPI'
const baseUrl = import.meta.env.VITE_BACKEND_URL

const NewsLetterUpload = () => {
  const [gallery, setGallery] = useState([])
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [discription, setDiscription] = useState('') 
  useEffect(() => {
    fetchGallery()
  }, [])

  // Fetch images from backend
  const fetchGallery = async () => {
    try {
      const { data } = await axios.get(SummaryApi.getNewsLetterImages.url)
      setGallery(data)
    } catch (error) {
      console.error('Error fetching gallery', error)
    }
  }

  // Handle File Upload
  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return alert('Please select an image')
    if (!discription.trim()) return alert('Please enter a description')

    const formData = new FormData()
    formData.append('image', file)
    formData.append('discription', discription) // Append description

    try {
      await axios.post(SummaryApi.NewsLuploads.url, formData)
      setFile(null)
      setPreview(null)
      setDiscription('') // Reset description
      fetchGallery() // Refresh gallery after upload
    } catch (error) {
      console.error('Error uploading image', error)
    }
  }

  // Handle Image Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${SummaryApi.NLuploadsdelete.url}/${id}`)
      fetchGallery() // Refresh gallery after deletion
    } catch (error) {
      console.error('Error deleting image', error)
    }
  }

  return (
    <div className="container mx-auto  bg-white p-4">
      <h1 className="text-2xl sm:text-4xl font-semibold py-3">
        News Letter Upload
      </h1>

      {/* File Upload Form */}
      <form
        onSubmit={handleUpload}
        className="bg-white shadow-md flex flex-col items-center gap-3 border border-[#fd645b] rounded-xl border-r-4 border-b-4 p-5"
      >
        <input
          type="file"
          className="border p-2 rounded-md"
          onChange={(e) => {
            setFile(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
          }}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-md"
          />
        )}
        <input
          type="text"
          placeholder="Enter description"
          className="border p-2 rounded-md w-full"
          value={discription}
          onChange={(e) => setDiscription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Upload
        </button>
      </form>

      {/* Table for Uploaded Images */}
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead>
            <tr className="bg-red-500 text-white">
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gallery.map((file) => (
              <tr key={file._id} className="border-b">
                <td className="py-2 px-4 flex justify-center">
                  <img
                    src={`${baseUrl}/${file.image.replace(/\\/g, '/')}`}
                    alt="Gallery"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </td>
                <td className="py-2 px-4 text-center">{file.discription}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NewsLetterUpload
