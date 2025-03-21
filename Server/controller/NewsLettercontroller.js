const NewsLetter = require('../model/NewsLetterModal')

const uploadNewsLetter = async (req, res) => {
  try {
    const { discription } = req.body; // Get description from request body

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    if (!discription) {
      return res.status(400).json({ message: 'Description is required' });
    }

    // Ensure correct path format
    const imagePath = req.file.path.replace(/\\/g, '/');

    // Create a new newsletter entry
    const newNewsLetter = new NewsLetter({
      image: imagePath,
      discription,
    });

    await newNewsLetter.save();
    res.status(201).json({
      message: 'Newsletter uploaded successfully',
      newsletter: newNewsLetter,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

const getNewsLetterImages = async (req, res) => {
  try {
    const images = await NewsLetter.find()
    res.json(images)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' })
  }
}

// Delete a newsletter image

const deleteNewsLetterImage = async (req, res) => {
  try {
    const { id } = req.params
    const deletedImage = await NewsLetter.findByIdAndDelete(id)
    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' })
    }
    res.status(200).json({ message: 'Image deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error })
  }
}
module.exports = {
  uploadNewsLetter,
  getNewsLetterImages,
  deleteNewsLetterImage,
}
