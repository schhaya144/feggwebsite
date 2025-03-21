import React from 'react'

const FeeStructureTable = () => {
  const feeData = [
    {
      subject: 'एक विषय',
      highSchool: '₹605.00',
      highSchoolBPL: '₹415.00',
      higherSecondary: '₹730.00',
      higherSecondaryBPL: '₹500.00',
    },
    {
      subject: 'दो विषय',
      highSchool: '₹1210.00',
      highSchoolBPL: '₹835.00',
      higherSecondary: '₹1460.00',
      higherSecondaryBPL: '₹960.00',
    },
    {
      subject: 'तीन विषय',
      highSchool: '₹1500.00',
      highSchoolBPL: '₹1010.00',
      higherSecondary: '₹1710.00',
      higherSecondaryBPL: '₹1110.00',
    },
    {
      subject: 'चार विषय',
      highSchool: '₹1760.00',
      highSchoolBPL: '₹1160.00',
      higherSecondary: '₹1960.00',
      higherSecondaryBPL: '₹1260.00',
    },
    {
      subject: 'पाँच विषय',
      highSchool: '₹2010.00',
      highSchoolBPL: '₹1310.00',
      higherSecondary: '₹2210.00',
      higherSecondaryBPL: '₹1410.00',
    },
    {
      subject: 'छह विषय',
      highSchool: '₹2060.00',
      highSchoolBPL: '₹1360.00',
      higherSecondary: '------',
      higherSecondaryBPL: '------',
    },
  ]

  return (
    <div className=" rounded-lg">
      <h3 className="text-lg sm:text-2xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#fd645b] pt-1 py-1 w-full">
        शुल्क संरचना तालिका (कक्षा 10वीं)
      </h3>
      <p className="text-center mb-5">
        एम.पी. राज्य मुक्त विद्यालय द्वारा संचालित विभिन्न पाठ्यक्रमों की शुल्क
        संरचना तालिका में दर्शाई गई है। प्रवेश पंजीकरण हेतु आवेदन निर्दिष्ट
        कियोस्क के माध्यम से जमा किया जाना चाहिए। यदि शुल्क आंशिक रूप से या
        बिल्कुल भी जमा नहीं किया जाता है, तो प्रवेश आवेदन अमान्य और अस्वीकृत
        माना जाएगा। वर्तमान प्रणाली के अनुसार, ओपन स्कूल (पारंपरिक) में प्रवेश
        के लिए ऑनलाइन आवेदन पत्र भरना होगा और शुल्क अधिकृत एआईएसईसीटी ऑनलाइन
        कियोस्क के माध्यम से जमा करना होगा। भुगतान की जाने वाली पूर्ण शुल्क राशि
        नीचे दी गई तालिका में प्रदान की गई है। आवेदन करते समय, सुनिश्चित करें कि
        सभी जानकारी सही ढंग से भरी गई है, विवरण ध्यानपूर्वक पढ़ें और फॉर्म पर
        हस्ताक्षर करें।
      </p>
      <table className="w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">विषय</th>
            <th className="border border-gray-300 px-4 py-2">
              हाई स्कूल (सामान्य)
            </th>
            <th className="border border-gray-300 px-4 py-2">
              बीपीएल/एससी/एसटी/महिला/40%+ विकलांग (हाई स्कूल)
            </th>
            <th className="border border-gray-300 px-4 py-2">
              हायर सेकेंडरी (सामान्य)
            </th>
            <th className="border border-gray-300 px-4 py-2">
              बीपीएल/एससी/एसटी/महिला/40%+ विकलांग (हायर सेकेंडरी)
            </th>
          </tr>
        </thead>
        <tbody>
          {feeData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                {item.subject}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.highSchool}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.highSchoolBPL}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.higherSecondary}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.higherSecondaryBPL}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FeeStructureTable
