import React from "react";

const ChevronLeft = ({
  color = "white",
  classes,
}: {
  color?: string;
  classes?: string;
}) => {
  return (
    <svg
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
    >
      <path
        d="M7.14777 1.08079L1.07543 6.42298M1.0736 6.57584L6.99978 12.0798"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ChevronLeft;
