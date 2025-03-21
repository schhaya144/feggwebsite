const mongoose = require('mongoose')

const carouselSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

const carouselModel = mongoose.model('Carousel', carouselSchema)
module.exports = carouselModel
