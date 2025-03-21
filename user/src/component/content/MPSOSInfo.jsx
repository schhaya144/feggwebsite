import React, { useEffect, useRef } from 'react'
import mpsoLogo from '../../../src/assets/mpsoslogo.png'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const MPSOSInfo = () => {
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
    <div>
      <div
        ref={footerRef}
        className="flex flex-col justify-center items-center w-full px-4 sm:px-10"
      >
        <div className="p-6 sm:px-20 px-10 bg-gray-100 rounded-lg shadow-md shadow-[#fd645b] sm:mx-40 sm:my-10 flex flex-col items-center MPSOS-section w-full">
          <img
            src={mpsoLogo}
            alt="MPSOS Logo"
            className="w-32 h-32 mb-4 rounded-full object-cover"
          />
          <h2 className="text-2xl font-bold text-center mb-4">
            म.प्र. राज्य मुक्त स्कूल शिक्षा बोर्ड के बारे में
          </h2>
          <p className="text-gray-700 leading-relaxed text-center">
            मध्य प्रदेश में सबके लिए शिक्षा के लक्ष्य की प्राप्ति हेतु वैकल्पिक
            शिक्षा की आवश्यकता को दृष्टिगत रखते हुए मध्य प्रदेश में राष्ट्रीय
            मुक्त विद्यालयी शिक्षा संस्थान, नई दिल्ली के अनुरूप म.प्र. राज्य
            मुक्त स्कूल शिक्षा बोर्ड की स्थापना मंत्रिपरिषद के निर्णय दिनांक{' '}
            <strong className="text-[#fd645b]">29/03/1995</strong> के फलस्वरूप
            की गई। यह संस्था अगस्त{' '}
            <strong className="text-[#fd645b]">1995</strong> से स्वायत्तशासी
            संस्था के रूप में पंजीकृत समिति के रूप में कार्य कर रही है।
          </p>
        </div>
      </div>
      <div
        ref={footerRef}
        className="flex flex-col justify-center items-center w-full px-4 sm:px-10"
      >
        <div className="p-6 sm:px-20 px-10 bg-gray-100 rounded-lg shadow-md shadow-[#fd645b] sm:mx-40 sm:my-10 flex flex-col items-center MPSOS-section w-full">
          <h2 className="text-2xl font-bold text-center mt-6 mb-4">
            स्टीयरिंग कमेटी
          </h2>
          <div className="w-full flex flex-col items-center">
            <div className="text-center mb-6">
              <strong>श्री प्रभात राज तिवारी</strong>
              <br />
              संचालक
              <br />
              म.प्र. राज्य मुक्त स्कूल शिक्षा बोर्ड
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-center">
              <div>
                <strong>श्री राम वैद्य</strong>
                <br />
                सहायक संचालक
              </div>
              <div>
                <strong>श्रीमती संचिता जैन</strong>
                <br />
                सहायक संचालक
              </div>
              <div>
                <strong>श्री सचिचदानंद प्रसाद</strong>
                <br />
                सहायक संचालक
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MPSOSInfo
