import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookSquare, FaTwitterSquare, FaWhatsappSquare } from "react-icons/fa";
import logo from "../../assets/oxyVan-logo.png";

const FooterItems = () => {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <></>
    // <footer className="white-bg dark:bg-gray-900 mt-10 md:mt-28">
    //   <div className="container mx-auto p-6 lg:py-8">
    //     <div className="md:flex md:justify-between">
    //       <div className="mb-6 md:mb-0">
    //         <NavLink to="/" className="flex items-center">
    //           <img src={logo} className="h-24 md:h-44" alt="OxyVan Logo" />
    //         </NavLink>
    //       </div>
    //       <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
    //         <div>
    //           <h2 className="mb-6 text-sm font-bold text-primary uppercase dark:text-white">Resources</h2>
    //           <ul className="text-gray-500 dark:text-gray-400">
    //             <li className="mb-4">
    //               <NavLink to="/" className="hover:text-primary hover:underline">OxyVan</NavLink>
    //             </li>
    //             <li>
    //               <NavLink to="/about" className="hover:text-primary hover:underline">About</NavLink>
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <h2 className="mb-6 text-sm font-bold text-primary uppercase dark:text-white">Follow us</h2>
    //           <ul className="text-gray-500 dark:text-gray-400">
    //             <li className="mb-4">
    //               <a href="/" className="hover:text-primary hover:underline">Facebook</a>
    //             </li>
    //             <li>
    //               <a href="/" className="hover:text-primary hover:underline">Twitter</a>
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <h2 className="mb-6 text-sm font-bold text-primary uppercase dark:text-white">Legal</h2>
    //           <ul className="text-gray-500 dark:text-gray-400">
    //             <li className="mb-4">
    //               <NavLink to="/privacy-policy" className="hover:text-primary hover:underline">Privacy Policy</NavLink>
    //             </li>
    //             <li>
    //               <NavLink to="/terms-conditions" className="hover:text-primary hover:underline">Terms & Conditions</NavLink>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />
    //     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    //       <span className="text-sm text-gray-500 dark:text-gray-400">
    //         © {getCurrentYear()} <NavLink to="/" className="hover:text-primary hover:underline">SSS Technologies™</NavLink>. All Rights Reserved.
    //       </span>
    //       <div className="flex mt-4 space-x-5 sm:mt-0">
    //         <a href="#" className="text-gray-800 hover:text-green-700 dark:hover:text-white">
    //           <FaWhatsappSquare className="text-3xl" />
    //           <span className="sr-only">WhatsApp</span>
    //         </a>
    //         <a href="#" className="text-gray-800 hover:text-blue-700 dark:hover:text-white">
    //           <FaFacebookSquare className="text-3xl" />
    //           <span className="sr-only">Facebook</span>
    //         </a>
    //         <a href="#" className="text-gray-800 hover:text-blue-400 dark:hover:text-white">
    //           <FaTwitterSquare className="text-3xl" />
    //           <span className="sr-only">Twitter</span>
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
  );
};

export default FooterItems;
