import React, { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={toggleDropdown}
      >
        Dropdown
      </button>
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white shadow-md py-2 rounded-lg">
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
          >
            Option 1
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
          >
            Option 2
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
          >
            Option 3
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
