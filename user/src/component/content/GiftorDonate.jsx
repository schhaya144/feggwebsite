import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import EventsAnnouncements from './EventAnnouncement'
import Tribal from '../../assets/tribal.pdf'
import Virtual from '../../assets/virtual.pdf'
import EFA from '../../assets/EFA.pdf'
import terms from '../../assets/Terms.pdf'
import SummaryApi from '../../common/SummaryApi'

const baseUrl = import.meta.env.VITE_BACKEND_URL
gsap.registerPlugin(ScrollTrigger)

const ImportantLinks = () => {
  const [blueprintFile, setBlueprintFile] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const fetchBlueprint = async () => {
      try {
        const response = await axios.get(SummaryApi.Blueprintget.url)
        if (response.data.length > 0) {
          setBlueprintFile(`${baseUrl}${response.data[0].filePath}`)
        }
      } catch (error) {
        console.error('ब्लूप्रिंट प्राप्त करने में त्रुटि:', error)
      }
    }
    fetchBlueprint()
  }, [])

  const downloadBlueprint = async () => {
    if (!blueprintFile) {
      alert('डाउनलोड के लिए कोई फ़ाइल उपलब्ध नहीं है।')
      return
    }
    try {
      const response = await axios.get(blueprintFile, { responseType: 'blob' })
      const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = fileURL
      link.setAttribute('download', 'Blueprint.pdf')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('फ़ाइल डाउनलोड करने में त्रुटि:', error)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    gsap.fromTo(
      container.querySelectorAll('.important-link'),
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: container.querySelector('.important-link'),
          start: 'top 80%',
        },
      }
    )
  }, [])

  const importantLinks = [
    { title: 'वर्चुअल क्लास सेंटर्स', path: '/', doc: Virtual },
    { title: 'वर्चुअल क्लास सेंटर्स (ट्राइबल डिवीजन)', path: '/onlinevideo', doc: Tribal },
    { title: 'EFA सेंटर लिस्ट', path: '/', doc: EFA },
    // { title: 'ब्लू प्रिंट', path: '#', onClick: downloadBlueprint },
    { title: "ब्लू प्रिंट", path: "/blueprint" }, 
    { title: 'डाउनलोड करे महत्वपूर्ण आदेश, पत्र, निर्देश', path: 'https://mpsos.nic.in/Daily%20updates.htm',  },
  ]

  return (
    <div className="bg-gray-100 pt-8 pb-14" ref={containerRef}>
      <div className=" px-4 sm:px-12">
        <EventsAnnouncements />
        <div>
          <h2 className="text-lg sm:text-3xl font-bold mb-4 text-primary text-center mt-8">
            महत्वपूर्ण लिंक
          </h2>
          

          <div className="space-y-3">
            {importantLinks.map((link, index) =>
              link.doc ? (
                <a
                  key={index}
                  href={link.doc}
                  download
                  className="important-link flex items-center justify-between bg-white p-4 shadow-md border-l-8 border-red-400 transition hover:scale-105 hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-800">{link.title}</span>
                  <span className="text-primary text-lg font-bold">↓</span>
                </a>
              ) : link.onClick ? (
                <button
                  key={index}
                  onClick={link.onClick}
                  className="important-link flex w-full items-center justify-between bg-white p-4 shadow-md border-l-8 border-red-400 transition hover:scale-105 hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-800">{link.title}</span>
                  <span className="text-primary text-lg font-bold">↓</span>
                </button>
              ) : (
                <Link
                  key={index}
                  to={link.path}
                  className="important-link flex items-center justify-between bg-white p-4 shadow-md border-l-8 border-red-400 transition hover:scale-105 hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-800">{link.title}</span>
                  <span className="text-primary text-lg font-bold">↓</span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImportantLinks
