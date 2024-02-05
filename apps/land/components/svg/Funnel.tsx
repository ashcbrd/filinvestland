import React from "react";

const Funnel = ({
  color = "#163e82",
  className,
}: {
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24.666"
      height="22.353"
      viewBox="0 0 24.666 22.353"
      className={className}
    >
      <path
        id="filter-line"
        d="M25.9,4H2.771A.771.771,0,0,0,2,4.771V6.058a1.38,1.38,0,0,0,.409.979l8.841,8.972v7.862l1.542.586v-8.9a.771.771,0,0,0-.224-.547L3.542,6V5.542H25.124v.47l-9,9a.771.771,0,0,0-.254.547V25.744l1.542.609V15.948l8.841-8.864a1.4,1.4,0,0,0,.409-1V4.771A.771.771,0,0,0,25.9,4Z"
        transform="translate(-2 -4)"
        color={color}
      />
    </svg>
  );
};

export default Funnel;
