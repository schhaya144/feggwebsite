// import React, { useEffect, useRef, useState } from "react";
// import { NavLink } from "react-router-dom";
// import logo from '../../assets/logo.png'
// import { FaHome, FaBars, FaTimes } from "react-icons/fa"; // Icons
// import { IoMdArrowDropdown } from "react-icons/io"; // Down arrow icon
// import "./navbar.css";
// import gsap from "gsap";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAboutOpen, setIsAboutOpen] = useState(false);
//   const [isProggammersOpen, setIsProggammersOpen] = useState(false);
//   const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   const navRef = useRef(null);

//   useEffect(() => {
//     if (isMenuOpen) {
//       gsap.to(navRef.current, { duration: 0.5, height: "auto", opacity: 1, ease: "power2.out" });
//     } else {
//       gsap.to(navRef.current, { duration: 0.5, height: 0, opacity: 0, ease: "power2.in" });
//     }
//   }, [isMenuOpen]);
//   return (
//     <header className="header bg-white shadow-md sticky top-0 w-full z-50">
//       <div className="flex flex-col items-center md:items-start">
//         <div className="hidden md:flex items-center ml-auto space-x-4 text-sm text-gray-600">
//           <div className="flex justify-end items-center w-full text-sm text-gray-600 mb-2 md:mb-0">
//             <span>
//               Govt. Toll Free No.: <b>1800-180-9393</b>
//             </span>
//           </div>
//           <div className="bg-black flex  items-center ml-auto space-x-4 pl-10 rounded-bl-full pr-5">
//             <div className="relative flex items-center w-1/3">
//               <label htmlFor="" className="text-white hover:text-gray-300">
//                 Search:
//               </label>
//               <div className="border rounded-sm relative">
//                 <button className="absolute right-2 text-white">🔍</button>
//                 <input
//                   type="text"
//                   className="w-full px-14 text-white placeholder-gray-400 bg-transparent focus:outline-none"
//                 />
//               </div>
//             </div>

//             <span className="text-white">|</span>
//             <NavLink
//               to="/newsletter"
//               className="text-white hover:text-gray-300"
//             >
//               Newsletter
//             </NavLink>

//             <NavLink
//               to="/testimonials"
//               className="text-white hover:text-gray-300"
//             >
//               Testimonial
//             </NavLink>
//             <span className="text-white">|</span>
//             <NavLink to="/gallery" className="text-white hover:text-gray-300">
//               Gallery
//             </NavLink>
//             <span className="text-white">|</span>
//             <NavLink to="/sitemap" className="text-white hover:text-gray-300">
//               Sitemap
//             </NavLink>
//             <span className="text-white">|</span>
//             <NavLink to="/faq" className="text-white hover:text-gray-300">
//               FAQ
//             </NavLink>
//             <span className="text-white">|</span>
//             <div className="flex items-center space-x-2">
//               <button className="text-xs px-2 text-white rounded">A</button>
//               <button className="text-sm font-bold text-white px-2 rounded">
//                 A+
//               </button>
//             </div>
//             <span className="text-white">|</span>
//             <select className="bg-white border border-gray-300 px-2 py-1 text-sm rounded">
//               <option value="en">English</option>
//               <option value="hi">Hindi</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="flex items-center justify-between px-4 py-3 md:px-8">
//         {/* Logo Section */}
//         <div className="flex items-center space-x-4">
//           <div className=" w-20 h-20 rounded-full">
//             <img src={logo} alt="" />
//           </div>
//           <div>
//             <h1 className="text-lg font-bold text-gray-800">
//               ABC State Open School
//             </h1>
//             <p className="text-sm text-gray-500">(एबीसी स्टेट ओपन स्कूल)</p>
//           </div>
//         </div>

