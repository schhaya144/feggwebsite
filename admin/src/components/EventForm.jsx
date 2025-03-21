import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SummaryApi from '../common/SummaryAPI'
import { MdEdit, MdDelete } from 'react-icons/md'

const EventForm = () => {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(1)
  const [date, setDate] = useState('')
  const [venue, setVenue] = useState('')
  const [price, setPrice] = useState('')
  const [mapUrl, setMapUrl] = useState('')
  const [events, setEvents] = useState([])
  const [editingEventId, setEditingEventId] = useState(null)
  const [editingEvent, setEditingEvent] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newEvent = { name, duration, date, venue, price, mapUrl }
      const response = await axios({
        url: SummaryApi.addEvent.url,
        method: SummaryApi.addEvent.method,
        data: newEvent,
      })
      setEvents([...events, response.data])
    } catch (error) {
      console.error('Error creating event:', error)
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await axios.get(SummaryApi.getEvent.url)
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${SummaryApi.deleteEvent.url.replace(':id', id)}`)
      setEvents(events.filter((event) => event._id !== id))
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const handleEditInputChange = (e, field) => {
    const { value } = e.target
    setEditingEvent((prevEvent) => ({ ...prevEvent, [field]: value }))
  }

  const handleEdit = (event) => {
    setEditingEventId(event._id)
    setEditingEvent(event)
  }

  const handleCancelEdit = () => {
    setEditingEventId(null)
    setEditingEvent({})
  }

  const handleSaveEdit = async () => {
    try {
      const response = await axios({
        url: SummaryApi.updateEvent.url.replace(':id', editingEventId),
        method: SummaryApi.updateEvent.method,
        data: editingEvent,
      })
      setEvents(
        events.map((event) =>
          event._id === editingEventId ? response.data : event
        )
      )
      handleCancelEdit()
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="p-6  bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 border-b border-gray-600 pb-2">
        Create New Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: 'Event Name',
              value: name,
              setValue: setName,
              type: 'text',
            },
            {
              label: 'Duration (hours)',
              value: duration,
              setValue: setDuration,
              type: 'number',
            },
            {
              label: 'Select Date',
              value: date,
              setValue: setDate,
              type: 'date',
            },
            {
              label: 'Price',
              value: price,
              setValue: setPrice,
              type: 'number',
            },
            { label: 'Venue', value: venue, setValue: setVenue, type: 'text' },
            {
              label: 'Map URL',
              value: mapUrl,
              setValue: setMapUrl,
              type: 'url',
            },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:ring focus:ring-blue-400"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-r hover:from-teal-500 hover:to-blue-600  text-white py-2 rounded-lg font-bold"
        >
          Create Event
        </button>
      </form>

      <h2 className="text-3xl font-bold mt-6 mb-4 border-b border-gray-600 pb-2">
        Events
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left text-sm border border-gray-600">
          <thead className="bg-gray-700">
            <tr>
              {[
                'S.No',
                'Event Name',
                'Duration',
                'Date',
                'Venue',
                'Price',
                'Created At',
                'Location',
                'Actions',
              ].map((header) => (
                <th key={header} className="px-4 py-2 border-b border-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((event, idx) => (
              <tr key={event._id} className="hover:bg-gray-700">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">
                  {editingEventId === event._id ? (
                    <input
                      type="text"
                      value={editingEvent.name}
                      onChange={(e) => handleEditInputChange(e, 'name')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    event.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingEventId === event._id ? (
                    <input
                      type="number"
                      value={editingEvent.duration}
                      onChange={(e) => handleEditInputChange(e, 'duration')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    event.duration
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingEventId === event._id ? (
                    <input
                      type="date"
                      value={editingEvent.date}
                      onChange={(e) => handleEditInputChange(e, 'date')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    new Date(event.date).toLocaleDateString()
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingEventId === event._id ? (
                    <input
                      type="text"
                      value={editingEvent.venue}
                      onChange={(e) => handleEditInputChange(e, 'venue')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    event.venue
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingEventId === event._id ? (
                    <input
                      type="number"
                      value={editingEvent.price}
                      onChange={(e) => handleEditInputChange(e, 'price')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    event.price
                  )}
                </td>
                <td className="px-4 py-2">
                  {new Date(event.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Map
                  </a>
                </td>
                <td className="px-4 py-2">
                  {editingEventId === event._id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(event)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2"
                      >
                        <MdEdit className="text-white" />
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700"
                      >
                        <MdDelete className="text-white" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EventForm
