import React, { useState } from 'react'
import axios from 'axios'
import StudentPopup from './Studentpopup'
import SummaryApi from '../../common/SummaryApi'

const FindLernerID = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    sssmid: '',
    contactNo: '',
    dob: '',
  })
  const [studentData, setStudentData] = useState(null)
  const [isPopupOpen, setPopupOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        SummaryApi.getStudentLernerID.url,
        formData
      )
      setStudentData(response.data)
      setEditedData(response.data) // Store original data for editing
      setPopupOpen(true)
    } catch (error) {
      alert('Student not found')
    }
  }

  // Show student details after clicking in popup
  const handleShowDetails = () => {
    setShowDetails(true)
    setPopupOpen(false)
  }

  // Handle Edit Mode Toggle
  const handleEdit = () => {
    setIsEditing(true)
  }

  // Handle Change for Editable Fields
  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value })
  }

  // Save the updated details to the database
  const handleSave = async () => {
    try {
      const response = await axios.put(
        ` ${SummaryApi.updateStudentLERnerID.url}${studentData._id}`,
        editedData
      )

      console.log('Data', response)
      setStudentData(response.data)
      setIsEditing(false)
      alert('Details updated successfully')
    } catch (error) {
      console.error('Error updating student details:', error)
      alert('Failed to update details')
    }
  }

  // Print Student Details
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex flex-col justify-center items-center w-full p-6 sm:px-12 px-4">
      <h2 className="text-2xl sm:text-4xl font-semibold text-primary text-center my-5 ">
        अपना लर्नर आईडी खोजें
      </h2>

      {/* Form to Find Learner ID */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 sm:gap-8 max-w-3xl mx-auto p-6 sm:p-10 bg-white shadow-md shadow-[#00043c] rounded-lg sm:w-auto w-full"
      >
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="font-medium text-gray-700">
              छात्र का फ़र्स्ट नेम
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="border p-2 rounded focus:ring-2 focus:ring-[#fd645b]"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="middleName" className="font-medium text-gray-700">
            मिडिल नेम{' '}
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              className="border p-2 rounded focus:ring-2 focus:ring-[#fd645b]"
              placeholder="Middle Name"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="font-medium text-gray-700">
              लास्ट नेम{' '}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="border p-2 rounded focus:ring-2 focus:ring-[#fd645b]"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="sssmid" className="font-medium text-gray-700">
              SSSM ID
            </label>
            <input
              type="text"
              id="sssmid"
              name="sssmid"
              className="border p-2 rounded focus:ring-2 focus:ring-[#fd645b]"
              placeholder="SSSM ID"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="contactNo" className="font-medium text-gray-700">
              संपर्क नंबर
            </label>
            <input
              type="text"
              id="contactNo"
              name="contactNo"
              className="border p-2 rounded focus:ring-2 focus:ring-[#fd645b]"
              placeholder="Contact No."
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="dob" className="font-medium text-gray-700">
            जन्म तिथि
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="border p-2 rounded focus:ring-2 focus:ring-[#fd645b]"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#fd645b] text-white p-3 rounded-lg font-semibold w-full sm:w-auto focus:ring-2 focus:ring-[#fd645b] hover:bg-white hover:text-[#fd645b] border-[#fd645b] border transition-all"
          >
            जमा करे{' '}
          </button>
        </div>
      </form>

      {/* Student Popup */}
      {isPopupOpen && (
        <StudentPopup
          studentData={studentData}
          closePopup={() => setPopupOpen(false)}
          showDetails={handleShowDetails}
        />
      )}

      {/* Display Student Details Here */}
      {showDetails && studentData && (
        <div className="mt-6 w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-[#fd645b] mb-6">
            छात्र पंजीकरण विवरण{' '}
          </h2>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong>Learner ID:</strong> {studentData.learnerId}
            </p>
            <p>
              <strong>पूरा नाम:</strong> {studentData.firstName}{' '}
              {studentData.middleName} {studentData.lastName}
            </p>
            <p>
              <strong>SSSM ID:</strong> {studentData.sssmid}
            </p>
            <p>
              <strong>जन्म तिथि:</strong> {studentData.dob}
            </p>
            <p>
              <strong>आयु:</strong> {studentData.age}
            </p>
            <p>
              <strong>लिंग:</strong> {studentData.gender}
            </p>
            <p>
              <strong>धर्म:</strong> {studentData.religion}
            </p>
            <p>
              <strong>श्रेणी:</strong> {studentData.category}
            </p>
            <p className="sm:col-span-2">
              <strong>पिता का नाम:</strong> {studentData.fatherFirstName}{' '}
              {studentData.fatherMiddleName} {studentData.fatherLastName}
            </p>
            <p>
              <strong>माता का नाम:</strong> {studentData.motherFirstName}{' '}
              {studentData.motherMiddleName} {studentData.motherLastName}
            </p>
            <p>
              <strong>आप ने अंतिम कक्षा कौन सी पढ़ी है ?:</strong>{' '}
              {studentData.lastClassStudied}
            </p>
            <p>
              <strong>आवेदन का प्रकार:</strong> {studentData.applyFor}
            </p>
            <p>
              <strong>स्तिथि :</strong> {studentData.status}
            </p>
            <p>
              <strong>जिला:</strong> {studentData.district}
            </p>
            <p>
              <strong>तहसील:</strong> {studentData.tehsil}
            </p>
            <p>
              <strong>ब्लॉक:</strong> {studentData.block}
            </p>
            <p>
              <strong>गाँव:</strong> {studentData.village}
            </p>
            <p>
              <strong>पिन कोड:</strong> {studentData.pincode}
            </p>
          </div>

          {/* Editable Fields */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Edit Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-gray-700">
                  संपर्क नंबर:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="contactNo"
                    value={editedData.contactNo}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded focus:ring-2 focus:ring-[#fd645b]"
                  />
                ) : (
                  <p className="text-gray-800">{studentData.contactNo}</p>
                )}
              </div>

              <div>
                <label className="font-medium text-gray-700">ई-मेल:</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="mail"
                    value={editedData.mail}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded focus:ring-2 focus:ring-[#fd645b]"
                  />
                ) : (
                  <p className="text-gray-800">{studentData.mail}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="font-medium text-gray-700">स्थाई पता:</label>
                {isEditing ? (
                  <textarea
                    name="permanentAddress"
                    value={editedData.permanentAddress}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded focus:ring-2 focus:ring-[#fd645b]"
                  ></textarea>
                ) : (
                  <p className="text-gray-800">
                    {studentData.permanentAddress}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold transition-all hover:bg-green-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-[#fd645b] text-white px-4 py-2 rounded-lg font-semibold focus:ring-2 focus:ring-[#fd645b] hover:bg-white hover:text-[#fd645b] border-[#fd645b] border transition-all"
              >
                Edit
              </button>
            )}
            <button
              onClick={handlePrint}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition-all hover:bg-blue-600"
            >
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FindLernerID
