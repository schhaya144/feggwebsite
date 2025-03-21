import React from "react";

const ContactUs = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center lg:space-x-10 py-12 px-4 lg:px-12 bg-gray-50">
      {/* संपर्क विवरण और नक्शा अनुभाग */}
      <div className="flex flex-col lg:flex-row w-full gap-10">
        {/* बाईं ओर - मध्य प्रदेश राज्य मुक्त स्कूल शिक्षा बोर्ड */}
        <div className="w-full lg:w-1/2 border shadow-lg border-[#fd645b] rounded-xl p-6 bg-white">
          <h2 className="text-3xl font-bold text-primary mb-4">मध्य प्रदेश राज्य मुक्त स्कूल शिक्षा बोर्ड</h2>
          <p className="mb-4">
            <strong>पता:</strong> जोन-I, बोर्ड ऑफिस परिसर, राज्य ओपन स्कूल शिक्षा बोर्ड भवन, शिवाजी नगर, भोपाल, मध्य प्रदेश 462016
          </p>
          <p className="mb-4"><strong>फ़ोन नंबर:</strong> 0755 - 2552106, 2671066</p>
          <p className="mb-4">
            <strong>ईमेल:</strong> 
            <a href="mailto:mpsos2022@gmail.com" className="text-blue-600 hover:underline"> mpsos2022@gmail.com</a>
          </p>
          <p className="mb-4">
            <strong>गूगल मानचित्र:</strong> 
            <a href="https://maps.app.goo.gl/pmxA9NSM3XaduBSS6" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> स्थान देखें</a>
          </p>

          {/* नक्शा अनुभाग */}
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3666.325693180825!2d77.4281994!3d23.2312324!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c431a30d258c7%3A0x812204f32b855fc5!2sMPSOS%20EDUCATION%20BOARD!5e0!3m2!1sen!2sin!4v1740466738822!5m2!1sen!2sin"
              className="w-full h-full border-none"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* दाईं ओर - एजुकेट गर्ल्स */}
        <div className="w-full lg:w-1/2 border shadow-lg border-[#fd645b] rounded-xl p-6 bg-white">
          <h2 className="text-3xl font-bold text-primary mb-4">एजुकेट गर्ल्स</h2>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">इंदौर क्षेत्रीय कार्यालय</h3>
          <p className="mb-4">
            <strong>पता:</strong> 69, एमआर-1, अर्चना मोहना क्लिनिक के पीछे, महालक्ष्मी नगर, इंदौर, मध्य प्रदेश 452001
          </p>
          <p className="mb-4">
            <strong>ईमेल:</strong> 
            <a href="mailto:info.in@educategirls.ngo" className="text-blue-600 hover:underline"> info.in@educategirls.ngo</a>
          </p>
          <p className="mb-4">
            <strong>गूगल मानचित्र:</strong> 
            <a href="https://maps.app.goo.gl/Jt6D4EBfo8bTgBEB6" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> स्थान देखें</a>
          </p>

          {/* नक्शा अनुभाग */}
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3679.2998742947843!2d75.9121667!3d22.75425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDQ1JzE1LjMiTiA3NcKwNTQnNDMuOCJF!5e0!3m2!1sen!2sin!4v1741429431902!5m2!1sen!2sin"
              className="w-full h-full border-none"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;