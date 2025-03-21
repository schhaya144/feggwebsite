import React from "react";

const DropdownMenu = ({ title, children, isOpen }) => (
  <div>
    <button className="nav-link">{title}</button>
    {isOpen && (
      <ul className="absolute left-0 z-10 top-full bg-white shadow-md w-40">
        {children.map((child, index) => (
          <li key={index} className="dropdown-item border-t">
            {child}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default DropdownMenu;
