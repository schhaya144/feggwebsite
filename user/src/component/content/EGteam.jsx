// import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Pagination } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'

// import team1 from '../../assets/Anushree-Singh_Educate-Girls.jpg'
// import team2 from '../../assets/Bineesh-Mathai.jpg'
// import team3 from '../../assets/Geetika-Tondon-Higgins.jpg'
// import team4 from '../../assets/Vijaylakshmi-Saxena_Educate-Girls.jpg'
// import team5 from '../../assets/Vikram-Singh-Solanki.jpg'

// const images = [
//   { img: team1, name: 'अनुश्री सिंह', position: 'प्रधान - मानव संसाधन' },
//   {
//     img: team2,
//     name: 'बिनिश मैथाई',
//     position: 'निदेशक - उद्देश्य संसाधन',
//   },
//   {
//     img: team3,
//     name: 'गीतिका टोंडन-हिगिंस',
//     position: 'निदेशक - प्रगति',
//   },
//   {
//     img: team4,
//     name: 'विजयलक्ष्मी सक्सेना',
//     position: 'मुख्य वित्तीय अधिकारी (CFO)',
//   },
//   {
//     img: team5,
//     name: 'विक्रम सिंह सोलंकी',
//     position: 'निदेशक - संचालन',
//   },
// ]

// const EGteam = () => {
//   return (
//     <div className="w-full max-w-auto px-2">
//       <h3 className="text-2xl sm:text-5xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#00043c] pt-1 py-1">
//         वरिष्ठ प्रबंधन टीम
//       </h3>
//       <Swiper
//         modules={[Navigation, Pagination]}
//         spaceBetween={30}
//         slidesPerView={1}
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           768: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//           1280: { slidesPerView: 5 },
//         }}
//         navigation
//         pagination={{ clickable: true }}
//         className="my-8"
//       >
//         {images.map((img, index) => (
//           <SwiperSlide key={index} className="group">
//             <div className="flex flex-col justify-center items-center sm:p-0 p-12">
//               <div className="text-center">
//                 <img
//                   src={img.img}
//                   alt={`स्लाइड ${index + 1}`}
//                   className="w-full h-60 object-fill rounded-lg shadow-lg mb-2
//                             transform transition duration-300 ease-in-out group-hover:scale-105 border-l-2 border-[#fd645b]"
//                 />
//                 <h3 className="font-semibold text-lg">{img.name}</h3>
//                 <h3 className="text-gray-600">{img.position}</h3>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   )
// }

// export default EGteam

import React from 'react'
import team1 from '../../assets/Anushree-Singh_Educate-Girls.jpg'
import team2 from '../../assets/Bineesh-Mathai.jpg'
import team3 from '../../assets/Geetika-Tondon-Higgins.jpg'
import team4 from '../../assets/Vijaylakshmi-Saxena_Educate-Girls.jpg'
import team5 from '../../assets/Vikram-Singh-Solanki.jpg'

const images = [
  {
    img: team4,
    name: 'विजयलक्ष्मी सक्सेना',
    position: 'मुख्य वित्तीय अधिकारी (CFO)',
  },
  { img: team5, name: 'विक्रम सिंह सोलंकी', position: 'निदेशक - संचालन' },
  { img: team2, name: 'बिनिश मैथाई', position: 'निदेशक - उद्देश्य संसाधन' },
]

const img2 = [
  { img: team3, name: 'गीतिका टोंडन-हिगिंस', position: 'निदेशक - प्रगति' },
  { img: team1, name: 'अनुश्री सिंह', position: 'प्रधान - मानव संसाधन' },
]

const EGteam = () => {
  return (
    <div className="w-full  sm:px-12 mt-4 px-4">
      <div className="text-center py-4">
        <h2 className="text-2xl sm:text-4xl font-semibold text-white text-center my-5 border-[#fd645b] border-x-4 bg-[#fd645b] pt-2 pb-1 w-full">
          {' '}
          वरिष्ठ प्रबंधन टीम
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {images.map((img, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-center p-4"
          >
            <img
              src={img.img}
              alt={img.name}
              className="w-full h-full object-cover rounded-lg shadow-lg mb-2 
                        transform transition duration-300 ease-in-out hover:scale-105 border-l-2 border-[#fd645b]"
            />
            <h3 className="font-semibold text-lg">{img.name}</h3>
            <h3 className="text-gray-600">{img.position}</h3>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 ">
        {img2.map((img, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-center p-4"
          >
            <img
              src={img.img}
              alt={img.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg mb-2 
                        transform transition duration-300 ease-in-out hover:scale-105 border-l-2 border-[#fd645b]"
            />
            <h3 className="font-semibold text-lg">{img.name}</h3>
            <h3 className="text-gray-600">{img.position}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EGteam
