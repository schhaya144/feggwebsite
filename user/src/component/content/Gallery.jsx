import React, { useState } from 'react'
import gallery from '../../data/gallery'

const Gallery = () => {
  const [file, setFile] = useState(null)
  return (
    <div className="galleryContainer  sm:px-4">
      <h1 className="text-2xl sm:text-5xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#fd645b] pt-4 py-1 w-full">
        हमारा चित्र संग्रह
      </h1>
      <div className="media-container mt-4">
        {gallery.map((file) => (
          <div className="media" key={file.id} onClick={() => setFile(file)}>
            <img
              src={file.url}
              alt={`Gallery Image ${file.id}`}
              className="media-image"
            />
          </div>
        ))}
      </div>

      <div className="popup-media" style={{ display: file ? 'block' : 'none' }}>
        <span onClick={() => setFile(null)}>&times;</span>
        {file && <img src={file.url} alt={`Gallery Image ${file.id}`} />}
      </div>
    </div>
  )
}

export default Gallery
