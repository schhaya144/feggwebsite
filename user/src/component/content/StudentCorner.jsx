import React from 'react'
import hero from '../../assets/hero.webp'
import Testimonials from './Testimonials'

const StudentCorner = () => {
  return (
    <div className="bg-gray-100 relative">
      <img src={hero} alt="इतिहास" className="object-cover w-full" />
      <div className="bg-white mx-6 relative -mt-16 rounded-lg shadow-lg mb-8">
        {/* शीर्षक */}
        <header className="bg-white  p-4">
          <h1 className="text-2xl font-bold text-center text-red-500">
            छात्र कॉर्नर
          </h1>
        </header>

        {/* दिव्या शर्मा अनुभाग */}
        <section className="bg-white p-6 m-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3 text-right">
              <h2 className="text-xl font-bold">दिव्या शर्मा</h2>
              <p className="text-gray-600 mt-2">
                दिव्या शर्मा नामांकन संख्या 123456789012। दिव्या शर्मा
                (123456789012) वर्तमान में डीपीएस साउथ दिल्ली में एनआईओएस
                स्ट्रीम में पढ़ रही हैं। अप्रैल 2023 में अपनी सीनियर सेकेंडरी
                परीक्षा पूरी करने के बाद, वह बिजनेस एडमिनिस्ट्रेशन को आगे बढ़ाने
                की योजना बना रही हैं और दिल्ली के XXX विश्वविद्यालय में बिजनेस
                एडमिनिस्ट्रेशन प्रोग्राम के लिए नामांकित हैं।
              </p>
              <button className="mt-4 px-4 py-2 text-primary">और पढ़ें</button>
            </div>
            <img
              src={hero}
              alt="दिव्या शर्मा"
              className="w-full md:w-1/3 rounded-lg object-cover"
            />
          </div>
        </section>

        {/* प्लेसमेंट अनुभाग */}
        <section className="flex flex-col md:flex-row gap-6 bg-gray-100 m-6">
          <img
            src={hero}
            alt="प्लेसमेंट"
            className="w-full md:w-1/3  object-cover"
          />
          <div className="md:w-2/3">
            <h2 className="text-xl font-bold mb-4">प्लेसमेंट</h2>
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-pink-100">
                  <th className="p-2 border">नाम</th>
                  <th className="p-2 border">प्रोग्राम</th>
                  <th className="p-2 border">स्थान</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'अमृता सिंह', program: 'आशा', location: 'राजस्थान' },
                  {
                    name: 'अनुज सिंह',
                    program: 'नरेगा',
                    location: 'उत्तर प्रदेश',
                  },
                  {
                    name: 'भावना कुमारी',
                    program: 'एएनएम',
                    location: 'उत्तर प्रदेश',
                  },
                  {
                    name: 'भारती सिंह',
                    program: 'एएनएम',
                    location: 'मध्य प्रदेश',
                  },
                  { name: 'दीपक', program: 'आंगनवाड़ी', location: 'दिल्ली' },
                  { name: 'सूरज सिंह', program: 'एएनएम', location: 'राजस्थान' },
                ].map((placement, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="p-2 border">{placement.name}</td>
                    <td className="p-2 border">{placement.program}</td>
                    <td className="p-2 border">{placement.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-4 px-4 py-2 text-red-500">और पढ़ें</button>
          </div>
        </section>

        {/* कौशल विकास कार्यक्रम अनुभाग */}
        <section className="flex flex-col md:flex-row gap-6 m-6 border">
          <div className="md:w-2/3 p-4 items-center">
            <h2 className="text-xl font-bold mb-4">कौशल विकास कार्यक्रम</h2>
            <ul className="list-disc ml-6 text-gray-600">
              <li>प्रधानमंत्री कौशल केंद्र</li>
              <li>संकल्प</li>
              <li>उड़ान</li>
            </ul>
            <button className="mt-4 px-4 py-2 text-red-500">और पढ़ें</button>
          </div>
          <img
            src={hero}
            alt="कौशल विकास"
            className="w-full md:w-1/3 object-cover"
          />
        </section>

        {/* प्रशंसापत्र अनुभाग */}
        <div className="py-7">
          <Testimonials />
        </div>
      </div>
    </div>
  )
}

export default StudentCorner
