import { useState, useEffect } from 'react'
import axios from 'axios'
import PracticesetCards from './PracticesetCards'
import SummaryApi from '../../common/SummaryAPI'

const CreatePracticeSet = () => {
  const [formData, setFormData] = useState({
    className: '',
    subjectId: '',
    selectedChapters: [],
    numQuestions: '',
    totalMarks: '',
    duration: '',
  })

  const [subjects, setSubjects] = useState([])
  const [chapters, setChapters] = useState([])
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (formData.className) {
      axios
        .get(
          SummaryApi.GetSubjectByClass.url.replace(
            ':className',
            formData.className
          )
        )

        .then((response) => setSubjects(response.data.subjects || []))
        .catch((error) => console.error('Error fetching subjects:', error))
    } else {
      setSubjects([])
      setChapters([])
    }
  }, [formData.className])

  useEffect(() => {
    if (formData.subjectId) {
      axios
        .get(
          SummaryApi.GetChapterBySubjectid.url.replace(
            ':subjectId',
            formData.subjectId,
            formData.name
          )
        )
        .then((response) => setChapters(response.data.chapters || []))
        .catch((error) => console.error('Error fetching chapters:', error))
    } else {
      setChapters([])
    }
  }, [formData.subjectId])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (chapterId) => {
    setFormData((prevData) => {
      const isChecked = prevData.selectedChapters.includes(chapterId)
      return {
        ...prevData,
        selectedChapters: isChecked
          ? prevData.selectedChapters.filter((id) => id !== chapterId)
          : [...prevData.selectedChapters, chapterId],
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        SummaryApi.generatePracticeset.url,
        formData
      )
      setMessage(response.data.message)
      setFormData({
        className: '',
        subjectId: '',
        selectedChapters: [],
        numQuestions: '',
        totalMarks: '',
        duration: '',
      })
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong!')
    }
  }

  return (
    <>
      <div className="max-w-lg mx-auto bg-white shadow-lg border border-[#fd645b] rounded-xl border-r-4 border-b-4 p-5  ">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create Practice Set
        </h2>
        {message && <p className="text-green-600 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <select
            name="className"
            value={formData.className}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Select a class</option>
            <option value="10">Class 10</option>
            <option value="12">Class 12</option>
          </select>

          <select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>

          <div>
            <p>Select Chapters:</p>
            {chapters.map((chapter) => (
              <label key={chapter._id} className="block">
                <input
                  type="checkbox"
                  checked={formData.selectedChapters.includes(chapter._id)}
                  onChange={() => handleCheckboxChange(chapter._id)}
                  className="mr-2"
                />
                {chapter.title}
              </label>
            ))}
          </div>

          <input
            type="number"
            name="numQuestions"
            value={formData.numQuestions}
            onChange={handleChange}
            placeholder="Number of Questions"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />

          <input
            type="number"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={handleChange}
            placeholder="Total Marks"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />

          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration (in minutes)"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-red-600"
          >
            Generate Mock Set
          </button>
        </form>
      </div>
      <PracticesetCards />
    </>
  )
}

export default CreatePracticeSet
