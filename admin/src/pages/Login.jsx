import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import fagglogo from '../../public/eg-logo.png'
import mpsoslogo from '../../public/mpsos_logo.png'
import singin from '../../public/loginbg0.jpg'
import axios from 'axios'
import SummaryApi from '../common/SummaryAPI'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword)
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setError('')

  //   try {
  //     const response = await axios.post(SummaryApi.login.url, data)
  //     localStorage.setItem('token', response.data.token)
  //     navigate('/dashboard/dashboardCards')
  //   } catch (error) {
  //     setError(error.response?.data?.message || 'Invalid email or password')
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post(SummaryApi.login.url, data)
      console.log('API Response:', response.data)

      const { token, email } = response.data
      console.log('Email from API:', email)

      localStorage.setItem('token', token)
      localStorage.setItem('userId', email)

      if (email.toLowerCase() === 'techeg007@gmail.com') {
        navigate('/dashboard/dashboardCards')
      } else if (email.toLowerCase() === 'academics07@gmail.com') {
        navigate('/dashboard2')
      } else if (email.toLowerCase() === 'communication07@gmail.com') {
        navigate('/dashboard3')
      } else {
        navigate('/dashboard/general')
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password')
    }
  }

  return (
    <section
      id="login"
      className="flex items-center justify-center min-h-screen text-white bg-no-repeat bg-cover  object-contain"
      style={{ backgroundImage: `url(${singin})` }}
    >
      <div className="container max-w-md mx-auto p-4">
        <div className="bg-black bg-opacity-65 p-8 rounded-lg border-red-500 border-2 ">
          <div className="bg-white rounded-full flex items-center justify-center w-32 h-32 mx-auto border-l-4  border-b-4 border-red-500">
            <img src={fagglogo} className="w-20 object-fill mx-auto mb-4" />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-start">
                <label className="block text-sm font-medium mb-2 bg-[#ff0000] w-[65px] px-1">
                  Login ID:
                </label>
                <span className="w-0 h-0 border-l-[0px] border-l-transparent border-t-[20px] border-t-[#ff0000] border-r-[13px] border-r-transparent mb-2"></span>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleOnChange}
                className="w-full px-4 py-3 bg-white text-black rounded-lg border-2 border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="relative">
              <div className="flex items-center justify-start">
                <label className="block text-sm font-medium mb-2 bg-[#ff0000] w-[80px] px-1">
                  Password :
                </label>
                <span className="w-0 h-0 border-l-[0px] border-l-transparent border-t-[20px] border-t-[#ff0000] border-r-[13px] border-r-transparent mb-2"></span>
              </div>

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full px-4 py-3 bg-white text-black rounded-lg border-2 border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <FaEye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
              <Link
                to="/forgotpassword"
                className="block mt-2 text-white hover:underline text-right"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#d2d2d2] text-[#fe0000] font-bold rounded-lg hover:bg-[#c9c7c7] focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:ring-opacity-100 focus:scale-105 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login