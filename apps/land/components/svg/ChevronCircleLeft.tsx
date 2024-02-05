import React from "react";
import { ChevronCircle } from "./ChevronCircleRight";

const ChevronCircleLeft = ({
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
        d="M21.1477 13.0808L15.0754 18.423M15.0735 18.5758L20.9997 24.0798"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ChevronCircleLeft;
