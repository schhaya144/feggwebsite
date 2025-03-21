const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true }, 
})

module.exports = mongoose.model('Testimonial', testimonialSchema)
