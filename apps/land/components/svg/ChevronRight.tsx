import React from "react";

const ChevronRight = ({
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
        d="M1.57446 12.54L7.50075 7.03621M7.49846 6.88335L1.42622 1.54097"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ChevronRight;
