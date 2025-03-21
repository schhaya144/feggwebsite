// controllers/authController.js
const Forgetpassword = require('../model/SinginForgetpassword')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

console.log('Email User:', process.env.EMAIL_USER)
console.log('Email Pass:', process.env.EMAIL_PASS ? 'Exists' : 'Missing')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// exports.login = async (req, res) => {
//   const { email, password } = req.body
//   console.log(req.body)
//   try {
//     const user = await Forgetpassword.findOne({ email })
//     if (!user) return res.status(404).json({ message: 'User not found' })

//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch)
//       return res.status(400).json({ message: 'Invalid credentials' })

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     })
//     res.status(200).json({ token, message: 'Login successful!' })
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' })
//   }
// }

// exports.login = async (req, res) => {
//   const { email, password } = req.body
//   try {
//     const user = await Forgetpassword.findOne({ email })
//     if (!user) return res.status(404).json({ message: 'User not found' })

//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch)
//       return res.status(400).json({ message: 'Invalid credentials' })

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     })

//     res
//       .status(200)
//       .json({ token, userId: user._id, message: 'Login successful!' })
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' })
//   }
// }

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await Forgetpassword.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.status(200).json({
      token,
      userId: user._id,
      email: user.email, // ✅ Added email field
      message: 'Login successful!',
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getlogin = async (req, res) => {
  try {
    const applications = await Forgetpassword.find() // Fetch all applications from the database
    res.status(200).json(applications)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch login.' })
  }
}

exports.register = async (req, res) => {
  console.log(`register`, req.body)
  const { email, password } = req.body
  try {
    const existingUser = await Forgetpassword.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    const newUser = new Forgetpassword({ email, password })
    await newUser.save()

    res.status(201).json({ message: 'Registration successful' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body
  console.log('Password reset request received for:', email)

  try {
    const user = await Forgetpassword.findOne({ email })
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ message: 'User not found' })
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    console.log('Generated JWT Token:', token)

    const link = `${process.env.ADMIN_URL}/ResetPasswordPage/${token}`
    console.log('Password reset link:', link)

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
    })

    res.status(200).json({ message: 'Password reset email sent!' })
  } catch (error) {
    console.error('Error during password reset request:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body
  console.log('Reset Password:', req.body)

  if (!newPassword) {
    return res.status(400).json({ message: 'New password is required' })
  }

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await Forgetpassword.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.password = newPassword
    await user.save()

    res.status(200).json({ message: 'Password has been reset successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' })
  }
}