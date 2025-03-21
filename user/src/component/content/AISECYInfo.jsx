import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import AISECTlogo from '../../assets/aisect-logo.png'
const AISECTInfo = () => {
  const AISECTInfoRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const footerSections = AISECTInfoRef.current.querySelectorAll(
      '.AISECTInfo-section'
    )

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
    <div ref={AISECTInfoRef} className="sm:px-10 px-8">
      <h2 className="text-2xl sm:text-4xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#fd645b] pt-2 pb-1 w-full">
        AISECT के बारे में
      </h2>{' '}
      <div className="rounded-xl max-w-2xl mx-auto text-center pb-10 sm:pb-10 AISECTInfo-section flex justify-center items-center flex-col">
        <div className="p-6 sm:px-20 px-10 bg-gray-100 rounded-lg shadow-md shadow-[#fd645b] sm:mx-40 sm:my-10 flex flex-col items-center MPSOS-section w-full">
          <img
            src={AISECTlogo}
            alt="AISECT logo"
            className="sm:w-40 h-20 w-32 object-fill mb-6"
          />
          <p className="text-black sm:text-lg text-base">
            AISECTonline.com भारत के अग्रणी ऑनलाइन सेवा नेटवर्क में से एक है। यह
            विभिन्न G2C (सरकार से नागरिक) और B2C (व्यवसाय से) ग्राहक सेवाओं का
            गुलदस्ता है। अपेक्षाकृत कम समय के दौरान{' '}
            <span className="text-[#fd645b] font-medium">
              aisectonline.com{' '}
            </span>
            ने ग्रामीण, अर्ध-शहरी और शहरी क्षेत्रों में भी गहरी पैठ बना ली है।
          </p>
          <p className=" sm:text-lg text-base mt-4">
            आज AISECTonline 28 राज्यों और 6 केंद्र शासित प्रदेशों में सेवाओं का
            एक बहुत व्यापक स्पेक्ट्रम प्रदान करता है।
          </p>
        </div>
      </div>
    </div>
  )
}

export default AISECTInfo
