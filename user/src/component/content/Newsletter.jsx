import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SummaryApi from '../../common/SummaryApi'
const baseUrl = import.meta.env.VITE_BACKEND_URL

const Newsletter = () => {
  const [gallery, setGallery] = useState([]) // State to store images
  const [file, setFile] = useState(null)

  useEffect(() => {
    // Fetch images from backend using Axios
    const fetchImages = async () => {
      try {
        const response = await axios.get(SummaryApi.getNewsLetterImages.url) // Adjust URL as needed
        setGallery(response.data)
        console.log(response.data) // Check the fetched data
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className="galleryContainer sm:px-4">
      <h1 className="text-2xl sm:text-5xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#fd645b] pt-4 py-1 w-full">
        समाचार पत्रिका
      </h1>

      <div className="media-container mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <div
            className="media bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
            key={item._id}
            onClick={() => setFile(item)}
          >
            <img
              src={`${baseUrl}/${item.image.replace(/\\/g, '/')}`}
              alt={`Gallery Image ${item._id}`}
              className="w-full h-40 object-cover rounded-md"
            />
             {item.discription ? (
              <p className="text-gray-700 text-center mt-2">{item.discription}</p>
            ) : (
              <p className="text-gray-500 text-center mt-2">No description available</p>
            )}
          </div>
        ))}
      </div>

      {file && (
        <div className="popup-media fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative bg-white p-5 rounded-lg shadow-lg">
            <span
              className="absolute top-2 right-2 text-2xl cursor-pointer"
              onClick={() => setFile(null)}
            >
              &times;
            </span>
            <img
              src={`${baseUrl}/${file.image.replace(/\\/g, '/')}`}
              className="w-full max-w-md object-cover rounded-md"
            />
            {file.description && (
              <p className="text-gray-700 text-center mt-2">{file.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Newsletter
