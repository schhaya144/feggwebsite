const Blueprint = require('../model/blueprintModel')
const path = require('path')
const fs = require('fs')

// ✅ Upload a new PDF
exports.uploadBlueprint = async (req, res) => {
  try {
    const { title } = req.body
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const filePath = `/uploads/${req.file.filename}`

    const newBlueprint = new Blueprint({ title, filePath })
    await newBlueprint.save()

    res.status(201).json({
      message: 'Blueprint uploaded successfully',
      blueprint: newBlueprint,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ✅ Get all PDFs
exports.getAllBlueprints = async (req, res) => {
  try {
    const blueprints = await Blueprint.find()
    res.status(200).json(blueprints)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ✅ Get a single PDF by ID
exports.getBlueprintById = async (req, res) => {
  try {
    const { id } = req.params
    const blueprint = await Blueprint.findById(id)

    if (!blueprint) {
      return res.status(404).json({ message: 'Blueprint not found' })
    }

    res.status(200).json(blueprint)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ✅ Update a PDF (only title can be updated)
exports.updateBlueprint = async (req, res) => {
  try {
    const { id } = req.params
    const { title } = req.body

    const updatedBlueprint = await Blueprint.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    )

    if (!updatedBlueprint) {
      return res.status(404).json({ message: 'Blueprint not found' })
    }

    res.status(200).json({
      message: 'Blueprint updated successfully',
      blueprint: updatedBlueprint,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ✅ Delete a PDF
exports.deleteBlueprint = async (req, res) => {
  try {
    const { id } = req.params
    const blueprint = await Blueprint.findById(id)

    if (!blueprint) {
      return res.status(404).json({ message: 'Blueprint not found' })
    }

    // Delete the file from the uploads folder
    const filePath = path.join(
      __dirname,
      `../uploads/${path.basename(blueprint.filePath)}`
    )
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    await Blueprint.findByIdAndDelete(id)
    res.status(200).json({ message: 'Blueprint deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
