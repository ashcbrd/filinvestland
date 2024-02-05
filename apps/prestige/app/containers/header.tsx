'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Modal from '@/app/components/general/modal';
import Card from '@/app/components/cards/card';
import data from '@/app/resources/menu';

const Header = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [modal, setModal] = useState(false);
  const [headerColor, setHeaderColor] = useState(
    'bg-gradient-to-b from-[rgba(0, 0, 0, 0.6)] to-transparent',
  );
  ``;
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false); // Correct type annotation

  const toggleModal = useCallback(() => {
    setModal((prevModal) => !prevModal);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const targetSectionPosition = 100;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= targetSectionPosition) {
        setHeaderColor('bg-[#130900] bg-opacity-80 transition duration-300');
      } else {
        setHeaderColor(
          'bg-gradient-to-b from-[rgba(0, 0, 0, 0.6)] to-transparent duration-300',
        );
        setShowSearchInput(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
    setHeaderColor(() =>
      showSearchInput // Use showSearchInput instead of prevColor here
        ? 'bg-gradient-to-b from-[rgba(0, 0, 0, 0.6)] to-transparent duration-300'
        : 'bg-[#130900] bg-opacity-80 transition duration-300',
    );
  };

  const handleOpenSearch = (e: any) => {
    e.preventDefault();
    toggleSearchInput();
  };

  return (
    <>
      <header
        className={`py-4 z-10 fixed top-0 left-0 w-full text-[#fff] ${headerColor}`}
      >
        <div className="container mx-auto flex items-center justify-between relative">
          <div className="flex items-center">
            <img src="/assets/images/logo.png" alt="Logo" />
          </div>

          <nav>
            <ul className="flex space-x-4 text-[12px]">
              {data &&
                data.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.url}
                      onClick={() => {
                        setActiveLink(index);
                      }}
                      className={`hover:text-gray-300 ${
                        index === activeLink ? 'active' : ''
                      }`}
                    >
                      {item.title}
                    </a>
                    {index === activeLink && (
                      <>
                        <img
                          src="/assets/images/underline.png"
                          className={`mt-2 ${
                            index === 0 || index === 1 || index === 2
                              ? 'w-10'
                              : 'w-16'
                          }`}
                        />
                      </>
                    )}
                  </li>
                ))}
            </ul>
          </nav>
          <div className="flex space-x-4">
            <button
              className="text-white text-sm font-normal px-4 py-2 rounded   hover:text-white"
              onClick={handleOpenSearch}
            >
              <svg
                className="text-white"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.40472 2.399C5.78895 -0.864371 10.8254 -0.734301 13.9576 2.399C16.9528 5.39522 17.1359 10.1393 14.5069 13.3492L19.1564 18.0007L18.0011 19.1564L13.3512 14.5053C10.1423 17.1352 5.39992 16.952 2.40472 13.9558C-0.727511 10.8225 -0.874791 5.5614 2.40472 2.399ZM12.8023 3.55468C10.2501 1.00162 6.1122 1.00162 3.56001 3.55468C1.00782 6.10774 1.00782 10.2471 3.56001 12.8001C6.1122 15.3532 10.2501 15.3532 12.8023 12.8001C15.3545 10.2471 15.3545 6.10774 12.8023 3.55468Z"
                  fill="#fff"
                />
              </svg>
            </button>

            <button
              onClick={() => setModal(!modal)}
              className="bg-transparent border border-[#954600] text-white text-sm font-normal px-4 py-2 rounded hover:bg-[#954600] hover:text-white hover:duration-300"
            >
              Book a Presentation
            </button>
          </div>
        </div>
        {showSearchInput && (
          <div className="p-4 mt-10 mb-10 w-full duration-300">
            <div className="container mx-auto flex items-center justify-between relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="text-white bg-transparent border-b-2 outline-none font-normal border-white w-full py-2 text-xl"
              />
            </div>
          </div>
        )}
      </header>
      {modal && (
        <Modal>
          <PresentationForm onClose={toggleModal} />
        </Modal>
      )}
    </>
  );
};

const PresentationForm = ({ onClose }: any) => {
  return (
    <Card style={'w-[650px] duration-300'}>
      <div className="flex justify-between items-center mb-4">
        <p className="text-[30px] font-marcellus">Book a Presentation Now</p>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          Close
        </button>
      </div>
      <div className="mt-12">
        <p className="font-marcellus text-[20px] mb-4">Property</p>
        <hr />
        <input
          type="text"
          className="mt-3 w-full py-4 border px-4 bg-gray-100"
          placeholder="Search"
        />
      </div>
      <div className="mt-12">
        <p className="font-marcellus text-[20px] mb-4">Personal Information</p>
        <hr />
        <form className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex">
            <input
              type="text"
              className="mt-3 flex-1 py-4 border px-4 bg-gray-100 mr-2"
              placeholder="Time"
            />
            <input
              type="text"
              className="mt-3 flex-1 py-4 border px-4 bg-gray-100 ml-2"
              placeholder="Name"
            />
          </div>
          <div className="col-span-2 flex">
            <input
              type="text"
              className="mt-3 flex-1 py-4 border px-4 bg-gray-100 mr-2"
              placeholder="Phone"
            />
            <input
              type="text"
              className="mt-3 flex-1 py-4 border px-4 bg-gray-100 ml-2"
              placeholder="Email"
            />
          </div>
        </form>
      </div>
      <div className="col-span-2">
        <textarea
          className="mt-3 w-full py-4 border px-4 bg-gray-100"
          rows={4}
          placeholder="Enter your message"
        />
      </div>

      <div className="col-span-2 flex items-center">
        <input type="checkbox" id="agreeCheckbox" className="mr-2" />
        <label htmlFor="agreeCheckbox" className="text-gray-600">
          By submitting this form I agree to Terms of use
        </label>
      </div>

      <div className="col-span-2 mt-12">
        <button
          className="w-full bg-[#733A07] text-white py-3 rounded uppercase h-[60px]"
          type="submit"
        >
          Submit your request
        </button>
      </div>
    </Card>
  );
};

export default Header;
