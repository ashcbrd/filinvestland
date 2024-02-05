"use client";
import React from "react";

const BorderButton = ({
  buttonText = "Learn More",
  bgColor = "transparent",
  borderColor = "white",
  textColor = "white",
  sidePadding = "12",
  isAlt = false,
}: {
  buttonText?: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  sidePadding?: string;
  isAlt?: boolean;
}) => {
  let border = "border-white";
  if (borderColor === "dark-cornflower-blue") {
    border = "border-dark-cornflower-blue";
  }
  const parentTag = `relative px-${sidePadding} py-4 overflow-hidden font-medium bg-${bgColor} group relative`;
  const topLine = `absolute top-0 left-0 ${
    isAlt ? "w-full" : "w-11/12"
  } h-0 transition-all duration-200 border-t-[1px] ${border} group-hover:w-full ${
    borderColor === "white"
      ? "group-hover:border-blue"
      : "group-hover:border-alice-blue"
  } ease`;
  const rightLine = `absolute ${
    isAlt ? "top-0" : "bottom-0"
  } right-0 w-0 h-4/5 w-0 transition-all duration-200 border-r-[1px] ${border} group-hover:mb-2.5 ${
    borderColor === "white"
      ? "group-hover:border-blue"
      : "group-hover:border-alice-blue"
  } ease`;
  const bottomLine = `absolute bottom-0 ${
    isAlt ? "left-0" : "right-0"
  } w-11/12 h-0 transition-all duration-200 border-b-[1px] ${border} group-hover:mr-3.5 ${
    borderColor === "white"
      ? "group-hover:border-blue"
      : "group-hover:border-alice-blue"
  } ease`;
  const leftLine = `absolute top-0 left-0 w-0 ${
    isAlt ? "h-full" : "h-4/5"
  } w-0 transition-all duration-200 border-l-[1px] ${border} group-hover:h-full ${
    borderColor === "white"
      ? "group-hover:border-blue"
      : "group-hover:border-alice-blue"
  } ease`;
  const text = `relative transition-colors duration-300 delay-200 text-${textColor} font-bold ease text-base`;
  const bgColorAnimate = `${
    borderColor === "white" ? "bg-blue" : "bg-alice-blue"
  } absolute top-0 left-0 h-full w-0 transition-all duration-500 group-hover:w-full ease`;
  return (
    <span className={parentTag}>
      <span className={bgColorAnimate}></span>
      <span className={topLine}></span>
      <span className={rightLine}></span>
      <span className={bottomLine}></span>
      <span className={leftLine}></span>
      <span className={text}>{buttonText}</span>
    </span>
  );
};

export default BorderButton;
