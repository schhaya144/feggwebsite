import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
const CourseDetails = () => {
  const CourseRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const footerSections = CourseRef.current.querySelectorAll('.Course-section')

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
  const courses = [
    {
      code: 201,
      subject: 'हिन्दी',
      papers: 1,
      totalMarks: 100,
      passMarks: 33,
      duration: 3,
    },
    {
      code: 202,
      subject: 'अंग्रेजी',
      papers: 1,
      totalMarks: 100,
      passMarks: 33,
      duration: 3,
    },
    {
      code: 204,
      subject: 'मराठी',
      papers: 1,
      totalMarks: 100,
      passMarks: 33,
      duration: 3,
    },
    {
      code: 206,
      subject: 'उर्दू',
      papers: 1,
      totalMarks: 100,
      passMarks: 33,
      duration: 3,
    },
    {
      code: 209,
      subject: 'संस्कृत',
      papers: 1,
      totalMarks: 100,
      passMarks: 33,
      duration: 3,
    },
    {
      code: 211,
      subject: 'गणित',
      papers: 1,
      totalMarks: 100,
      passMarks: 33,
      duration: 3,
    },
    {
      code: 212,
      subject: 'विज्ञान',
      papers: 2,
      totalMarks: 100,
      passMarks: 33,
      duration: 3,
    },
    {
      code: 213,
      subject: 'सामाजिक विज्ञान',
      papers: 1,
      totalMarks: 100,
      passMarks: 33,
      duration: 3,
    },
    {
      code: 214,
      subject: 'अर्थशास्त्र',
      papers: 1,
      totalMarks: 100,
      passMarks: 33,
      duration: 3,
    },
    {
      code: 215,
      subject: 'व्यावसायिक अध्ययन (वाणिज्य)',
      papers: 1,
      totalMarks: 100,
      passMarks: 33,
      duration: 3,
    },
    {
      code: 216,
      subject: 'गृह विज्ञान',
      papers: 2,
      totalMarks: 100,
      passMarks: 33,
      duration: 3,
    },
    {
      code: 223,
      subject: 'भारतीय संस्कृति',
      papers: 1,
      totalMarks: 100,
      passMarks: 33,
      duration: 3,
    },
    {
      code: 249,
      subject: 'उद्यमिता',
      papers: 2,
      totalMarks: 100,
      passMarks: 34,
      duration: '2-3',
    },
  ]

  return (
    <div ref={CourseRef} className="p-7 bg-[#00043c] text-white">
      <h2 className="text-2xl sm:text-4xl font-bold mb-4 mt-5 text-center Course-section">
        हाईस्कूल हेतु विषय
      </h2>
      <table className="w-full border border-collapse border-gray-400 Course-section">
        <thead>
          <tr className=" bg-[#fd645b] text-white">
            <th className="border p-2">कोड</th>
            <th className="border p-2">विषय</th>
            <th className="border p-2">प्रश्न पत्र संख्या</th>
            <th className="border p-2">पूर्णांक</th>
            <th className="border p-2">उत्तीर्णांक</th>
            <th className="border p-2">समयावधि (घंटे)</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{course.code}</td>
              <td className="border p-2">{course.subject}</td>
              <td className="border p-2">{course.papers}</td>
              <td className="border p-2">{course.totalMarks}</td>
              <td className="border p-2">{course.passMarks}</td>
              <td className="border p-2">{course.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CourseDetails
