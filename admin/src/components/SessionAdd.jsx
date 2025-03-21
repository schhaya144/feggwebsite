// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import SummaryApi from '../common/SummaryAPI'

// const SessionAdd = () => {
//   const [year, setYear] = useState('')
//   const [month, setMonth] = useState('June')
//   const [sessions, setSessions] = useState([])
//   const [editingSession, setEditingSession] = useState(null)

//   // Fetch existing sessions
//   const fetchSessions = async () => {
//     try {
//       const response = await axios.get(SummaryApi.Getsession.url)
//       setSessions(response.data)
//     } catch (error) {
//       console.error('Error fetching sessions:', error)
//     }
//   }

//   useEffect(() => {
//     fetchSessions()
//   }, [])

//   // Handle form submission (Add / Update session)
//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!year || !month) {
//       alert('Please enter a valid year and month.')
//       return
//     }

//     try {
//       if (editingSession) {
//         // Update session
//         const response = await axios.put(
//           `${SummaryApi.uploadsession.url}/${editingSession._id}`,
//           { year, month }
//         )
//         setSessions(
//           sessions.map((s) =>
//             s._id === editingSession._id ? response.data : s
//           )
//         )
//         setEditingSession(null)
//       } else {
//         // Add session
//         const response = await axios.post(SummaryApi.uploadsession.url, {
//           year,
//           month,
//         })
//         setSessions([...sessions, response.data])
//       }
//       setYear('')
//       setMonth('June')
//       alert('Session saved successfully!')
//     } catch (error) {
//       console.error('Error saving session:', error)
//       alert('Failed to save session.')
//     }
//   }

//   // Handle delete session
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${SummaryApi.uploadsession.url}/${id}`)
//       setSessions(sessions.filter((s) => s._id !== id))
//       alert('Session deleted successfully!')
//     } catch (error) {
//       console.error('Error deleting session:', error)
//       alert('Failed to delete session.')
//     }
//   }

//   // Handle edit session
//   const handleEdit = (session) => {
//     setYear(session.year)
//     setMonth(session.month)
//     setEditingSession(session)
//   }

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">
//         {editingSession ? 'Edit Session' : 'Add Session'}
//       </h2>
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4 border border-[#fd645b] rounded-xl border-r-4 border-b-4 p-5"
//       >
//         <input
//           type="number"
//           placeholder="Enter Year"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           className="border p-2 w-full rounded"
//           required
//         />
//         <select
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//           className="border p-2 w-full rounded"
//         >
//           <option value="June">June</option>
//           <option value="December">December</option>
//         </select>
//         <button
//           type="submit"
//           className="bg-primary text-white p-2 rounded w-full"
//         >
//           {editingSession ? 'Update Session' : 'Add Session'}
//         </button>
//       </form>

//       {/* Display Added Sessions in Table */}
//       <div className="mt-6">
//         <h3 className="text-xl font-bold">Existing Sessions</h3>
//         <table className="w-full border-collapse border border-gray-300 mt-2">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Year</th>
//               <th className="border p-2">Month</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sessions.map((session) => (
//               <tr key={session._id} className="text-center">
//                 <td className="border p-2">{session.year}</td>
//                 <td className="border p-2">{session.month}</td>
//                 <td className="border p-2 space-x-2">
//                   <button
//                     onClick={() => handleEdit(session)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(session._id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default SessionAdd

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SummaryApi from '../common/SummaryAPI'

const SessionAdd = () => {
  const [sessions, setSessions] = useState([])
  const [editingSessionId, setEditingSessionId] = useState(null)
  const [formData, setFormData] = useState({ year: '', month: 'June' })

  // Fetch existing sessions
  const fetchSessions = async () => {
    try {
      const response = await axios.get(SummaryApi.Getsession.url)
      setSessions(response.data)
    } catch (error) {
      console.error('Error fetching sessions:', error)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  // Handle form submission (Add / Update session)
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.year || !formData.month) {
      alert('Please enter a valid year and month.')
      return
    }

    try {
      if (editingSessionId) {
        const response = await axios.put(
          `${SummaryApi.uploadsession.url}/${editingSessionId}`,
          formData
        )
        setSessions(
          sessions.map((s) => (s._id === editingSessionId ? response.data : s))
        )
        setEditingSessionId(null)
      } else {
        const response = await axios.post(
          SummaryApi.uploadsession.url,
          formData
        )
        setSessions([...sessions, response.data])
      }
      setFormData({ year: '', month: 'June' })
      alert('Session saved successfully!')
    } catch (error) {
      console.error('Error saving session:', error)
      alert('Failed to save session.')
    }
  }

  // Handle delete session
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${SummaryApi.uploadsession.url}/${id}`)
      setSessions(sessions.filter((s) => s._id !== id))
      alert('Session deleted successfully!')
    } catch (error) {
      console.error('Error deleting session:', error)
      alert('Failed to delete session.')
    }
  }

  // Handle edit session
  const handleEdit = (session) => {
    setFormData({ year: session.year, month: session.month })
    setEditingSessionId(session._id)
  }

  const handleChange = (e, sessionId) => {
    setSessions(
      sessions.map((s) =>
        s._id === sessionId ? { ...s, [e.target.name]: e.target.value } : s
      )
    )
  }

  const handleSaveEdit = async (sessionId) => {
    const updatedSession = sessions.find((s) => s._id === sessionId)
    try {
      await axios.put(
        `${SummaryApi.uploadsession.url}/${sessionId}`,
        updatedSession
      )
      alert('Session updated successfully!')
      setEditingSessionId(null)
    } catch (error) {
      console.error('Error updating session:', error)
      alert('Failed to update session.')
    }
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Session</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border border-[#fd645b] rounded-xl border-r-4 border-b-4 p-5"
      >
        <input
          type="number"
          name="year"
          placeholder="Enter Year"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <select
          name="month"
          value={formData.month}
          onChange={(e) => setFormData({ ...formData, month: e.target.value })}
          className="border p-2 w-full rounded"
        >
          <option value="June">June</option>
          <option value="December">December</option>
        </select>
        <button
          type="submit"
          className="bg-primary text-white p-2 rounded w-full"
        >
          {editingSessionId ? 'Update Session' : 'Add Session'}
        </button>
      </form>

      {/* Display Added Sessions in Table */}
      <div className="mt-6">
        <h3 className="text-xl font-bold">Existing Sessions</h3>
        <table className="w-full border-collapse border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Year</th>
              <th className="border p-2">Month</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session._id} className="text-center">
                <td className="border p-2">
                  {editingSessionId === session._id ? (
                    <input
                      type="number"
                      name="year"
                      value={session.year}
                      onChange={(e) => handleChange(e, session._id)}
                      className="border p-1 w-full rounded"
                    />
                  ) : (
                    session.year
                  )}
                </td>
                <td className="border p-2">
                  {editingSessionId === session._id ? (
                    <select
                      name="month"
                      value={session.month}
                      onChange={(e) => handleChange(e, session._id)}
                      className="border p-1 w-full rounded"
                    >
                      <option value="June">June</option>
                      <option value="December">December</option>
                    </select>
                  ) : (
                    session.month
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  {editingSessionId === session._id ? (
                    <button
                      onClick={() => handleSaveEdit(session._id)}
                      className="bg-green-500 text-white px-5 ms-1 my-1 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(session)}
                      className="bg-blue-500 text-white px-5 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(session._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SessionAdd
