import React from "react";

const ArrowRight = ({
  color = "white",
  width = 22,
  height = 16,
}: {
  color?: string;
  height?: number;
  width?: number;
}) => {
  return (
    <svg
      width={width}
      height={16}
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.29289L15.3431 0.928932C14.9526 0.538408 14.3195 0.538408 13.9289 0.928932C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM0 9L21 9V7L0 7L0 9Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowRight;