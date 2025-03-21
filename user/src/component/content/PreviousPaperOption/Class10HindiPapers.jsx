// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import SummaryApi from '../../../common/SummaryApi'
// const baseUrl = import.meta.env.VITE_BACKEND_URL

// const Class10HindiPapers = () => {
//   const [papers, setPapers] = useState([])
//   const [openSubject, setOpenSubject] = useState(null) // Track open accordion

//   useEffect(() => {
//     const fetchPapers = async () => {
//       try {
//         const response = await axios.get(`${SummaryApi.PreviousPaperget.url}`, {
//           params: { className: '10', language: 'Hindi' },
//         })
//         setPapers(response.data)
//       } catch (error) {
//         console.error('Error fetching papers:', error)
//       }
//     }
//     fetchPapers()
//   }, [])

//   // Group papers by subject
//   const groupedPapers = papers.reduce((acc, paper) => {
//     const { subject } = paper
//     if (!acc[subject]) acc[subject] = []
//     acc[subject].push(paper)
//     return acc
//   }, {})

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-2xl font-bold text-center text-[#fd645b] mb-4">
//         Class 10 (Hindi) - Previous Year Papers
//       </h2>

//       {Object.keys(groupedPapers).length > 0 ? (
//         <div>
//           {Object.keys(groupedPapers).map((subject) => (
//             <div key={subject} className="mb-4 border-b border-gray-300">
//               <button
//                 onClick={() =>
//                   setOpenSubject(openSubject === subject ? null : subject)
//                 }
//                 className="w-full text-left p-3 font-semibold bg-gray-100 hover:bg-gray-200 flex justify-between"
//               >
//                 {subject}
//                 <span>{openSubject === subject ? '▲' : '▼'}</span>
//               </button>

//               {openSubject === subject && (
//                 <div className="p-3 bg-gray-50">
//                   <ul className="list-disc pl-5">
//                     {groupedPapers[subject].map((paper) => (
//                       <li key={paper._id} className="mb-2">
//                         {paper.year} -
//                         <a
//                           href={new URL(paper.file, baseUrl).href}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-500 underline ml-2"
//                         >
//                           Download PDF
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No papers available.</p>
//       )}
//     </div>
//   )
// }

// export default Class10HindiPapers

import { useState, useEffect } from 'react'
import axios from 'axios'
import SummaryApi from '../../../common/SummaryApi'
const baseUrl = import.meta.env.VITE_BACKEND_URL

const Class10HindiPapers = () => {
  const [papers, setPapers] = useState([])
  const [openSubject, setOpenSubject] = useState(null) // खुले हुए विषय को ट्रैक करें

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(`${SummaryApi.PreviousPaperget.url}`, {
          params: { className: '10', language: 'Hindi' },
        })
        setPapers(response.data)
      } catch (error) {
        console.error('प्रश्न पत्र लाने में त्रुटि:', error)
      }
    }
    fetchPapers()
  }, [])

  // प्रश्न पत्रों को विषय के अनुसार समूहित करें
  const groupedPapers = papers.reduce((acc, paper) => {
    const { subject } = paper
    if (!acc[subject]) acc[subject] = []
    acc[subject].push(paper)
    return acc
  }, {})

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-[#fd645b] mb-4">
        कक्षा 10 (हिंदी) - पिछले वर्षों के प्रश्न पत्र
      </h2>

      {Object.keys(groupedPapers).length > 0 ? (
        <div>
          {Object.keys(groupedPapers).map((subject) => (
            <div key={subject} className="mb-4 border-b border-gray-300">
              <button
                onClick={() =>
                  setOpenSubject(openSubject === subject ? null : subject)
                }
                className="w-full text-left p-3 font-semibold bg-gray-100 hover:bg-gray-200 flex justify-between"
              >
                {subject}
                <span>{openSubject === subject ? '▲' : '▼'}</span>
              </button>

              {openSubject === subject && (
                <div className="p-3 bg-gray-50">
                  <ul className="list-disc pl-5">
                    {groupedPapers[subject].map((paper) => (
                      <li key={paper._id} className="mb-2">
                        {paper.year} -
                        <a
                          href={new URL(paper.file, baseUrl).href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline ml-2"
                        >
                          पीडीएफ डाउनलोड करें
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">कोई प्रश्न पत्र उपलब्ध नहीं है।</p>
      )}
    </div>
  )
}

export default Class10HindiPapers
