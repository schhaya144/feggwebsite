import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SummaryApi from '../../../common/SummaryApi'
import fagglogo from '../../../assets/logo.png'

const Crad12th = () => {
  const navigate = useNavigate()
  const [mockTests, setMockTests] = useState([])

  useEffect(() => {
    const fetchMockTests = async () => {
      try {
        const response = await axios.get(SummaryApi.getPracticeCards.url)
        if (response.data.success) {
          const filteredTests = response.data.data.filter(
            (test) => test.className === '12'
          )
          setMockTests(filteredTests)
        }
      } catch (error) {
        console.error('मॉक टेस्ट लाने में त्रुटि:', error)
      }
    }

    fetchMockTests()
  }, [])

  return (
    <div>
      <div className="  px-4 sm:px-10">
        <h2 className="text-xl font-bold mb-4">
          कक्षा 12वीं अभ्यास सेट
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockTests.map((test) => (
            <div
              key={test._id}
              className="flex justify-center flex-col items-center bg-white shadow-md shadow-[#fd645b] p-4 rounded-lg border hover:scale-95 hover:shadow-[#fd645b] hover:shadow-lg transition-all"
            >
              <img
                className="w-24 h-24 p-1 object-fill rounded-full mb-4 border-2 border-[#fd645b]"
                src={fagglogo}
                alt="FAGG Logo"
              />
              <h3 className="text-lg font-semibold">
                विषय: {test.subject?.name || 'अज्ञात विषय'}
              </h3>
              <p className="text-sm">कुल अंक: {test.totalMarks}</p>
              <p className="text-sm">समय अवधि: {test.duration} मिनट</p>
              <p className="text-sm">
                प्रश्नों की संख्या: {test.numQuestions}
              </p>
              <button
                onClick={() => navigate(`/start-test/${test._id}`)}
                className="mt-2 bg-[#fd645b] text-white px-4 py-2 rounded active:scale-95 transition-all"
              >
                टेस्ट शुरू करें
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Crad12th
