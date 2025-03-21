require('dotenv').config()
const express = require('express')
const server = express()
const cors = require('cors')
const Router = require('./router/index')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

//middleware
server.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL], // Allow frontend & admin access
  })
)
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use('/api', Router)
server.use('/uploads', express.static(path.join(__dirname, 'uploads')))

server.get('/', (req, res) => {
  res.send('Hello, World!')
})

// DB connection
const DBconnection = mongoose.connect(process.env.MONGODB_URI)

DBconnection.then(() => {
  server.listen(process.env.PORT, () => {
    console.log('server Listener is running')
    console.log('DB connected')
  })
}).catch((error) => console.log('server error:' + error))
