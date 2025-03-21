import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import logo from "../../assets/logo.png";
import {
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footerSections =
      footerRef.current.querySelectorAll(".footer-section");

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
            start: "top 90%",
            end: "bottom 70%",
            toggleActions: "play none none reverse",
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-gray-900 text-white py-8 border-t-4 border-red-400 sm:px-8"
    >
      <div className=" px-4">
        {/* शीर्ष अनुभाग */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 footer-section">
          {/* लोगो और विवरण */}
          <div className="flex flex-col items-center md:items-start">
            <div className="bg-white w-16 h-16 rounded-full mb-4 flex justify-center items-center">
              <img
                src={logo}
                alt="Educate Girls Logo"
                className="w-full h-full object-contain"
              />
            </div>
            {/* <h2 className="text-lg font-semibold">
              लड़कियों की शिक्षा के लिए वैश्विक फाउंडेशन
            </h2> */}
            <p className="text-gray-400 text-sm mt-4">
              Educate Girls एक गैर-लाभकारी संगठन है जो ग्रामीण और शैक्षिक रूप से
              वंचित क्षेत्रों की लड़कियों की शिक्षा को बढ़ावा देने और समुदायों
              को सशक्त बनाने पर केंद्रित है।
            </p>
          </div>

          {/* लिंक */}
          <div className="flex flex-col md:items-start items-center text-center md:text-start footer-section">
            <h3 className="text-lg font-semibold text-red-400 mb-4">लिंक</h3>
            <ul className="md:space-y-2 space-x-0">
              <li>
                <Link to="/aboutus" className="hover:underline">
                  हमारे बारे में
                </Link>
              </li>
              <li>
                <Link to="/Pragati" className="hover:underline">
                  प्रगति
                </Link>
              </li>
              <li>
                <Link to="/MPSOSInfo" className="hover:underline">
                  एम.पी.एस.ओ.एस. के बारे में
                </Link>
              </li>
             
              <li>
                <Link to="/register" className="hover:underline">
                  छात्र पंजीकरण
                </Link>
              </li>
              <li>
                <Link to="/blueprint" className="hover:underline">
                  ब्लू प्रिंट
                </Link>
              </li>

              <li>
                <Link to="/contactus" className="hover:underline">
                  संपर्क करें
                </Link>
              </li>
            </ul>
          </div>

          {/* पता और ईमेल */}
          <div className="flex flex-col items-center md:items-start footer-section">
            <h3 className="text-lg font-semibold text-red-400 mb-4">पता</h3>
            <p className="text-gray-400 text-sm">
              मुंबई (प्रधान कार्यालय) C103/C104, प्रथम तल, रेमी बिसकोर्ट, शाह
              इंडस्ट्रियल एस्टेट, वीरा देसाई रोड के पास, अंधेरी वेस्ट, मुंबई
              400053, महाराष्ट्र +91-22 48932226 (सोम-शुक्र 9:30am-6pm IST
              सार्वजनिक छुट्टियों को छोड़कर)
            </p>
            <p className="text-gray-400 text-sm mt-4">
              <span className="font-semibold">हमें ईमेल करें:</span>{" "}
              info.in@educategirls.ngo
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-red-400 mb-4">
            गूगल मानचित्र
            </h3>
            <p className="text-red-400 hover:underline cursor-pointer mt-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3819254361256!2d72.8368911!3d19.134752199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63f4f288d61%3A0x300900382393f137!2sEducate%20Girls%20-%20Head%20Office!5e0!3m2!1sen!2sin!4v1739772938747!5m2!1sen!2sin"
                width="260"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </p>
          </div>
        </div>
        {/* सोशल मीडिया लिंक */}
        <div className="flex flex-col items-center text-center w-full mt-5">
          <h3 className="text-lg font-semibold text-red-400 mb-4">
            हमें फॉलो करें
          </h3>
          <div className="flex justify-center items-center space-x-4 footer-section">
            <a
              href="https://www.youtube.com/channel/UC4865kQdW694JwlPa-JIpjw"
              className="bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-red-700 transition"
            >
              <FaYoutube className="text-2xl" />
            </a>
            <a
              href="https://www.facebook.com/educategirls"
              className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-blue-700 transition"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="https://x.com/educate_girls"
              className="bg-blue-400 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-blue-500 transition"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="http://linkedin.com/company/educate-girls"
              className="bg-blue-700 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-blue-500 transition"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="https://www.instagram.com/educategirlsngo/"
              className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white w-12 h-12 flex items-center justify-center rounded-full hover:opacity-80 transition"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-gray-400 text-sm text-center">
          <p>
            <span className="text-primary">
              {" "}
              <Link to="/terms" className="hover:underline">
              नियम और शर्तें
              </Link>
            </span>{" "}
            |{" "}
            <span className="text-primary">
              {" "}
              <Link to="/privacy-policy" className="hover:underline">
              गोपनीयता नीति
              </Link>
            </span>
          </p>
          <p>
            Educate Girls is a project of Foundation To Educate Girls Globally
            (FEGG) | FEGG is registered in India under Section 8 of the Indian
            Companies Act, 2013.{" "}
          </p>
          <p>
            @2018 All rights reserved.{" "}
            <span className="text-primary">Educate Girls</span>{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
