import React from 'react'
import WA from '../../assets/WA.png'

const WhatsApp = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <a
        href="https://wa.me/YOUR_PHONE_NUMBER"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={WA}
          alt="WhatsApp"
          className="h-16 w-16 object-fill rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
        />
      </a>
    </div>
  )
}

export default WhatsApp
