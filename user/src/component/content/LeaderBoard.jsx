import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero from "../../assets/pragati-video.mp4";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const heroImageRef = useRef(null);
  const textSectionRef = useRef(null);
  const videoRef = useRef(null); // Ref for video
  const [isPlaying, setIsPlaying] = useState(false); // State to track video play/pause

  useEffect(() => {
    // Left section animation
    gsap.fromTo(
      heroImageRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none none",
        },
      }
    );

    // Right section animation
    gsap.fromTo(
      textSectionRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textSectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // Function to toggle play/pause
  const handleToggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying); // Toggle state
    }
  };

  return (
    <div className="bg-[#FD645B] bg-image py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section - Video */}
        <div ref={heroImageRef} className="relative w-full md:w-1/2 mb-8 md:mb-0">
          <video
            ref={videoRef}
            src={hero}
            className="rounded-3xl shadow-lg w-full"
            controls
            unmute
            playsInline
            title="Educational Video"
          ></video>

          {/* Play/Pause button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleToggleVideo}
              className="bg-gray-700 bg-opacity-80 text-white text-4xl rounded-full w-16 h-16 flex items-center justify-center shadow-md"
            >
              {isPlaying ? "❚❚" : "▶"} {/* Toggle icon */}
            </button>
          </div>
        </div>

        {/* Right Section - Content */}
        <div ref={textSectionRef} className="w-full md:w-1/2 md:pl-8 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white mb-4">
            एजुकेट गर्ल्स के बारे में
          </h2>
          <p className="text-gray-100 leading-relaxed text-justify mb-6">
          एजुकेट गर्ल्स एक गैर-लाभकारी संस्था है जो भारत के ग्रामीण और
              शैक्षिक रूप से कमजोर वर्ग की लड़कियों की शिक्षा के लिए समुदायों को
              जागरूक और सशक्त करने पर ध्यान केंद्रित करती है। 'शिक्षा का अधिकार
              अधिनियम' या 'समग्र शिक्षा अभियान' के साथ मजबूत रूप से जुड़कर,
              एजुकेट गर्ल्स बच्चों के लिए गुणवत्तापूर्ण प्राथमिक शिक्षा की पहुँच
              बढ़ाने के सरकार के उद्देश्य को दृढ़ता से आगे बढ़ाती है जिसमें
              विशेष रूप से लड़कियों पर ध्यान दिया जा जाता है।
          </p>
          <Link to={"/about"}>
            <button className="border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-red-300 transition">
              और पढ़ें
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
