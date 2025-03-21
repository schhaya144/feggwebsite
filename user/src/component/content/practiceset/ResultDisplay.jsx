import { useEffect, useState } from 'react'
import SummaryApi from '../../../common/SummaryApi'

const ResultDisplay = ({ resultId }) => {
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const response = await fetch(
          SummaryApi.TestResult.url.replace(':resultId', resultId)
        )
        if (!response.ok) {
          throw new Error('परीक्षण परिणाम लाने में विफल')
        }
        const data = await response.json()
        setTestResult(data.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTestResult()
  }, [resultId])

  if (loading) return <p>लोड हो रहा है...</p>
  if (error) return <p>त्रुटि: {error}</p>
  if (!testResult) return <p>कोई परिणाम नहीं मिला।</p>

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">परीक्षण परिणाम</h2>
      <p>
        <strong>नाम:</strong> {testResult.userName}
      </p>
      <p>
        <strong>फ़ोन:</strong> {testResult.userPhone}
      </p>
      <p>
        <strong>कुल प्रश्न:</strong> {testResult.totalQuestions}
      </p>
      <p>
        <strong>सही उत्तर:</strong> {testResult.correctAnswers}
      </p>
      <p>
        <strong>गलत उत्तर:</strong> {testResult.wrongAnswers}
      </p>
      <p>
        <strong>अंक:</strong> {testResult.score}
      </p>
      <h3 className="mt-4 font-semibold">आपके उत्तर:</h3>
      <ul className="list-disc pl-4">
        {Object.entries(testResult.answers).map(([questionId, answer]) => (
          <li key={questionId}>
            <strong>प्रश्न {questionId}:</strong> {answer}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResultDisplay
