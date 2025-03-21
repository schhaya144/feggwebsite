import { FaHome } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { BiSolidDonateHeart  } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";

export const footerData = [
    {
        title: "Home",  // Corrected from "titile"
        icon: <FaHome />,
        href: "/"
    },
    {
        title: "Gallery",  // Corrected from "Galary"
        icon: <GrGallery />,
        href: "/gallery"
    },
    {
        title: "Contact Us",  // Corrected from "titile"
        icon: <MdContactSupport />,
        href: "/contactus"
    },
    {
        title: "Donate",
        icon: <BiSolidDonateHeart  />,
        href: "/donate"
    },
];