import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import axios from 'axios'
import 'swiper/css'
import SummaryApi from '../../common/SummaryApi'
import { Link } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_BACKEND_URL

const Hero = () => {
  const popupRef = useRef(null)
  const [carouselImages, setCarouselImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch carousel images from API
    const fetchCarouselImages = async () => {
      try {
        const response = await axios.get(SummaryApi.getCarouselImage.url)
        setCarouselImages(response.data) // Assuming API returns an array of images
        setLoading(false)
      } catch (error) {
        console.error('Error fetching carousel images:', error)
        setError('Failed to load images')
        setLoading(false)
      }
    }

    fetchCarouselImages()
  }, [])

  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (popupRef.current) {
        gsap.fromTo(
          popupRef.current,
          { x: 300, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        )
      }
    }, 5000) // Show after 5 seconds

    const hideTimer = setTimeout(() => {
      if (popupRef.current) {
        gsap.to(popupRef.current, {
          y: 300,
          opacity: 0,
          duration: 1,
          ease: 'power3.in',
        })
      }
    }, 20000) // Hide after 10 seconds (5s delay + 5s display time)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className="relative">
      {/* Image Slider */}
      {loading ? (
        <p className="text-center py-10">Loading images...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-10">{error}</p>
      ) : (
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          slidesPerView={1}
          className="w-full"
        >
          {carouselImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${baseUrl}/${image.image}`}
                alt={`Slide ${index + 1}`}
                className="w-full h-[560px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Right-Aligned Popup */}
      <div className="absolute top-0 right-0 h-full z-10 flex items-center justify-end md:pr-20">
        <div
          ref={popupRef}
          className="bg-white p-6 rounded-sm border-t-4 border-red-400 shadow-lg w-96 opacity-0"
        >
          <h2 className="text-2xl font-semibold mb-4">
            शिक्षा का नया अवसर! 📚✨
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            अभी अपना पंजीयन करें या अपना परिणाम देखें।
          </p>
          <div className="flex space-x-4">
            <Link to={'/register'}>
              {' '}
              <button className="w-40 py-3 bg-[#FD645B] text-white rounded-3xl uppercase">
                पंजीकरण
              </button>
            </Link>
            <a href="https://mpsos.nic.in/">
              <button className="w-36 py-3 bg-[#FD645B] text-white rounded-3xl uppercase">
                परिणाम
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
