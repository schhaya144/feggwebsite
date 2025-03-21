const Testimonial = require("../model/testimonialSchema")

// Get all testimonials
exports.getTestimonials = async (req, res) => {
    try {
      const testimonials = await Testimonial.find()
      res.status(200).json(testimonials)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  
  // Add a new testimonial
  exports.addTestimonial = async (req, res) => {
    try {
        const { text, author } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
    
        const newTestimonial = new Testimonial({ text, author, image });
        await newTestimonial.save();
    
        res.status(201).json(newTestimonial);
      } catch (error) {
        res.status(500).json({ error: 'Server Error' });
      }
  }
  
  // Delete a testimonial
  exports.deleteTestimonial = async (req, res) => {
    try {
      const { id } = req.params
      await Testimonial.findByIdAndDelete(id)
      res.status(200).json({ message: 'Testimonial deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  

