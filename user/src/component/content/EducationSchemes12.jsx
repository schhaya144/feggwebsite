import React from 'react'

const EducationSchemes = () => {
  const schemes = [
    {
      title: 'सामान्य योजनान्तर्गत',
      description:
        'मध्यप्रदेश या किसी अन्य मान्यता प्राप्त बोर्ड से उत्तीर्ण हाई स्कूल परीक्षा की प्रमाणित अंक सूची की प्रति।',
    },
    {
      title: 'पूर्ण क्रेडिट योजना',
      description:
        'दसवीं कक्षा की अंक सूची की प्रमाणित प्रति और बारहवीं कक्षा में अनुत्तीर्ण अंक सूची की मूल एवं प्रमाणित प्रति।',
    },
    {
      title: 'आंशिक क्रेडिट योजना',
      description:
        'शिक्षा बोर्ड द्वारा मान्यता प्राप्त बोर्ड से उत्तीर्ण बारहवीं कक्षा की प्रमाणित अंक सूची की प्रति।',
    },
    {
      title: 'अंक/ग्रेड सुधार योजना',
      description:
        'एमपी स्टेट ओपन स्कूल से उत्तीर्ण बारहवीं कक्षा की मूल अंक सूची।',
    },
    {
      title: 'पुनः प्रवेश योजना',
      description:
        'यदि 9 प्रयासों में भी उत्तीर्ण नहीं हुए हैं, तो परीक्षा में बैठने के लिए पुनः प्रवेश आवश्यक है।',
    },
    {
      title: 'रुको मत योजना',
      description:
        'एमपी बोर्ड, भोपाल द्वारा उसी सत्र में अनुत्तीर्ण घोषित छात्र की मूल अंक सूची।',
    },
    {
      title: 'सुविधा योजना',
      description:
        'सभी विषयों में उत्तीर्ण होने के बाद ही एमपी स्टेट ओपन स्कूल बोर्ड द्वारा बारहवीं की अंक सूची-कम-प्रमाण पत्र प्रदान किया जाएगा।',
    },
    {
      title: 'समकक्षता योजना',
      description:
        'जिन छात्रों ने आईटीआई के साथ दसवीं उत्तीर्ण की है, उन्हें एक भाषा और उद्यमिता विषय उत्तीर्ण करना होगा। उत्तीर्ण होने पर, उन्हें तीन आईटीआई विषयों का क्रेडिट दिया जाएगा और बारहवीं की अंक सूची प्रदान की जाएगी।',
    },
  ]

  const subjects = [
    {
      group: 'A (न्यूनतम एक, अधिकतम दो)',
      data: [
        {
          code: 301,
          subject: 'हिन्दी',
          papers: 1,
          totalMarks: 100,
          passingMarks: 33,
          duration: '3 घंटे',
        },
        {
          code: 302,
          subject: 'अंग्रेज़ी',
          papers: 1,
          totalMarks: 100,
          passingMarks: 33,
          duration: '3 घंटे',
        },
        {
          code: 309,
          subject: 'संस्कृत',
          papers: 1,
          totalMarks: 100,
          passingMarks: 33,
          duration: '3 घंटे',
        },
      ],
    },
    {
      group: 'B (न्यूनतम एक, अधिकतम दो)',
      data: [
        {
          code: 311,
          subject: 'गणित',
          papers: 1,
          totalMarks: 100,
          passingMarks: 33,
          duration: '3 घंटे',
        },
        {
          code: 321,
          subject: 'गृह विज्ञान (सिद्धांत एवं प्रयोगात्मक)',
          papers: 2,
          totalMarks: 100,
          passingMarks: 33,
          duration: '3 घंटे',
        },
        {
          code: 318,
          subject: 'अर्थशास्त्र',
          papers: 1,
          totalMarks: 100,
          passingMarks: 33,
          duration: '3 घंटे',
        },
      ],
    },
    {
      group: 'C (न्यूनतम एक, अधिकतम दो)',
      data: [
        {
          code: 312,
          subject: 'भौतिकी (सिद्धांत एवं प्रयोगात्मक)',
          papers: 2,
          totalMarks: 100,
          passingMarks: 33,
          duration: '3 घंटे',
        },
        {
          code: 315,
          subject: 'इतिहास',
          papers: 1,
          totalMarks: 100,
          passingMarks: 33,
          duration: '3 घंटे',
        },
        {
          code: 319,
          subject: 'व्यवसाय अध्ययन',
          papers: 1,
          totalMarks: 100,
          passingMarks: 33,
          duration: '3 घंटे',
        },
      ],
    },
  ]
  return (
    <div className="py-4  bg-gray-100 rounded-lg">
      <h3 className="text-lg sm:text-2xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#fd645b] pt-1 py-1 w-full mb-5">
        संचालित योजनाऐं
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">योजनाएँ </th>
              <th className="border border-gray-400 px-4 py-2">
                हायर सेकेण्डरी पाठ्यक्रम 12
              </th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((scheme, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-400 px-4 py-2">
                  {scheme.title}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {scheme.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 mt-5 bg-white shadow-md rounded-lg">
        <h3 className="text-lg sm:text-2xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#fd645b] pt-1 py-1 w-full mb-5">
          शुल्क कक्षा 12वीं विवरण तालिका
        </h3>
        <p className="mb-4 text-xs sm:text-base text-gray-700">
          म.प्र. राज्य ओपन स्कूल द्वारा संचालित विभिन्न पाठ्यक्रमों के लिये
          निर्धारित शुल्क विवरण तालिका में दर्शाया गया है। प्रवेश पंजीयन हेतु
          निर्धारित कियोस्क के माध्यम से आवेदन करें। कम/बिना शुल्क भरे जाने की
          स्थिति में प्रवेश आवेदन पत्र अमान्य होकर निरस्त हो जावेंगे।
        </p>
        <p className="mb-4 text-xs sm:text-base text-gray-600">
          वर्तमान व्यवस्था अनुसार ओपन स्कूल (परम्परागत) में प्रवेश हेतु ऑनलाइन
          आवेदन पत्र भरकर शुल्क जमा कराने हेतु आईसेक्टऑनलाइन कियोस्क अधिकृत है।
          सम्पूर्ण शुल्क जो जमा की जाना है उसकी जानकारी नीचे तालिका में दिये गये
          विवरण अनुसारहै। आवेदन करते समय सम्पूर्ण जानकारी सही भरी है पढ़कर
          हस्ताक्षर करें
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 mb-6 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">विषय</th>
                <th className="border border-gray-300 p-2 text-center">
                  हाईस्कूल सामान्य
                </th>
                <th className="border border-gray-300 p-2 text-center">
                  बी.पी.एल.कार्डधारी, अनु. जाति/अ.ज.जा. महिला एवं 40% या अधिक
                  विकलांग
                </th>
                <th className="border border-gray-300 p-2 text-center">
                  हायर सेकण्डरी सामान्य
                </th>
                <th className="border border-gray-300 p-2 text-center">
                  बी.पी.एल.कार्डधारी, अनु. जाति/अ.ज.जा. महिला एवं 40% या अधिक
                  विकलांग
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ['One Subject', '₹605', '₹415', '₹730', '₹500'],
                ['Two Subjects', '₹1210', '₹835', '₹1460', '₹960'],
                ['Three Subjects', '₹1500', '₹1010', '₹1710', '₹1110'],
                ['Four Subjects', '₹1760', '₹1160', '₹1960', '₹1260'],
                ['Five Subjects', '₹2010', '₹1310', '₹2210', '₹1410'],
                ['Six Subjects', '₹2060', '₹1360', '---', '---'],
              ].map((row, index) => (
                <tr key={index} className="text-center hover:bg-gray-50">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-gray-300 p-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="container py-4">
          <h3 className="text-lg sm:text-2xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#fd645b] pt-1 py-1 w-full mb-5">
            हायर सेकण्डरी हेतु विषय
          </h3>
          {subjects.map((group, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-3 bg-gray-200 p-3 rounded">
                {group.group}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 md:p-3">कोड</th>
                      <th className="border border-gray-300 p-2 md:p-3">
                        विषय
                      </th>
                      <th className="border border-gray-300 p-2 md:p-3">
                        प्रश्न पत्र संख्या
                      </th>
                      <th className="border border-gray-300 p-2 md:p-3">
                        पूर्णांक
                      </th>
                      <th className="border border-gray-300 p-2 md:p-3">
                        उत्तीर्णांक
                      </th>
                      <th className="border border-gray-300 p-2 md:p-3">
                        समयावधि (घंटे)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.data.map((subject, subIndex) => (
                      <tr
                        key={subIndex}
                        className="text-center hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 p-2 md:p-3">
                          {subject.code}
                        </td>
                        <td className="border border-gray-300 p-2 md:p-3">
                          {subject.subject}
                        </td>
                        <td className="border border-gray-300 p-2 md:p-3">
                          {subject.papers}
                        </td>
                        <td className="border border-gray-300 p-2 md:p-3">
                          {subject.totalMarks}
                        </td>
                        <td className="border border-gray-300 p-2 md:p-3">
                          {subject.passingMarks}
                        </td>
                        <td className="border border-gray-300 p-2 md:p-3">
                          {subject.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EducationSchemes
