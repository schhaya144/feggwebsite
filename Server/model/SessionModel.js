const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: String, enum: ['June', 'December'], required: true },
})

const Session = mongoose.model('Session', sessionSchema)
module.exports = Session
