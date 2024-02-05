import React from "react";

const Bed = ({
  color = "#000000",
  className = "",
}: {
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33.75"
      height="24.188"
      viewBox="0 0 33.75 24.188"
      className={className}
    >
      <path
        id="bed"
        d="M29.25,15.75H14.625v8.481H13.067V21.348a6.168,6.168,0,0,0-6.16-6.16H3.375v-4.5H1.125V34.876h2.25V31.519l29.25.234v3.122h2.25v-13.5A5.631,5.631,0,0,0,29.25,15.75ZM3.375,17.438H6.907a3.915,3.915,0,0,1,3.911,3.911v2.883H3.375ZM32.625,29.5l-29.25-.234V26.482h29.25Zm0-5.271H16.875V18H29.25a3.379,3.379,0,0,1,3.375,3.375Z"
        transform="translate(-1.125 -10.688)"
        fill={color}
      />
    </svg>
  );
};

export default Bed;
