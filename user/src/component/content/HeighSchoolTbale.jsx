import React from 'react'

const HighSchoolSubjectsTable = () => {
  const subjects = [
    {
      code: '201',
      subject: 'हिंदी',
      papers: '1',
      totalMarks: '100',
      passingMarks: '33',
      duration: '3',
    },
    {
      code: '202',
      subject: 'अंग्रेज़ी',
      papers: '1',
      totalMarks: '100',
      passingMarks: '33',
      duration: '3',
    },
    {
      code: '204',
      subject: 'मराठी',
      papers: '1',
      totalMarks: '100',
      passingMarks: '33',
      duration: '3',
    },
    {
      code: '206',
      subject: 'उर्दू',
      papers: '1',
      totalMarks: '100',
      passingMarks: '33',
      duration: '3',
    },
    {
      code: '209',
      subject: 'संस्कृत',
      papers: '1',
      totalMarks: '100',
      passingMarks: '33',
      duration: '3',
    },
    {
      code: '211',
      subject: 'गणित',
      papers: '1',
      totalMarks: '100',
      passingMarks: '33',
      duration: '3',
    },
    {
      code: '212',
      subject: 'विज्ञान (सिद्धांत)',
      papers: '1',
      totalMarks: '75',
      passingMarks: '25',
      duration: '3',
    },
    {
      code: '212',
      subject: 'विज्ञान (प्रायोगिक)',
      papers: '1',
      totalMarks: '25',
      passingMarks: '08',
      duration: '-',
    },
    {
      code: '213',
      subject: 'सामाजिक विज्ञान',
      papers: '1',
      totalMarks: '100',
      passingMarks: '33',
      duration: '3',
    },
    {
      code: '214',
      subject: 'अर्थशास्त्र',
      papers: '1',
      totalMarks: '100',
      passingMarks: '33',
      duration: '3',
    },
    {
      code: '215',
      subject: 'व्यवसाय अध्ययन',
      papers: '1',
      totalMarks: '100',
      passingMarks: '33',
      duration: '3',
    },
    {
      code: '216',
      subject: 'गृह विज्ञान (सिद्धांत)',
      papers: '1',
      totalMarks: '75',
      passingMarks: '25',
      duration: '3',
    },
    {
      code: '216',
      subject: 'गृह विज्ञान (प्रायोगिक)',
      papers: '1',
      totalMarks: '25',
      passingMarks: '08',
      duration: '-',
    },
    {
      code: '223',
      subject: 'भारतीय संस्कृति',
      papers: '1',
      totalMarks: '100',
      passingMarks: '33',
      duration: '3',
    },
    {
      code: '249',
      subject: 'उद्यमिता (सिद्धांत)',
      papers: '1',
      totalMarks: '40',
      passingMarks: '14',
      duration: '2',
    },
    {
      code: '249',
      subject: 'उद्यमिता (प्रायोगिक)',
      papers: '1',
      totalMarks: '60',
      passingMarks: '20',
      duration: '3',
    },
  ]

  return (
    <div className=" rounded-lg ">
      <h3 className="text-lg sm:text-2xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#fd645b] pt-1 py-1 w-full">
        हाई स्कूल विषय विवरण
      </h3>
      <table className="w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">कोड</th>
            <th className="border border-gray-300 px-4 py-2">विषय</th>
            <th className="border border-gray-300 px-4 py-2">
              प्रश्न पत्र संख्या
            </th>
            <th className="border border-gray-300 px-4 py-2">कुल अंक</th>
            <th className="border border-gray-300 px-4 py-2">उत्तीर्ण अंक</th>
            <th className="border border-gray-300 px-4 py-2">अवधि (घंटे)</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                {item.code}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.subject}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.papers}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.totalMarks}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.passingMarks}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HighSchoolSubjectsTable
