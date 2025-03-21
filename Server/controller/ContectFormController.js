const Contact = require('../model/ContectFromModel')

// Submit a new contact form
const submitContactForm = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      company,
      budget,
      purpose,
      leadSource,
      message,
    } = req.body

    const newContact = new Contact({
      fullName,
      email,
      phoneNumber,
      company,
      budget: purpose === 'Request Service' ? budget : undefined,
      purpose,
      leadSource,
      message,
    })

    await newContact.save()

    res.status(200).json({ message: 'Contact form submitted successfully!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error saving contact form data.' })
  }
}


// Retrieve all contact forms
const getContactFormInfo = async (req, res) => {
  try {
    const contactForm = await Contact.find({})
    res.status(200).json({ success: true, data: contactForm })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error retrieving contact form data.' })
  }
}

// Delete a contact form entry
const deleteContactForm = async (req, res) => {
  try {
    const { id } = req.params

    const deletedContact = await Contact.findByIdAndDelete(id)

    if (!deletedContact) {
      return res
        .status(404)
        .json({ success: false, error: 'Contact not found.' })
    }

    res
      .status(200)
      .json({ success: true, message: 'Contact deleted successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error deleting contact form data.' })
  }
}

// Update a contact form entry
const updateContactForm = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, {
      new: true,
    })

    if (!updatedContact) {
      return res
        .status(404)
        .json({ success: false, error: 'Contact not found.' })
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully.',
      data: updatedContact,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error updating contact form data.' })
  }
}

module.exports = {
  submitContactForm,
  getContactFormInfo,
  deleteContactForm,
  updateContactForm,
}
