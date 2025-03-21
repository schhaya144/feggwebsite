// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import SummaryApi from '../../common/SummaryApi'
// import fagglogo from '../../../public/eg-logo.png'

// const baseUrl = import.meta.env.VITE_BACKEND_URL

// const Econtent10th = () => {
//   const [data, setData] = useState([])
//   const [activeIndex, setActiveIndex] = useState(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [selectedSubject, setSelectedSubject] = useState('')
//   const [selectedClass, setSelectedClass] = useState('')
//   const [userInput, setUserInput] = useState('')
//   useEffect(() => {
//     axios
//       .get(`${SummaryApi.Ebooks.url}?className=10`)
//       .then((response) => {
//         setData(response.data)
//       })
//       .catch((error) => {
//         console.error('Error fetching eBooks:', error)
//       })
//   }, [])

//   const handleAccordionToggle = (index) => {
//     setActiveIndex(activeIndex === index ? null : index)
//   }

//   const handleDownloadClick = (fileUrl, subject, className) => {
//     setSelectedFile(fileUrl)
//     setSelectedSubject(subject)
//     setSelectedClass(className) // Ensure className is set
//     setIsModalOpen(true)
//   }

//   const handleModalSubmit = () => {
//     console.log(userInput, selectedClass, selectedSubject)
//     if (userInput.trim()) {
//       axios
//         .post(SummaryApi.StoreUserDownload.url, {
//           userInput,
//           subject: selectedSubject,
//           className: selectedClass,
//         })
//         .then(() => {
//           // Automatically trigger file download after successful submission
//           const link = document.createElement('a')
//           link.href = `${baseUrl}/${selectedFile}`
//           link.setAttribute('download', selectedFile.split('/').pop()) // Extract filename from URL
//           document.body.appendChild(link)
//           link.click()
//           document.body.removeChild(link)

//           setIsModalOpen(false)
//           setUserInput('')
//         })
//         .catch((error) => {
//           console.error('Error storing user input:', error)
//         })
//     } else {
//       alert('Please enter your Student ID or Contact Number')
//     }
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Econtent for 10th Class</h2>
//       <div className="space-y-4">
//         {data.map((item, index) => (
//           <div
//             key={item._id}
//             className="border-r-2 border-l-2 border-[#ff0000] shadow"
//           >
//             <div
//               className="bg-gray-200 p-1 cursor-pointer"
//               onClick={() => handleAccordionToggle(index)}
//             >
//               <h3 className="sm:text-xl text-lg font-semibold ">
//                 {item.subject}
//                 <span className="ms-1 text-[#ff0000] text-xs">
//                   ({item.language})
//                 </span>
//               </h3>
//             </div>
//             {activeIndex === index && (
//               <div className="p-1">
//                 <div className="flex justify-between items-center py-2">
//                   <span className="font-medium bg-[#ff0000] text-white px-1 text-sm">
//                     {item.Volume}
//                   </span>
//                   <button
//                     onClick={() =>
//                       handleDownloadClick(
//                         item.file,
//                         item.subject,
//                         item.className
//                       )
//                     }
//                     className="text-blue-600 hover:underline flex items-center"
//                   >
//                     📄 Download PDF
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
//           <div className="relative bg-white p-6 rounded-lg shadow-2xl w-96 border border-gray-300">
//             {/* Layered Card Effect */}
//             <div className="absolute -top-2 -left-2 w-full h-full bg-[#ff0000]  rounded-lg shadow-md border border-red-300 -z-10"></div>
//             <div className="absolute top-2 left-2 w-full h-full bg-[#ff0000] rounded-lg shadow-md border border-red-300 -z-20"></div>

//             <div className="flex flex-col justify-center items-center">
//               <img
//                 src={fagglogo}
//                 className="sm:w-[13vw] sm:h-[13vw] w-[14vw] h-[14vw] max-w-24 max-h-24 object-fill bg-white rounded-full p-2 border-2 border-[#ff0000] shadow-md"
//               />
//               <h3 className="text-lg font-semibold mb-2 text-center">
//                 Enter Contact Number or Student ID
//               </h3>
//             </div>

//             <input
//               type="text"
//               placeholder="Enter Student ID or Contact Number"
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               className="border p-2 w-full mb-4 border-[#ff0000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff0000] shadow-sm"
//             />

//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded shadow-md hover:bg-gray-600 transition-all"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleModalSubmit}
//                 className="px-4 py-2 bg-[#ff0000] text-white rounded shadow-md hover:bg-red-700 transition-all"
//               >
//                 Submit & Download
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Econtent10th

