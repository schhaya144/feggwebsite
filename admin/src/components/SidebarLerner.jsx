import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import {
  TbAdjustmentsQuestion,
  TbLayoutDashboardFilled,
  TbPencilQuestion,
} from 'react-icons/tb'
import fagglogo from '../../public/eg-logo.png'
import { FaFileCircleQuestion } from 'react-icons/fa6'
import { LuFileQuestion } from 'react-icons/lu'
import {
  FaChalkboardTeacher,
  FaClipboardList,
  FaSignOutAlt,
  FaCalendarAlt,
  FaFileCode,
  FaFile,
  FaVideo,
  FaShareAlt,
  FaPhotoVideo,
  FaRegFileArchive,
} from 'react-icons/fa'
import { FaBars } from 'react-icons/fa6'
import {
  FiChevronDown,
  FiChevronUp,
  FiEdit,
  FiUploadCloud,
  FiAirplay,
  FiVideo,
  FiSave,
  FiVolume1,
  FiFile,
} from 'react-icons/fi'
import { FaList, FaQuestionCircle } from 'react-icons/fa'

const Sidebarlerner = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMockDropdownOpen, setIsMockDropdownOpen] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
    if (!isCollapsed) {
      setIsMockDropdownOpen(false) // Close dropdown when collapsing
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? 'w-16' : 'w-60'
        } bg-white text-black fixed border-[#fe0000] border-r-2 h-full shadow-lg transition-all duration-300 overflow-y-auto overflow-x-hidden`}
      >
        {/* Sidebar content here */}

        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-full p-5 shadow-md">
                <img src={fagglogo} className="w-20 object-fill mx-auto py-2" />
              </div>
              <h1 className="text-xl font-semibold mt-2 bg-gradient-to-r from-[#fe0000] z-20 w-[200px] right-4 text-white relative">
                Admin Panel Lerner
              </h1>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="text-[#fe0000] focus:outline-none hover:text-teal-400 transition duration-200"
          >
            <FaBars size={20} />
          </button>
        </div>

        <nav className="mt-8">
          <Link
            to="dashboardCards"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <TbLayoutDashboardFilled className="mr-2" size={20} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          {/* <Link
            to="students"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FaChalkboardTeacher className="mr-2" size={20} />
            {!isCollapsed && <span>Students</span>}
          </Link> */}
          <Link
            to="EBooks"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FiUploadCloud className="mr-2" size={20} />
            {!isCollapsed && <span>E-Book Upload</span>}
          </Link>
          <Link
            to="OlineVideoUpload"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FaVideo className="mr-2 font-bold" size={20} />
            {!isCollapsed && <span>Online Video Upload</span>}
          </Link>
          <Link
            to="PreviousPaper"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FaClipboardList className="mr-2" size={20} />
            {!isCollapsed && <span>Previous Years Paper</span>}
          </Link>
          <Link
            to="BluePrintupload"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FaFileCode className="mr-2" size={20} />
            {!isCollapsed && <span>Upload Blue Print</span>}
          </Link>
          {/* <Link
            to="NewsLetterUpload"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FaFile className="mr-2" size={20} />
            {!isCollapsed && <span>News Letter Upload</span>}
          </Link> */}

          {/* <Link
            to="SessionAdd"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FaCalendarAlt className="mr-2" size={20} />
            {!isCollapsed && <span>Update Session</span>}
          </Link> */}
          {/* <Link
            to="hero-img"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FaPhotoVideo className="mr-2" size={20} />
            {!isCollapsed && <span>Slider Image</span>}
          </Link> */}
          {/* <Link
            to="testimonial"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FiAirplay className="mr-2" size={20} />
            {!isCollapsed && <span>Add Testimonials</span>}
          </Link> */}
          {/* <Link
            to="resultAdmitcardUrl"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FaShareAlt className="mr-2" size={20} />
            {!isCollapsed && <span>Add URL</span>}
          </Link> */}
          {/* <Link
            to="announcement"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FiVolume1 className="" size={28} />
            {!isCollapsed && <span>Announcement</span>}
          </Link> */}
          {/* Mock Test Dropdown */}
          {!isCollapsed && (
            <div>
              <div
                onClick={() => setIsMockDropdownOpen(!isMockDropdownOpen)}
                className="flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer hover:text-white transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
              >
                <span className="flex items-center space-x-2">
                  <FiEdit size={21} />
                  <span>Practice Test management</span>
                </span>
                {isMockDropdownOpen ? (
                  <FiChevronUp size={30} />
                ) : (
                  <FiChevronDown size={30} />
                )}
              </div>

              {isMockDropdownOpen && (
                <div className="border-y-2 border-red-600 mx-3 mt-1 space-y-2 bg-red-100 rounded-lg">
                  <Link
                    to="create-subject"
                    className="flex items-center space-x-2 px-4 py-2 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
                  >
                    <TbPencilQuestion />
                    <span>Add Subject</span>
                  </Link>
                  <Link
                    to="create-chapter"
                    className="flex items-center space-x-2 px-4 py-2 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
                  >
                    <FaFileCircleQuestion />
                    <span>Add chapter</span>
                  </Link>
                  <Link
                    to="create-question"
                    className="flex items-center space-x-2 px-4 py-2 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
                  >
                    <FaQuestionCircle />
                    <span>Add Questions</span>
                  </Link>

                  {/* <Link
                    to="create-questions"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-400 transition-all hover:shadow-md"
                  >
                    <FaList />
                    <span>Create Questions</span>
                  </Link>

                  */}
                  <Link
                    to="questions-manage"
                    className="flex items-center space-x-2 px-4 py-2 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
                  >
                    <TbAdjustmentsQuestion />
                    <span>Questions Management</span>
                  </Link>
                  <Link
                    to="create-test"
                    className="flex items-center space-x-2 px-4 py-2 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
                  >
                    <LuFileQuestion />
                    <span>Create Test</span>
                  </Link>

                  <Link
                    to="MockSidebarResult"
                    className="flex items-center space-x-2 px-4 py-2 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
                  >
                    <FaList />
                    <span>Test Result</span>
                  </Link>
                </div>
              )}
            </div>
          )}
          {/* <Link
            to="EContentModel"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FaRegFileArchive className="mr-2" size={20} />
            {!isCollapsed && <span>E-Book Modal Data</span>}
          </Link> */}
          <Link
            to="/"
            className="flex items-center px-4 py-3 hover:text-white rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#fe0000]"
          >
            <FaSignOutAlt className="mr-2" size={20} />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-grow ${
          isCollapsed ? 'ml-16' : 'ml-60'
        } h-[100vh] transition-all duration-300`}
      >
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Sidebarlerner