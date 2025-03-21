const mongoose = require('mongoose')

const videoUploadSchema = new mongoose.Schema(
  {
    sessionYear: {
      type: String,
      required: true,
      enum: [
        '2023-2024',
        '2024-2025',
        '2025-2026',
        '2026-2027',
        '2027-2028',
        '2028-2029',
        '2029-2030',
      ],
    },

    className: {
      type: String,
      required: true,
      enum: ['10', '12'],
    },
    subject: {
      type: String,
      required: true,
    },
    chapterName: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      enum: ['English', 'Hindi'],
    },
    isActive: { type: Boolean, default: true }, // Add isActive field

    youtubeLink: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(v)
        },
        message: 'Invalid YouTube link',
      },
    },
  },
  { timestamps: true }
)

const VideoUpload = mongoose.model('VideoUpload', videoUploadSchema)

module.exports = VideoUpload
