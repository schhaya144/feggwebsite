import hero from '../../assets/hero.png'
import vision from '../../assets/उद्देश्य.png'
import mission from '../../assets/लक्ष्य.jpg'
import हमारासफ़र from '../../assets/हमारासफ़र.webp'
import परिकल्पना from '../../assets/परिकल्पना.jpg'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AboutIntro = () => {
  const heroImageRef = useRef(null)
  const textSectionRef = useRef(null)
  const historySectionRef = useRef(null)
  const visionSectionRef = useRef(null)
  const missionSectionRef = useRef(null)
  const objectiveSectionRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      heroImageRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo(
      textSectionRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textSectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  // Scroll to section when the page loads
  useEffect(() => {
    const { hash } = window.location
    if (hash) {
      const targetId = hash.replace('#', '')
      const element = document.getElementById(decodeURIComponent(targetId))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 500) // Small delay to ensure page is loaded before scrolling
      }
    }
  }, [])

  return (
    <div className="bg-gray-50 relative">
      <img src={hero} alt="इतिहास" className="object-cover w-full h-screen" />
      <div className="bg-white mx-4 sm:mx-10 relative -mt-16 rounded-lg shadow-lg mb-8">
        <div className="container px-4 md:px-8 lg:px-16 py-12">
          <div className="text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-red-400">
              होम
            </a>{' '}
            &gt; हमारे बारे में
          </div>

          <h1
            className="text-center text-xl md:text-2xl font-bold text-red-400 mb-8"
            ref={textSectionRef}
          >
            एजुकेट गर्ल्स के बारे में
          </h1>

          <div className="mb-12" ref={textSectionRef}>
           
            <p className="text-gray-600">
              एजुकेट गर्ल्स एक गैर-लाभकारी संस्था है जो लड़कियों की शिक्षा के लिए
              भारत के ग्रामीण और शैक्षिक रूप से कमजोर समुदाय को जागरूक और सशक्त
              करती हैं । 'शिक्षा का अधिकार अधिनियम' और 'समग्र शिक्षा अभियान' के
              विज़न अनुरूप, एजुकेट गर्ल्स बच्चों विशेषकर बालिकाओं को
              गुणवत्तापूर्ण प्राथमिक शिक्षा प्रदान करने हेतु प्रयासरत हैं ।
            </p>
          </div>

          <div
            className="flex bg-gray-50 shadow-lg mb-12"
            ref={historySectionRef}
          >
            <img
              src={हमारासफ़र}
              alt="इतिहास"
              className="w-1/3 rounded-md object-cover"
            />
            <div className="w-2/3 pl-6">
              <h3 className="text-xl font-semibold text-gray-800 p-6 mb-4">
                हमारा सफ़र
              </h3>
              <p className="text-gray-600">
                2007 से, राज्य सरकारों के साथ साझेदारी में, एजुकेट गर्ल्स ने
                राजस्थान, मध्य प्रदेश, उत्तर प्रदेश और बिहार के 29,000 से अधिक
                गांवों में स्कूल नामांकन के लिए 18 लाख से अधिक लड़कियों को
                प्रेरित किया है।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="vm">
            <div
              className="flex flex-col border rounded-md"
              ref={visionSectionRef}
              id="लक्ष्य"
            >
              <img
                src={mission}
                alt="दृष्टि"
                className="rounded-md object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4 ps-2">
                विज़न
              </h3>
              <p className="text-gray-600 p-2">
                एजुकेट गर्ल्स, भारत की सभी लड़कियों के लिए व्यवहारिक, सामाजिक और
                आर्थिक परिवर्तन लाना चाहती है, जिससे एक ऐसा भारत बने जहाँ सभी
                बच्चों को गुणवत्तापूर्ण शिक्षा प्राप्त करने के समान अवसर मिलें।।
              </p>
            </div>

            <div
              className="flex flex-col border rounded-md"
              ref={missionSectionRef}
              id="उद्देश्य"
            >
              <img
                src={vision}
                alt="मिशन"
                className="rounded-md object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4 ps-2">
                मिशन
              </h3>
              <p className="text-gray-600 p-2">
                एजुकेट गर्ल्स, मौजूदा समुदाय और सरकारी संसाधनों का उपयोग करती
                है, जिससे यह सुनिश्चित किया जा सके कि सभी लड़कियाँ स्कूल से जुड़े
                और अच्छी तरह से सीखें ।
              </p>
            </div>
          </div>
          <div
            className="flex bg-gray-50 shadow-lg mt-12"
            ref={historySectionRef}
            id="परिकल्पना"
          >
            <div className="w-2/3 pl-6">
              <h3 className="text-xl font-semibold text-gray-800 p-6 mb-4">
                लक्ष्य
              </h3>
              <p className="text-gray-600">
                एजुकेट गर्ल्स का लक्ष्य 2035 तक 1 करोड़ शिक्षार्थियों को प्रभावित
                करना है।
              </p>
            </div>
            <img
              src={परिकल्पना}
              alt="इतिहास"
              className="w-1/3 rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutIntro
