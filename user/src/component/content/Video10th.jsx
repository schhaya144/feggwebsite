import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryApi";
import fagglogo from "../../../public/eg-logo.png";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const Video10th = () => {
  const [data, setData] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    axios
      .get(`${SummaryApi.getuploadvideo.url}?className=10`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  const handleSubjectClick = (subject) => {
    setActiveSubject(subject);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setActiveSubject(null);
  };

  const handleVideoClick = (videoLink, subject, className, isActive) => {
    if (!isActive) {
      alert("This file is currently deactivated.");
      return;
    }
    setSelectedVideo(videoLink);
    setSelectedSubject(subject);
    setSelectedClass(className); // Ensure className is set
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
        .then(() => {
          window.open(selectedVideo, "_blank");
          setIsModalOpen(false);
          setUserInput("");
        })
        .catch((error) => {
          console.error("Error storing user input:", error);
          
          // Display error in Hindi
          if (error.response && error.response.data && error.response.data.message) {
            let errorMessage = error.response.data.message;
            
            // Translate known error messages to Hindi
            if (errorMessage === "User not found. Please register first.") {
              errorMessage = "यूज़र नहीं मिला। कृपया पहले रजिस्टर करें।";
            } else if (errorMessage === "Invalid ID or Contact Number") {
              errorMessage = "अमान्य आईडी या संपर्क नंबर।";
            } else {
              errorMessage = "कुछ गलत हो गया, कृपया पुनः प्रयास करें।";
            }
  
            alert(errorMessage);
          } else {
            alert("कुछ गलत हो गया, कृपया पुनः प्रयास करें।");
          }
        });
    } else {
      alert("कृपया अपना छात्र आईडी या संपर्क नंबर दर्ज करें।");
    }
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

  return (
    <div className="flex flex-col sm:flex-row p-4 bg-gray-50 min-h-screen">
      <div className="sm:w-1/4 w-full bg-white shadow-md rounded-md p-4 border-l-4 border-[#fd645b]">
        <h2 className="text-2xl font-bold text-[#fd645b] mb-4 border-b-2 border-[#fd645b] pb-2 text-center uppercase">
          विषय
        </h2>
        <div className="flex-1 mb-4">
          <label className="font-semibold">भाषा चुने:</label>
          <select
            name="language"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-[#fe0000]"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="English">अंग्रेजी</option>
            <option value="Hindi">हिंदी</option>
          </select>
        </div>
        <ul className="space-y-3">
          {Object.keys(groupedSubjects).map((subjectName) => (
            <li
              key={subjectName}
              className={`cursor-pointer text-black font-semibold px-4 py-2 border-l-4 hover:border-[#fd645b] hover:bg-[#fd635b5d] transition-all duration-200 ${
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

      <div className="sm:w-3/4 w-full p-6">
        {activeSubject && (
          <div className="shadow-md rounded-md p-6">
            <h3 className="text-2xl font-bold text-[#fd645b] mb-4">
              {activeSubject[0].subject} ({activeSubject[0].language})
            </h3>
            <table className="w-full border-collapse rounded-md overflow-hidden">
              <thead>
                <tr className="bg-[#fd645b] text-white">
                  <th className="p-3">अध्याय संख्या</th>
                  <th className="p-3">अध्याय</th>
                  <th className="p-3">वीडियो लिंक</th>
                </tr>
              </thead>
              <tbody>
                {activeSubject.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3 text-center">{item.chapterName}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() =>
                          handleVideoClick(
                            item.youtubeLink,
                            item.subject,
                            item.className,
                            item.isActive
                          )
                        }
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Watch Video
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="relative bg-white p-6 rounded-lg shadow-2xl w-96 border border-gray-300">
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
                  जमा करें & देखें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video10th;