//         {/* Hamburger Menu for All Screens */}
//         <button
//           onClick={toggleMenu}
//           className="text-gray-700 text-2xl focus:outline-none md:hidden"
//         >
//           {isMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Navigation Links */}
//       <nav
//         className={`${
//           isMenuOpen ? "block" : "hidden"
//         } md:block bg-white w-full shadow-md md:shadow-none`}
//       >
//         <ul className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 space-y-4 md:space-y-0 md:space-x-6">
//           <li>
//             <NavLink
//               to="/"
//               className="nav-link flex items-center py-2"
//               activeClassName="active-link"
//             >
//               <FaHome className="mr-2 text-xl" />
//             </NavLink>
//           </li>
//           <li
//             className="relative group"
//             onMouseEnter={() => setIsAboutOpen(true)}
//             onMouseLeave={() => setIsAboutOpen(false)}
//           >
//             <NavLink
//               to="/about"
//               className="nav-link py-2"
//               activeClassName="active-link"
//             >
//               About Us
//             </NavLink>
//             {isAboutOpen && (
//               <ul className="absolute left-0 z-10 top-full bg-white shadow-md w-40">
//                 <li className="border-l-4 border-red-500">
//                   <NavLink to="/history" className="dropdown-item">
//                     History
//                   </NavLink>
//                 </li>
//                 <li className="border-l-4 border-red-300">
//                   <NavLink to="/vision" className="dropdown-item border-t">
//                     Vision & Mission
//                   </NavLink>
//                 </li>
//                 <li className="border-l-4 border-red-500">
//                   <NavLink to="/ordinance" className="dropdown-item border-t">
//                     Ordinance/Act
//                   </NavLink>
//                 </li>
//                 <li className="border-l-4 border-red-300">
//                   <NavLink to="/vision" className="dropdown-item border-t">
//                     Objectives
//                   </NavLink>
//                 </li>
//                 <li className="border-l-4 border-red-500">
//                   <NavLink to="/ordinance" className="dropdown-item border-t">
//                     Commitee
//                   </NavLink>
//                 </li>
//                 <li className="border-l-4 border-red-300">
//                   <NavLink to="/vision" className="dropdown-item border-t">
//                     RTI
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li
//              className="relative group"
//              onMouseEnter={() => setIsProggammersOpen(true)}
//              onMouseLeave={() => setIsProggammersOpen(false)}
//           >
//             <NavLink
//               to="/programmes"
//               className="nav-link py-2"
//               activeClassName="active-link"
//             >
//               Programmes
//             </NavLink>
//             {isProggammersOpen && (
//               <ul className="absolute left-0 z-10 top-full bg-white shadow-md w-40">
//                 <li className="border-l-4 border-red-500">
//                   <NavLink to="/history" className="dropdown-item">
//                     10th Class
//                   </NavLink>
//                 </li>
//                 <li className="border-l-4 border-red-300">
//                   <NavLink to="/vision" className="dropdown-item border-t">
//                     12th Class
//                   </NavLink>
//                 </li>
//                 <li className="border-l-4 border-red-500">
//                   <NavLink to="/ordinance" className="dropdown-item border-t">
//                     Vocational Course
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li  className="relative group"
//              onMouseEnter={() => setIsAdmissionOpen(true)}
//              onMouseLeave={() => setIsAdmissionOpen(false)}>
//             <NavLink
//               to="/admission"
//               className="nav-link py-2"
//               activeClassName="active-link"
//             >
//               Admission
//             </NavLink>
//             {isAdmissionOpen && (
//               <ul className="absolute left-0 z-10 top-full bg-white shadow-md w-40">
//                 <li className="border-l-4 border-red-500">
//                   <NavLink to="/history" className="dropdown-item">
//                     10th Class
//                   </NavLink>
//                 </li>
//                 <li className="border-l-4 border-red-300">
//                   <NavLink to="/vision" className="dropdown-item border-t">
//                     12th Class
//                   </NavLink>
//                 </li>
//                 <li className="border-l-4 border-red-500">
//                   <NavLink to="/ordinance" className="dropdown-item border-t">
//                     Vocational Course
//                   </NavLink>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li>
//             <NavLink
//               to="/student-corner"
//               className="nav-link py-2"
//               activeClassName="active-link"
//             >
//               Student Corner
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admission"
//               className="nav-link py-2"
//               activeClassName="active-link"
//             >
//               Events
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/notifications"
//               className="nav-link py-2"
//               activeClassName="active-link"
//             >
//               Notifications
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/contactus"
//               className="nav-link py-2"
//               activeClassName="active-link"
//             >
//               Contact Us
//             </NavLink>
//           </li>
//           <li>
//             <div
//               className="relative"
//               // onClick={() => setIsLoginOpen(!isLoginOpen)}
//             >
//               <button className="flex items-center nav-link">
//                 Login

//               </button>
//               {/* {isLoginOpen && (
//                 <ul className="absolute right-0 z-10 top-full bg-white shadow-md w-40">
//                   <li className="border-l-4 border-red-500">
//                     <NavLink to="/student-login" className="dropdown-item">
//                       Student Login
//                     </NavLink>
//                   </li>
//                   <li className="border-l-4 border-red-300">
//                     <NavLink to="/admin-login" className="dropdown-item border-t">
//                       Administration Login
//                     </NavLink>
//                   </li>
//                 </ul>
//               )} */}
//             </div>
//           </li>
//           <li>
//             <NavLink
//               to="/register"
//               className="px-6 py-2 text-primary border border-gray-600 rounded-3xl"
//             >
//               Signup
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import './navbar.css'
import LogoSection from './LogoSection'
import HeaderTop from './HeaderTop'
import NavLinks from './Navlinks'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <header ref={navRef} className="header bg-white shadow-md sticky top-0 w-full z-50">
      <HeaderTop />
      <div className="flex items-center justify-between px-4 py-3 sm:px-8">
        <LogoSection />
        <button
          onClick={toggleMenu}
          className="text-gray-700 text-2xl md:hidden"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:block w-full shadow-md md:shadow-none`}
      >
        <NavLinks />
      </nav>
    </header>
  )
}

export default Navbar
