import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
const feesData = [
  {
    subjects: 'एक विषय',
    highSchool: 605,
    highSchoolBPL: 415,
    higherSecondary: 730,
    higherSecondaryBPL: 500,
  },
  {
    subjects: 'दो विषय',
    highSchool: 1210,
    highSchoolBPL: 835,
    higherSecondary: 1460,
    higherSecondaryBPL: 960,
  },
  {
    subjects: 'तीन विषय',
    highSchool: 1500,
    highSchoolBPL: 1010,
    higherSecondary: 1710,
    higherSecondaryBPL: 1110,
  },
  {
    subjects: 'चार विषय',
    highSchool: 1760,
    highSchoolBPL: 1160,
    higherSecondary: 1960,
    higherSecondaryBPL: 1260,
  },
  {
    subjects: 'पांच विषय',
    highSchool: 2010,
    highSchoolBPL: 1310,
    higherSecondary: 2210,
    higherSecondaryBPL: 1410,
  },
  {
    subjects: 'छः विषय',
    highSchool: 2060,
    highSchoolBPL: 1360,
    higherSecondary: '-',
    higherSecondaryBPL: '-',
  },
]

const FeesDetails = () => {
  const feesRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const footerSections = feesRef.current.querySelectorAll('.feesRef-section')

    footerSections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'bottom 70%',
            toggleActions: 'play none none reverse',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
  return (
    <div ref={feesRef} className="bg-[#00043c]">
      {' '}
      <div className="container mx-auto p-4  text-white flex justify-center items-center flex-col py-12 feesRef-section">
        <h2 className="sm:text-4xl text-2xl font-bold mb-8 mt-3 text-center text-[#fd645b] underline-offset-4 underline">
          शुल्क विवरण
        </h2>
        <p className="mb-4 text-center sm:w-1/2">
          म.प्र. राज्य ओपन स्कूल द्वारा संचालित विभिन्न पाठ्यक्रमों के लिये
          निर्धारित शुल्क विवरण तालिका में दर्शाया गया है। प्रवेश पंजीयन हेतु
          निर्धारित कियोस्क के माध्यम से आवेदन करें। कम/बिना शुल्क भरे जाने की
          स्थिति में प्रवेश आवेदन पत्र अमान्य होकर निरस्त हो जावेंगे।
        </p>
        <p className="mb-4 text-center  sm:w-1/2">
          वर्तमान व्यवस्था अनुसार ओपन स्कूल (परम्परागत) में प्रवेश हेतु ऑनलाइन
          आवेदन पत्र भरकर शुल्क जमा कराने हेतु आईसेक्टऑनलाइन कियोस्क अधिकृत है।
          सम्पूर्ण शुल्क जो जमा की जाना है उसकी जानकारी नीचे तालिका में दिये गये
          विवरण अनुसारहै। आवेदन करते समय सम्पूर्ण जानकारी सही भरी है पढ़कर
          हस्ताक्षर करें
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#fd645b]">
            <thead>
              <tr className="bg-[#fd645b] text-white">
                <th className="border  px-4 py-2">विषय</th>
                <th className="border  sm:px-4 px-2 py-2 sm:text-base text-sm">
                  हाईस्कूल सामान्य
                </th>
                <th className="border  sm:px-4 px-2 py-2 sm:text-base text-sm">
                  बी.पी.एल./अनु. जाति/अ.ज.जा./महिला/40%+ विकलांग
                </th>
                <th className="border sm:px-4 px-3 py-2 sm:text-base text-sm">
                  हायर सेकण्डरी सामान्य
                </th>
                <th className="border  sm:px-4 px-2 py-2 sm:text-base text-sm">
                  बी.पी.एल./अनु. जाति/अ.ज.जा./महिला/40%+ विकलांग
                </th>
              </tr>
            </thead>
            <tbody>
              {feesData.map((row, index) => (
                <tr key={index} className="border">
                  <td className="border   px-4 py-2">{row.subjects}</td>
                  <td className="border  px-4 py-2">{row.highSchool} रू.</td>
                  <td className="border  px-4 py-2">{row.highSchoolBPL} रू.</td>
                  <td className="border  px-4 py-2">
                    {row.higherSecondary} रू.
                  </td>
                  <td className="border  px-4 py-2">
                    {row.higherSecondaryBPL} रू.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FeesDetails
