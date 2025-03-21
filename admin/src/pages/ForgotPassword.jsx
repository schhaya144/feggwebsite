// import React, { useState } from 'react'

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('')
//   const [newPassword, setNewPassword] = useState('')
//   const [message, setMessage] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const response = await fetch('http://localhost:5000/api/reset-password', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, newPassword }),
//       })

//       const data = await response.json()
//       if (response.ok) {
//         setMessage('Your password has been updated successfully.')
//       } else {
//         setMessage(data.message || 'Something went wrong. Please try again.')
//       }
//     } catch (error) {
//       setMessage('An error occurred. Please try again later.')
//     }
//   }

//   return (
//     <section
//       id="forgotpassword"
//       className="min-h-screen flex items-center justify-center bg-gray-100"
//     >
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
//           Reset Password
//         </h2>
//         <p className="text-gray-600 text-center mb-6">
//           Enter your email and new password to reset your account.
//         </p>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="newPassword"
//               className="block text-sm font-medium text-gray-700"
//             >
//               New Password
//             </label>
//             <input
//               type="password"
//               id="newPassword"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Enter your new password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Reset Password
//           </button>
//         </form>
//         {message && (
//           <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
//         )}
//       </div>
//     </section>
//   )
// }

// export default ForgotPassword
import React, { useState } from 'react'
import axios from 'axios'
import SummaryApi from '../common/SummaryAPI'
const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(SummaryApi.requestpasswordreset.url, {
        email,
      })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Error sending password reset email'
      )
    }
  }

  return (
    <div className="flex flex-col border-2 border-red-500 p-5 justify-center items-center h-[100vh]">
      <h2 className="text-4xl font-bold text-red-500">Forgot Password</h2>
      <div className="p-10 shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  p-5 justify-center items-center"
        >
          <input
            type="email"
            value={email}
            className="w-full px-4 pb-3 bg-white text-black rounded-lg border-2 border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 my-5"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#d2d2d2] text-[#fe0000] font-bold rounded-lg hover:bg-[#c9c7c7] focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:ring-opacity-100 focus:scale-105 transition-all"
          >
            Request Password Reset
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default ForgotPassword
