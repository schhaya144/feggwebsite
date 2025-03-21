import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SummaryApi from '../common/SummaryAPI'

const EContentModel = () => {
  const [downloads, setDownloads] = useState([])
  const [filteredDownloads, setFilteredDownloads] = useState([]) // To store filtered data
  const [classFilter, setClassFilter] = useState('') // To manage class name filter input

  useEffect(() => {
    // Fetch data using Axios
    const fetchDownloads = async () => {
      try {
        const response = await axios.get(SummaryApi.getAllDownloads.url)
        setDownloads(response.data)
        setFilteredDownloads(response.data) // Initialize filtered data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDownloads()
  }, [])

  const handleFilterChange = (e) => {
    const filterValue = e.target.value
    setClassFilter(filterValue)

    // Filter downloads based on the class name
    if (filterValue === '') {
      setFilteredDownloads(downloads) // Show all if filter is empty
    } else {
      setFilteredDownloads(
        downloads.filter((download) =>
          download.className.toString().includes(filterValue)
        )
      )
    }
  }

  return (
    <div className="p-4 bg-white">
      <h1 className="text-3xl font-bold mb-4">User Downloads</h1>

      {/* Dropdown Filter */}
      <div className="mb-4">
        <label htmlFor="classFilter" className="mr-2 font-semibold">
          Filter by Class:
        </label>
        <select
          id="classFilter"
          value={classFilter}
          onChange={handleFilterChange}
          className="border-2 p-2 border-[#fe0000] rounded-xl"
        >
          <option value="">All Classes</option>
          <option value="10">Class 10</option>
          <option value="12">Class 12</option>
        </select>
      </div>

      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-[#fe0000] text-white">
            <th className="p-1">S.No</th>
            <th className="p-1">User Input</th>
            <th className="p-1">Subject</th>
            <th className="p-1">Class Name</th>
            <th className="p-1">Downloaded At</th>
          </tr>
        </thead>
        <tbody>
          {filteredDownloads.map((download, index) => (
            <tr key={download._id} className="text-center">
              <td className="border p-1">{index + 1}</td>{' '}
              {/* Display Serial Number */}
              <td className="border p-1">{download.userInput}</td>
              <td className="border p-2">{download.subject}</td>
              <td className="border p-2">{download.className}</td>
              <td className="border p-2">
                {new Date(download.downloadedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EContentModel
