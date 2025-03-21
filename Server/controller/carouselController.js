const CarouselModel = require('../model/carouselSchema')

const uploadCarouselImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' })
    }

    const { title, description } = req.body
    const imagePath = req.file.path // Get uploaded file path

    const newCarousel = new CarouselModel({
      image: imagePath,
      title,
      description,
    })

    await newCarousel.save()
    res.status(201).json({
      message: 'Carousel image uploaded successfully',
      carousel: newCarousel,
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error })
  }
}

// Get all carousel images
const getAllCarouselImages = async (req, res) => {
  try {
    const images = await CarouselModel.find().sort({ createdAt: -1 })
    res.status(200).json(images)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error })
  }
}

// Delete a carousel image
const deleteCarouselImage = async (req, res) => {
  try {
    const { id } = req.params
    const deletedCarousel = await CarouselModel.findByIdAndDelete(id)

    if (!deletedCarousel) {
      return res.status(404).json({ message: 'Carousel item not found' })
    }

    res.status(200).json({ message: 'Carousel item deleted successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting carousel item', error: error.message })
  }
}
// Export the functions using CommonJS
module.exports = {
  uploadCarouselImage,
  getAllCarouselImages,
  deleteCarouselImage,
}
