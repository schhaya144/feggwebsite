const Session = require('../model/SessionModel')

// Create a new session
const createSession = async (req, res) => {
  try {
    const { year, month } = req.body
    const newSession = new Session({ year, month })
    await newSession.save()
    res.status(201).json(newSession)
  } catch (error) {
    res.status(500).json({ error: 'Failed to add session' })
  }
}

// Get all sessions
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
    res.status(200).json(sessions)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' })
  }
}

// Update a session
const updateSession = async (req, res) => {
  try {
    const { id } = req.params
    const { year, month } = req.body

    const updatedSession = await Session.findByIdAndUpdate(
      id,
      { year, month },
      { new: true } // Returns the updated document
    )

    if (!updatedSession) {
      return res.status(404).json({ error: 'Session not found' })
    }

    res.status(200).json(updatedSession)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update session' })
  }
}

// Delete a session
const deleteSession = async (req, res) => {
  try {
    const { id } = req.params
    const deletedSession = await Session.findByIdAndDelete(id)

    if (!deletedSession) {
      return res.status(404).json({ error: 'Session not found' })
    }

    res.status(200).json({ message: 'Session deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete session' })
  }
}

module.exports = { createSession, getSessions, updateSession, deleteSession }
