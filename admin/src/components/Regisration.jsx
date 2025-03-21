// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const Registration = () => {
//   const [loginData, setLoginData] = useState(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8006/api/getlogin')
//         setLoginData(response.data)
//         console.log(response.data) // Check the fetched data
//       } catch (error) {
//         console.error('Error fetching login data:', error)
//       }
//     }

//     fetchData()
//   }, [])

//   return (
//     <div>
//       <h1>Registration</h1>
//       {loginData ? (
//         <pre>{JSON.stringify(loginData, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   )
// }

// export default Registration

import React, { useState } from 'react'
import axios from 'axios'
import SummaryApi from '../common/SummaryAPI'

export default function ForgetPasswordRegistration() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.email || !formData.password) {
      setError('All fields are required')
      return
    }

    try {
      const response = await axios.post(SummaryApi.Registerlogin.url, formData)
      console.log(response)
      setSuccess(response.data.message)
      console.log(response)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Registration</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  )
}
