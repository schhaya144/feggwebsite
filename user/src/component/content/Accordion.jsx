import React, { useState } from 'react'

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-300">
      <button
        className="w-full text-left p-3 font-bold bg-gray-100 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && <div className="p-3">{children}</div>}
    </div>
  )
}

export default Accordion
