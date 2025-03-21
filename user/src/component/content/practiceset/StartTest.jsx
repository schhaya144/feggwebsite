import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../../../common/SummaryApi'

const StartTest = () => {
  const { mockSetId } = useParams()
  const [questions, setQuestions] = useState([])
  const [duration, setDuration] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [learnerId, setLearnerId] = useState('')
  const [showResult, setShowResult] = useState(false) // New state for displaying result

  useEffect(() => {
    if (!mockSetId) {
      setError('Invalid test ID.')
      setLoading(false)
      return
    }

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          SummaryApi.startTest.url.replace(':mockSetId', mockSetId)
        )
        const data = await response.json()
        console.log(data)
        if (response.ok) {
          setQuestions(data.questions)
          setDuration(data.duration)
          setTimeLeft(data.duration * 60)
        } else {
          setError(data.message)
        }
      } catch (err) {
        setError('Failed to fetch questions. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [mockSetId])

  useEffect(() => {
    if (timeLeft <= 0 || submitted) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          openModal()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, submitted])

  const handleOptionChange = (questionId, optionId) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId })
  }

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleFinalSubmit = async () => {
    if (!name || !learnerId) {
      alert('Please enter your name and learner ID.')
      return
    }

    let correct = 0
    let wrong = 0
    let totalScore = 0

    questions.forEach((question) => {
      const selectedOption = selectedAnswers[question._id]
      const correctOption = question.options.find((opt) => opt.isCorrect)

      if (selectedOption === correctOption?._id) {
        correct++
        totalScore += question.marks
      } else {
        wrong++
      }
    })

    setCorrectAnswers(correct)
    setWrongAnswers(wrong)
    setScore(totalScore)
    setShowModal(false)

    const testResult = {
      mockSetId,
      name,
      learnerId,
      correctAnswers: correct,
      wrongAnswers: wrong,
      score: totalScore,
    }

    try {
      const response = await fetch(SummaryApi.submitpost.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testResult),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit test.')
      }

      alert('Test submitted successfully!')
      setSubmitted(true)
      setShowResult(true) // Show result after submission
    } catch (error) {
      alert(error.message || 'Failed to submit test.')
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  if (loading)
    return <div className="text-center text-gray-700">Loading...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">अभ्यास परीक्षण</h1>

      {showResult ? ( // Display result if test is submitted
        <div className="text-center p-6 bg-red-100 rounded-lg">
          <h2 className="text-xl font-bold text-red-700">परीक्षण पूरा हुआ!</h2>
          <p className="text-lg mt-2">अंक: {score}</p>
          <p className="text-lg">सही उत्तर: {correctAnswers}</p>
          <p className="text-lg">गलत उत्तर: {wrongAnswers}</p>
        </div>
      ) : (
        <>
          <div className="text-center text-lg font-semibold text-red-500">
          शेष समय: {formatTime(timeLeft)}
          </div>

          {questions.length === 0 ? (
            <p className="text-center text-gray-600">No questions available.</p>
          ) : (
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div
                  key={question._id}
                  className="p-4 border rounded-lg shadow"
                >
                  <p className="text-lg font-semibold mb-2">
                    {index + 1}. {question.questionText}
                  </p>
                  <div className="space-y-2">
                    {question.options.map((option, i) => (
                      <div
                        key={option._id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          id={`option-${index}-${i}`}
                          className="cursor-pointer"
                          onChange={() =>
                            handleOptionChange(question._id, option._id)
                          }
                          disabled={submitted}
                        />
                        <label
                          htmlFor={`option-${index}-${i}`}
                          className="cursor-pointer"
                        >
                          {option.optionText}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={openModal}
            className={`mt-6 w-full py-2 px-4 rounded-lg ${
              submitted
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
            disabled={submitted}
          >
            {submitted ? 'Test Submitted' : 'Submit Test'}
          </button>

          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-center mb-4">
                विवरण दर्ज करें
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="अपना नाम दर्ज करें"
                    className="w-full p-2 border rounded-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="अपना संपर्क  लर्नर आईडी दर्ज करें"
                    className="w-full p-2 border rounded-lg"
                    value={learnerId}
                    onChange={(e) => setLearnerId(e.target.value)}
                  />
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-400 rounded-lg"
                  >
                       रद्द करें  
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    जमा करें
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default StartTest
