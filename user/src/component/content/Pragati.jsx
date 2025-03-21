// import React from "react";
// import img from "../../assets/pragati.jpg";

// const Pragati = () => {
//   return (
//     <div className="">
//       <div className="pragati-img relative">
//       <h3 className="absolute top-5 right-5 text-red-500 text-lg sm:text-2xl font-bold px-4 py-2 rounded-lg shadow-lg">
//           प्रगति
//         </h3>
//       </div>
//       <div className="p-5">
//         <div className="text-center py-4">
//           <h3 className="text-xl md:text-2xl font-bold text-red-400 pt-1  border-b-4 border-red-400 inline-block">
//             प्रगति कार्यक्रम कैसे कार्य करता है
//           </h3>
//         </div>
//         <div className="flex flex-col sm:flex-row justify-evenly items-center mt-8">
//           {/* Image Container with Layered Effect */}
//           <div className="relative w-60 sm:w-80 m-3">
//             {/* Background Layer */}
//             <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-full h-full bg-[#fd645b] rounded-lg -z-10"></div>
//             <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-full h-full bg-[#fd645b] rounded-lg -z-10"></div>

//             {/* Image with Border & Shadow */}
//             <img
//               src={img}
//               className="w-full object-fill rounded-lg shadow-lg border-4 border-white"
//             />
//           </div>

//           {/* Text Content */}
//           <div className="sm:m-3 flex justify-center items-start flex-col sm:w-[600px] sm:p-3 p-5 mt-7 text-sm sm:text-base  card">
//             <p className="mb-5">
//               भारत में 9 करोड़ युवा महिलाएँ (15-29 वर्ष) शिक्षा, रोजगार और
//               प्रशिक्षण (NEET - Not in Education, Employment & Training) दायरे
//               से बाहर हैं।। इसका मुख्य कारण कम उम्र में विवाह, मातृत्व, पलायन,
//               माध्यमिक विद्यालय तक पहुँच की कमी, शैक्षणिक बाधाएँ और गरीबी है।
//               इनमें से कई युवतियाँ अपने स्वास्थ्य, घरों और समुदायों के बारे में
//               सूचित निर्णय लेने के लिए आवश्यक स्वायत्तता से वंचित हैं, जो उन्हें
//               औपचारिक अर्थव्यवस्था से प्रभावी रूप से हाशिए पर डाल देता है। हम
//               प्रगति के माध्यम से इन युवतियों को अपनी 10वीं कक्षा की शिक्षा पूरी
//               करने में सहायता करने के साथ-साथ आगे की शिक्षा, रोजगार और कौशल
//               विकास के अवसरों का सृजन करने की आकांक्षा रखते हैं। हमारा लक्ष्य
//               किशोरीयों और युवतियों को सशक्त बनाना है, उन्हें अपनी पूरी क्षमता
//               का एहसास करने के लिए आवश्यक विकल्प और संसाधन प्रदान करना है।
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pragati;

import React from 'react'
import img from '../../assets/Nav-bar(Sub-menu) Images/कार्यक्रम/Pragati/Banner.png'
import bgImage from '../../assets/Nav-bar(Sub-menu) Images/कार्यक्रम/Pragati/Pragati-2.jpg' // Ensure this is the correct path

import bg2img from '../../assets/pragatibg.png'

const Pragati = () => {
  return (
    <div className="">
      {/* Header Section with Background Image */}
      <div className="relative">
        <div className="pragati-img flex items-center justify-start px-10 pt-16">
          {/* <div className="absolute top-10 right-10 text-red-600 text-3xl sm:text-5xl font-bold text-right">
          <h1 className="uppercase  pt-2 inline-block">
            प्रगति
          </h1>
          <p className="text-gray-100 border-t-4 border-red-600 py-3 text-sm sm:text-lg">
            किशोरियों और युवा महिलाओं के लिए <br />
            दूसरा मौका कार्यक्रम
          </p>
        </div> */}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:mx-12 mx-4 relative -mt-14 rounded-lg shadow-lg mb-8 z-10 bg-white">
        <div className="flex flex-col sm:flex-row justify-evenly items-center mt-8">
          {/* Image Container with Layered Effect */}
          <div className="relative w-60 sm:w-80 m-3">
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-full h-full bg-[#fd645b] rounded-lg -z-10"></div>
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-full h-full bg-[#fd645b] rounded-lg -z-10"></div>

            <img
              src={bgImage}
              className="w-full object-fill rounded-lg shadow-lg border-4 border-white"
              alt="Pragati Program"
            />
          </div>

          {/* Text Content */}
          <div className="sm:m-3 flex justify-center items-start flex-col sm:w-[600px] sm:p-3 p-5 mt-7 text-sm sm:text-base">
            <p className="mb-5 text-justify">
              भारत में 9 करोड़ युवा महिलाएँ (15-29 वर्ष) शिक्षा, रोजगार और
              प्रशिक्षण (NEET - Not in Education, Employment & Training) दायरे
              से बाहर हैं।। इसका मुख्य कारण कम उम्र में विवाह, मातृत्व, पलायन,
              माध्यमिक विद्यालय तक पहुँच की कमी, शैक्षणिक बाधाएँ और गरीबी है।
              इनमें से कई युवतियाँ अपने स्वास्थ्य, घरों और समुदायों के बारे में
              सूचित निर्णय लेने के लिए आवश्यक स्वायत्तता से वंचित हैं, जो उन्हें
              औपचारिक अर्थव्यवस्था से प्रभावी रूप से हाशिए पर डाल देता है। हम
              प्रगति के माध्यम से इन युवतियों को अपनी 10वीं कक्षा की शिक्षा पूरी
              करने में सहायता करने के साथ-साथ आगे की शिक्षा, रोजगार और कौशल
              विकास के अवसरों का सृजन करने की आकांक्षा रखते हैं। हमारा लक्ष्य
              किशोरीयों और युवतियों को सशक्त बनाना है, उन्हें अपनी पूरी क्षमता
              का एहसास करने के लिए आवश्यक विकल्प और संसाधन प्रदान करना है।
            </p>
          </div>
        </div>
      </div>
      <div className="p-12">
        <h1 className="flex justify-center sm:text-5xl text-3xl mb-8 font-semibold">
          प्रगति कार्यक्रम कैसे कार्य करता है ?
        </h1>
        <img
          src={bg2img}
          className="w-full object-fill rounded-lg shadow-lg border-4 border-white"
          alt="Pragati Program"
        />
      </div>
    </div>
  )
}

export default Pragati
