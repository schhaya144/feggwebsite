import React, { useEffect, useRef } from 'react'
import mpsoLogo from '../../../src/assets/mpsoslogo.png'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const MpsosTeam = () => {
  const footerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const footerSections = footerRef.current.querySelectorAll('.MPSOS-section')

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
    <div ref={footerRef} className="flex flex-col justify-center items-center px-4 sm:px-8">
      <div className="p-6 sm:px-20 px-10 bg-gray-100 rounded-lg shadow-md shadow-[#fd645b] sm:mx-40 sm:my-10 flex justify-center flex-col items-center MPSOS-section w-full">
        <img
          src={mpsoLogo}
          alt="MPSOS Logo"
          className="w-30 h-32 mb-4 sm:me-0 me-8 rounded-full object-cover"
        />
       

        <h2 className="text-2xl font-bold text-center mt-6 mb-4">
          संचालन समिति
        </h2>
        <div className="flex flex-col items-center w-full">
          <div className="text-center mb-6">
            <strong>श्री प्रभात राज तिवारी</strong>
            <br />
            संचालक
            <br />
            म.प्र. राज्य मुक्त स्कूल शिक्षा बोर्ड
          </div>
          <div className="flex justify-between w-full">
            <div className="text-left">
              <strong>श्रीमती संचिता जैन</strong>
              <br />
              <strong>श्री फारूख शेख</strong>
            </div>
            <div className="text-right">
              <strong>श्री राम वैद्य</strong>
              <br />
              सहायक संचालक
              <br />
              <strong>श्री सचिचदानंद प्रसाद</strong>
              <br />
              सहायक संचालक
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MpsosTeam
