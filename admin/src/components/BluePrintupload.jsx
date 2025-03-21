import { useState, useEffect } from 'react'
import axios from 'axios'
import SummaryApi from '../common/SummaryAPI'
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa' // Import icons

const BluePrintupload = () => {
  const [blueprints, setBlueprints] = useState([])
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [updatedTitle, setUpdatedTitle] = useState('')

  // Fetch uploaded PDFs
  useEffect(() => {
    fetchBlueprints()
  }, [])

  const fetchBlueprints = async () => {
    try {
      const response = await axios.get(SummaryApi.Blueprintget.url)
      setBlueprints(response.data)
    } catch (error) {
      console.error('Error fetching blueprints:', error)
    }
  }

  // Handle File Upload
  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file || !title) return alert('Please provide title and file')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('file', file)

    try {
      await axios.post(SummaryApi.Blueprint.url, formData)
      fetchBlueprints() // Refresh list
      setTitle('')
      setFile(null)
    } catch (error) {
      console.error('Error uploading blueprint:', error)
    }
  }

  // Handle Delete PDF
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this PDF?')) return
    try {
      await axios.delete(`${SummaryApi.Blueprintdelete.url}/${id}`)
      fetchBlueprints()
    } catch (error) {
      console.error('Error deleting blueprint:', error)
    }
  }

  // Handle Update (Edit title)
  const handleUpdate = async (id) => {
    if (!updatedTitle) return alert('Please enter a title')

    try {
      await axios.put(`${SummaryApi.BlueprintUpdate.url}/${id}`, {
        title: updatedTitle,
      })
      setEditingId(null)
      fetchBlueprints()
    } catch (error) {
      console.error('Error updating blueprint:', error)
    }
  }

  return (
    <div className="bg-white mx-auto p-4">
      <h2 className="text-4xl font-bold  mb-4">
        Upload Blueprints (PDF)
      </h2>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="flex flex-col gap-3 mb-6 border border-[#fd645b] rounded-xl border-r-4 border-b-4 p-5">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 ring-[#fd645b] ring-1 rounded-md focus:ring-[#fd645b] focus:ring-2"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 ring-[#fd645b] ring-1 rounded-md focus:ring-[#fd645b] focus:ring-2"
        />
        <button
          type="submit"
          className="bg-[#fd645b] text-white p-2 rounded active:scale-95 scale-100 transition-all"
        >
          Upload
        </button>
      </form>

      {/* Uploaded Blueprints Table */}
      <h3 className="text-xl font-semibold mb-4">Uploaded PDFs:</h3>
      {blueprints.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#fd645b] text-white text-left">
              <th className="border p-2 w-1/3">Title</th>
              <th className="border p-2 text-center w-1/3">PDF</th>
              <th className="border p-2 text-center w-1/3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blueprints.map((bp) => (
              <tr key={bp._id} className="border">
                {/* Title Column */}
                <td className="border p-2">
                  {editingId === bp._id ? (
                    <input
                      type="text"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                      className="border p-1 w-full"
                    />
                  ) : (
                    <span>{bp.title}</span>
                  )}
                </td>

                {/* PDF Column */}
                <td className="border p-2 text-center">
                  <a
                    href={bp.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View PDF
                  </a>
                </td>

                {/* Actions Column */}
                <td className="border p-2 flex justify-center gap-4">
                  {editingId === bp._id ? (
                    <button
                      onClick={() => handleUpdate(bp._id)}
                      className="text-green-500 text-xl"
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(bp._id)
                        setUpdatedTitle(bp.title)
                      }}
                      className="text-yellow-500 text-xl"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(bp._id)}
                    className="text-red-500 text-xl"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No PDFs uploaded yet.</p>
      )}
    </div>
  )
}

export default BluePrintupload
