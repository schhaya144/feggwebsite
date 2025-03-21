import React from 'react'

const StudentPopup = ({ studentData, closePopup, showDetails }) => {
  return (
    <div className="flex justify-center items-center flex-col z-50 h-auto border-2 border-[#fd645b] p-3 my-8 bg-white shadow-lg">
      <h2 className="text-lg mb-1">Your Learner ID</h2>
      <h3 className="text-3xl text-[#fd645b] font-semibold my-4">
        {studentData?.learnerId}
      </h3>

      {/* Button to Show Details in FindLernerID */}
      <button
        onClick={showDetails}
        className="bg-[#fd645b] text-white py-1 px-4 rounded-full text-sm w-full sm:w-auto focus:ring-2 focus:ring-[#fd645b] hover:bg-white hover:text-[#fd645b] border-[#fd645b] border transition-all"
      >
        Click here to see your registration details
      </button>

      {/* Close Popup */}
      <button
        onClick={closePopup}
        className="active:bg-[#fd645b] active:text-white transition-all py-1 px-4 rounded-full text-sm mt-3  focus:ring-2 focus:ring-[#fd645b] bg-white text-[#fd645b] border-[#fd645b] border "
      >
        Close
      </button>
    </div>
  )
}

export default StudentPopup
