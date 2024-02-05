import React from "react";

export type ChevronCircle = {
  color?: string;
  fill?: string;
};

const ChevronCircleRight = ({
  color = "black",
  fill = "none",
}: ChevronCircle) => {
  return (
    <svg
      width="39"
      height="37"
      viewBox="0 0 39 37"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38 18.5C38 28.116 29.7675 36 19.5 36C9.23248 36 1 28.116 1 18.5C1 8.88397 9.23248 1 19.5 1C29.7675 1 38 8.88397 38 18.5Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M17.1484 24.0799L23.0747 18.5762M23.0724 18.4233L17.0001 13.0809"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ChevronCircleRight;
