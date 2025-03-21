import React from 'react'
import { Link } from 'react-router-dom'
import op10 from '../../../public/class10.jpg'
import op12 from '../../../public/class12.jpg'

const EcontentOption = () => {
  return (
    <div className="px-4 sm:px-12">
      <h3 className="sm:text-4xl text-2xl text-center font-semibold border-x-4 pb-1 pt-2 my-3 text-white border-[#fd645b] bg-[#fd645b]">
        ऑनलाइन पुस्तकें{' '}
      </h3>
      <div className="flex flex-col sm:flex-row justify-around items-center gap-4 p-4">
        {/* Card for Class 10 */}
        <div className="w-96 h-80 overflow-hidden rounded-lg relative group">
          <Link
            to="/class10"
            className="block w-full h-full border rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 bg-no-repeat bg-cover bg-center transform hover:scale-105 transition-all relative"
            style={{ backgroundImage: `url(${op10})` }}
          >
            {/* Layer Effect */}
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 bg-white border-2 rounded-lg border-[#fd645b] p-2 mx-4 my-8">
              <h3 className="text-xl font-bold text-center mb-4">
                कक्षा <span className="text-[#fd645b]">10वीं </span>
              </h3>
              <p className="text-center">कक्षा 10वीं के लिए पुस्तकें</p>
            </div>
          </Link>
        </div>

        {/* Card for Class 12 */}
        <div className="w-96 h-80 overflow-hidden rounded-lg relative group">
          <Link
            to="/class12"
            className="block w-full h-full border rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 bg-no-repeat bg-cover bg-center transform hover:scale-105 relative"
            style={{ backgroundImage: `url(${op12})` }}
          >
            {/* Layer Effect */}
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 bg-white border-2 rounded-lg border-[#fd645b] p-2 mx-4 my-8">
              <h3 className="text-xl font-bold text-center mb-4">
                कक्षा <span className="text-[#fd645b]">12वीं </span>
              </h3>
              <p className="text-center">कक्षा 12वीं के लिए पुस्तकें</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EcontentOption
