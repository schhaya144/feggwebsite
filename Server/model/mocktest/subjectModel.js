const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  mockClass: { type: String, required: true,  },
  createdAt: { type: Date, default: Date.now },
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
