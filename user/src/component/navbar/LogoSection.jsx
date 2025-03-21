import React from 'react'
import logo from '../../assets/logo.png'
import logo1 from '../../assets/MPSOSLogo.png'

const LogoSection = () => (
  <div className="flex justify-between items-center w-full border-b border-red-400">
    {/* Left Side - First Logo and Text */}
    <div className="flex items-center space-x-4">
      <div className="sm:w-24 w-28  rounded-full">
        <img src={logo} alt="Logo" />
      </div>
      <div>
        <h1 className="sm:text-lg text-sm font-bold text-gray-800">
        फाउंडेशन टू एजुकेट गर्ल्स ग्लोबली
        </h1>
        {/* <p className="text-sm text-gray-500">(एबीसी स्टेट ओपन स्कूल)</p> */}
      </div>
    </div>

    {/* Right Side - Second Logo and Text (Vertically Aligned) */}
    <div className="flex justify-center items-center ">
      <div className="text-end">
        <h1 className="sm:text-lg text-xs font-bold text-gray-800 my-1 ">
          मध्य प्रदेश राज्य मुक्त स्कूल शिक्षा बोर्ड
        </h1>
        <p className="sm:text-md text-xs font-bold text-gray-800">
        म.प्र., स्कूल शिक्षा विभाग
        </p>
      </div>
      <div className="w-24  rounded-full mb-1">
        <img src={logo1} alt="Second Logo" className="object-contain" />
      </div>
    </div>
  </div>
)

export default LogoSection
