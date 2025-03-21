// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
// import "swiper/css";
// import "swiper/css/pagination";
// import avatar from "../../assets/avatar1.png";

// const Testimonials = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const response = await fetch("http://localhost:8006/api/testimonial"); // Replace with your actual API URL
//         if (!response.ok) {
//           throw new Error("Failed to fetch testimonials");
//         }
//         const data = await response.json();
//         setTestimonials(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTestimonials();
//   }, []);

//   return (
//     <section className="flex justify-center items-center py-12 px-4">
//       <div className="w-full">
//         <h2 className="text-center text-gray-800 text-3xl font-bold mb-8">
//           What Our Students Say
//         </h2>

//         {loading && (
//           <p className="text-center text-gray-500">Loading testimonials...</p>
//         )}
//         {error && <p className="text-center text-red-500">{error}</p>}

//         {!loading && !error && testimonials.length > 0 && (
//           <Swiper
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 5000, disableOnInteraction: false }}
//             modules={[Pagination, Autoplay]}
//             spaceBetween={20}
//             breakpoints={{
//               320: { slidesPerView: 1 },
//               640: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//               1280: { slidesPerView: 4 },
//               1536: { slidesPerView: 5 },
//             }}
//             className="pb-10"
//           >
//             {testimonials.map((testimonial, index) => (
//               <SwiperSlide key={index}>
//                 <div className="bg-white mb-3 p-6 h-[380px] flex flex-col justify-between rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-r-4 border-red-500">
//                   <div className="text-center">
//                     <FaQuoteLeft className="text-red-400 text-xl inline-block mb-4" />
//                     <p className="text-gray-700 italic mb-4 overflow-hidden text-ellipsis line-clamp-5 max-h-[120px]">
//                       {testimonial.text}
//                     </p>
//                     <FaQuoteRight className="text-red-400 text-xl inline-block mt-4" />
//                   </div>
//                   <div className="flex flex-col items-center mt-4">
//                     <img
//                       src={
//                         testimonial.image
//                           ? `http://localhost:8006${testimonial.image}`
//                           : avatar
//                       }
//                       alt={testimonial.author}
//                       className="w-16 h-16 rounded-full border-4 border-red-500 shadow-md"
//                     />
//                     <cite className="mt-4 text-gray-800 font-bold">
//                       {testimonial.author}
//                     </cite>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/pagination'
import avatar from '../../assets/avatar1.png'
import Kimg from '../../assets/Testimonial-करजुना.jpg'
import timg from '../../assets/Testimonial-तरन्नुम.jpg'
import pimg from '../../assets/Testimonial-पूजा.jpg'
import mimg from '../../assets/Testimonial-मानवी.jpg'

const dummyTestimonials = [
  {
    text: `पूजा की शिक्षा का मार्ग भी कक्षा 9 की पढ़ाई पूरी करने के बाद इसी तरह बाधित हुआ, क्योंकि उसके परिवार को बढ़ती वित्तीय चुनौतियों का सामना करना पड़ा। फिर भी, अपने पड़ोस में प्रगति कैंप की खोज करने पर, उसने दाखिला लेने का साहसी कदम उठाया। अब, वह अपने समुदाय की महिलाओं के उत्थान और आवश्यक जीवन अवसरों से वंचित लोगों के लिए आशा की किरण के रूप में काम करना चाहती है। `,
    author: 'पूजा',
    image: Kimg,
  },
  {
    text: `राजस्थान से आने वाली मानवी की शिक्षा यात्रा तब बाधित हुई जब उसे कक्षा 9 की पढ़ाई पूरी करने के बाद स्कूल छोड़ना पड़ा, क्योंकि कोविड-19 महामारी के दौरान उसके पिता की नौकरी चली गई थी। हालाँकि, प्रगति कैंप में उसने जो अवसर प्राप्त किया, वह उसके जीवन का एक महत्वपूर्ण क्षण साबित हुआ है। नए दृढ़ संकल्प के साथ, उसका लक्ष्य अपनी कक्षा 10 पूरी करना और सेना में अपना करियर बनाना है।`,
    author: 'मानवी ',
    image: timg,
  },
  {
    text: ` 
तरन्नुम की शिक्षा की खोज चार साल तक बाधित रही, क्योंकि उसकी बड़ी बहन की शादी के खर्च के कारण उसके परिवार को आर्थिक तंगी का सामना करना पड़ा। हालाँकि, हाल ही में उसने अपनी कक्षा 10 पूरी करने की महत्वाकांक्षा के साथ प्रगति शिविर में शामिल होने का निर्णय लिया। उसकी आकांक्षा शिक्षा के माध्यम से स्वतंत्रता प्राप्त करना है, जिससे उसके परिवार पर कुछ वित्तीय बोझ कम हो सके।
`,
    author: 'तरन्नुम',
    image: pimg,
  },
  {
    text: `
अपनी पढ़ाई में असफलताओं का सामना करने और कक्षा 9 में दो विषयों में फेल होने के बाद, करजुना ने स्कूल छोड़ने का कठिन निर्णय लिया। अपनी शिक्षा जारी रखने की इच्छा के बावजूद, विभिन्न बाधाओं ने उसके संकल्प को कमजोर कर दिया। उसके गाँव में प्रगति शिविर के आगमन ने उसकी आशा को फिर से जगा दिया। अब, गाँव में एक छोटे व्यवसाय के मालिक के रूप में, करजुना अपनी शिक्षा पूरी करने और अपने उद्यमशीलता के प्रयासों का विस्तार करने के लिए दृढ़ संकल्पित है।
`,
    author: 'करजुना',
    image: mimg,
  },
]

const Testimonials = () => {
  return (
    <section className="flex justify-center items-center py-12 px-4 sm:px-12 bg-gray-10">
      <div className="w-full">
        <h2 className="text-center text-primary  text-lg sm:text-3xl font-bold mb-8">
          हमारे छात्रों की राय
        </h2>

        <Swiper
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
            1536: { slidesPerView: 4 }, // Change from 5 to 4
          }}
          className="pb-10"
        >
          {dummyTestimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white mb-3 p-6 h-[510px] flex flex-col justify-between rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-r-4 border-red-500">
                <div className="text-center">
                  <FaQuoteLeft className="text-red-400 text-sm inline-block mb-4" />
                  <p className="text-gray-700 italic   ">
                    {testimonial.text}
                  </p>
                  <FaQuoteRight className="text-red-400 text-sm inline-block mt-4" />
                </div>
                <div className="flex flex-col items-center mt-4">
                  <img
                    src={testimonial.image ? testimonial.image : avatar}
                    alt={testimonial.author}
                    className="w-24 h-24 rounded-full border-4 border-red-500 shadow-md object-fill"
                  />
                  <cite className="mt-4 text-gray-800 font-bold">
                    {testimonial.author}
                  </cite>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials
