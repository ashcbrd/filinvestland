"use client";

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";
import { useState } from "react";

const Share = ({ url }: { url: any }) => {
  const home = `${window.location.protocol}//${window.location.host}${url}`;
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);
  return (
    <div className="relative flex items-center">
      <div
        className="absolute right-[100%] top-[50%] mx-[15px] flex translate-y-[-50%] overflow-hidden transition-all duration-[0.3s] ease-in-out smd:!left-[100%] smd:!right-auto"
        style={{ width }}
      >
        <div
          className={`flex flex-shrink-0 items-center justify-end gap-[10px] bg-white p-[10px] px-[15px] smd:justify-start`}
          style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 40px 2px" }}
          ref={(newRef) => {
            if (newRef) {
              if (isOpen) {
                setWidth(newRef.clientWidth);
              } else {
                setWidth(0);
              }
            }
          }}
        >
          <FacebookShareButton url={home}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={home}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={home}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <EmailShareButton url={home}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <svg
          width="21"
          height="23"
          viewBox="0 0 21 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.4792 15.2466C15.3932 15.2466 14.4147 15.7156 13.7356 16.4616L7.62744 12.6786C7.79052 12.2611 7.88096 11.8077 7.88096 11.3333C7.88096 10.8588 7.79052 10.4054 7.62744 9.98808L13.7356 6.20483C14.4147 6.95086 15.3932 7.42003 16.4792 7.42003C18.525 7.42003 20.1893 5.75572 20.1893 3.70993C20.1893 1.66413 18.525 0 16.4792 0C14.4334 0 12.7691 1.6643 12.7691 3.7101C12.7691 4.18445 12.8597 4.63788 13.0226 5.05534L6.91461 8.83842C6.23551 8.09239 5.25705 7.62322 4.17104 7.62322C2.12524 7.62322 0.460938 9.2877 0.460938 11.3333C0.460938 13.3791 2.12524 15.0434 4.17104 15.0434C5.25705 15.0434 6.23551 14.5744 6.91461 13.8282L13.0226 17.6113C12.8597 18.0288 12.7691 18.4822 12.7691 18.9567C12.7691 21.0023 14.4334 22.6666 16.4792 22.6666C18.525 22.6666 20.1893 21.0023 20.1893 18.9567C20.1893 16.9109 18.525 15.2466 16.4792 15.2466ZM14.1219 3.7101C14.1219 2.41034 15.1794 1.35285 16.4792 1.35285C17.7789 1.35285 18.8364 2.41034 18.8364 3.7101C18.8364 5.00986 17.7789 6.06735 16.4792 6.06735C15.1794 6.06735 14.1219 5.00986 14.1219 3.7101ZM4.17104 13.6906C2.8711 13.6906 1.81362 12.6331 1.81362 11.3333C1.81362 10.0336 2.8711 8.97607 4.17104 8.97607C5.4708 8.97607 6.52811 10.0336 6.52811 11.3333C6.52811 12.6331 5.4708 13.6906 4.17104 13.6906ZM14.1219 18.9565C14.1219 17.6568 15.1794 16.5993 16.4792 16.5993C17.7789 16.5993 18.8364 17.6568 18.8364 18.9565C18.8364 20.2563 17.7789 21.3138 16.4792 21.3138C15.1794 21.3138 14.1219 20.2563 14.1219 18.9565Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  );
};

export default Share;