import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryApi";
import fagglogo from "../../../public/eg-logo.png";
import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const Econtent10th = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [userInput, setUserInput] = useState("");
  const [activeSubject, setActiveSubject] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    setSelectedLanguage("Hindi");

    axios
      .get(`${SummaryApi.Ebooks.url}?className=10`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching eBooks:", error);
      });
  }, []);

  const handleSubjectClick = (subject) => {
    setActiveSubject(subject);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setActiveSubject(null);
  };

  const filteredData = data.filter(
    (item) => item.language === selectedLanguage && item.isActive
  );

  const groupedSubjects = filteredData.reduce((acc, item) => {
    if (!acc[item.subject]) {
      acc[item.subject] = [];
    }
    acc[item.subject].push(item);
    return acc;
  }, {});

  const handleDownloadClick = (fileUrl, subject, className, isActive) => {
    if (!isActive) {
      alert("This file is currently deactivated.");
      return;
    }
    setSelectedFile(fileUrl);
    setSelectedSubject(subject);
    setSelectedClass(className);
    setIsModalOpen(true);
  };

   const handleModalSubmit = () => {
     console.log(userInput, selectedClass, selectedSubject);
     if (userInput.trim()) {
       axios
         .post(SummaryApi.StoreUserDownload.url, {
           userInput,
           subject: selectedSubject,
           className: selectedClass,
         })
         .then((response) => {
           // If backend sends an error in a successful response
           if (response.data?.error) {
             alert("त्रुटि: " + response.data.error);
             return;
           }
   
           // Automatically trigger file download after successful submission
           const link = document.createElement("a");
           link.href = `${baseUrl}/${selectedFile}`;
           link.setAttribute("download", selectedFile.split("/").pop()); // Extract filename from URL
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
   
           setIsModalOpen(false);
           setUserInput("");
         })
         .catch((error) => {
           console.error("Error storing user input:", error);
   
           // Ensure error message from backend is properly displayed
           if (error.response && error.response.data) {
             let errorMessage = error.response.data.message || "कुछ गलत हो गया। कृपया पुनः प्रयास करें।";
   
             // Translating common error messages
             if (errorMessage.includes("User not found")) {
               errorMessage = "उपयोगकर्ता नहीं मिला। कृपया पहले पंजीकरण करें।";
             } else if (errorMessage.includes("Invalid credentials")) {
               errorMessage = "अमान्य विवरण। कृपया सही जानकारी दर्ज करें।";
             }
   
             alert(errorMessage);
           } else {
             alert("कुछ गलत हो गया। कृपया पुनः प्रयास करें।");
           }
         });
     } else {
       alert("कृपया अपना छात्र आईडी या संपर्क नंबर दर्ज करें।");
     }
   };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">कक्षा 10वीं के लिए ई-पुस्तकें</h2>
      <div className="flex flex-col sm:flex-row p-4 bg-gray-50 min-h-screen">
        {/* Sidebar */}
        <div className="sm:w-1/4 w-full bg-white shadow-md rounded-md p-4 border-l-4 border-[#fd645b]">
          <h2 className="text-2xl font-bold text-[#fd645b] mb-4 border-b-2 border-[#fd645b] pb-2 text-center uppercase">
            विषय
          </h2>
          <div className="flex-1 mb-4">
            <label className="font-semibold"> भाषा चुने :</label>
            <select
              name="language"
              className="border p-2 w-full rounded focus:ring-2 focus:ring-[#fe0000]"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="">भाषा चुने</option>
              <option value="English">अंग्रेजी</option>
              <option value="Hindi">हिंदी</option>
            </select>
          </div>
          <ul className="space-y-3">
            {Object.keys(groupedSubjects).map((subjectName) => (
              <li
                key={subjectName}
                className={`cursor-pointer text-black font-semibold px-4 py-2 border-l-4 hover:border-[#fd645b] transition-all hover:bg-[#fd635b5d]  duration-200 ${
                  activeSubject === groupedSubjects[subjectName]
                    ? "border-[#fd645b]"
                    : "border-transparent"
                }`}
                onClick={() => handleSubjectClick(groupedSubjects[subjectName])}
              >
                {subjectName}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="sm:w-3/4 w-full p-6">
          {activeSubject && (
            <div className="bg-white shadow-md rounded-md p-6">
              <h3 className="text-2xl font-bold text-[#fd645b] mb-4">
                {activeSubject[0].subject} ({activeSubject[0].language})
              </h3>
              <table className="w-full border-collapse rounded-md overflow-hidden">
                <thead>
                  <tr className="bg-[#fd645b] text-white">
                    <th className="p-3">खंड</th>
                    <th className="p-3">पुस्तकें</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSubject.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-3 text-center">{item.Volume}</td>

                      <td className="p-3 text-center">
                        <button
                          onClick={() =>
                            handleDownloadClick(
                              item.file,
                              item.subject,
                              item.className,
                              item.isActive
                            )
                          }
                          className="text-blue-600 hover:underline"
                        >
                          📄 Download Book
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="relative bg-white p-6 rounded-lg shadow-2xl w-96 border border-gray-300">
            {/* Layered Card Effect */}
            <div className="absolute -top-2 -left-2 w-full h-full bg-[#ff0000]  rounded-lg shadow-md border border-red-300 -z-10"></div>
            <div className="absolute top-2 left-2 w-full h-full bg-[#ff0000] rounded-lg shadow-md border border-red-300 -z-20"></div>

            <div className="flex flex-col justify-center items-center">
              <img
                src={fagglogo}
                className="sm:w-[13vw] sm:h-[13vw] w-[14vw] h-[14vw] max-w-24 max-h-24 object-fill bg-white rounded-full p-2 border-2 border-[#ff0000] shadow-md"
              />
              <h3 className="text-lg font-semibold mb-2 text-center">
              अपना संपर्क नंबर या लर्नर आईडी दर्ज करें
              </h3>
            </div>

            <input
              type="text"
              placeholder="Enter Student ID or Contact Number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="border p-2 w-full mb-4 border-[#ff0000] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff0000] shadow-sm"
            />
<p className="text-sm text-gray-600 text-center mb-4">
      यदि आप पंजीकृत नहीं है तो <Link to="/register" className="text-[#ff0000] font-semibold hover:underline">यहाँ क्लिक करें</Link>
    </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded shadow-md hover:bg-gray-600 transition-all"
              >
                     रद्द करें 
              </button>
              <button
                onClick={handleModalSubmit}
                className="px-4 py-2 bg-[#ff0000] text-white rounded shadow-md hover:bg-red-700 transition-all"
              >
                जमा करें & डाउनलोड
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Econtent10th;
