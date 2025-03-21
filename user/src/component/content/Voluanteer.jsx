import React, { useEffect } from 'react';
import headlogo1 from "../../assets/flower-pot.png";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Voluanteer = () => {
  useEffect(() => {
    gsap.fromTo(
      ".voluanteer-steps",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.3,
        delay: 1,
        scrollTrigger: {
          trigger: ".plant-text",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="flex justify-center my-7">
        <div className="heading01">Join Us And Earn Money</div>
        <img src={headlogo1} className="h-14 inline" alt="Flower Pot" />
      </div>

      {/* Balls Section with Steps */}
      <div className="flex flex-col items-center justify-center px-7 relative">
        <div className="flex flex-wrap justify-between ">

          {/* Option 1 */}
          <div className="step-ball flex flex-col items-center justify-center m-4 w-64 h-64 bg-green-100 rounded-full shadow-lg transition-transform duration-300 transform voluanteer-steps">
            <div className="text-2xl font-bold text-gray-700 mb-1">Step 1</div>
            <div className="text-3xl mb-2">🌳</div>
            <h2 className="text-lg font-bold text-blue-600">First Plantation</h2>
            <p className="text-sm mt-2 ">₹151 per tree</p>
            <p className="text-xs  mt-1">At the time of each plantation</p>
          </div>

          {/* Option 2 */}
          <div className="step-ball flex flex-col items-center justify-center m-4 w-64 h-64 bg-green-200 rounded-full shadow-lg transition-transform duration-300 transform voluanteer-steps">
            <div className="text-2xl font-bold text-gray-700 mb-1">Step 2</div>
            <div className="text-3xl mb-2">📅</div>
            <h2 className="text-lg font-bold text-blue-600">First Six Months</h2>
            <p className="text-sm mt-2 ">₹211 per tree</p>
            <p className="text-xs mt-1">On the date of first six months</p>
          </div>

          {/* Option 3 */}
          <div className="step-ball flex flex-col items-center justify-center m-4 w-64 h-64 bg-green-300 rounded-full shadow-lg transition-transform duration-300 transform voluanteer-steps">
            <div className="text-2xl font-bold text-gray-700 mb-1">Step 3</div>
            <div className="text-3xl mb-2">🎉</div>
            <h2 className="text-lg font-bold text-purple-600">Annual Plantation Date</h2>
            <p className="text-sm mt-2 ">₹421 per tree</p>
            <p className="text-xs  mt-1">On each anniversary of plantation</p>
          </div>

          {/* Option 4 */}
          <div className="step-ball flex flex-col items-center justify-center m-4 w-64 h-64 bg-green-400 rounded-full shadow-lg transition-transform duration-300 transform voluanteer-steps">
            <div className="text-2xl font-bold text-gray-700 mb-1">Step 4</div>
            <div className="text-3xl mb-2">📆</div>
            <h2 className="text-lg font-bold text-purple-600">Maximum Duration</h2>
            <p className="text-sm mt-2 ">Up to 11 years</p>
            <p className="text-xs  mt-1">From the date of plantation per tree</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Voluanteer;
