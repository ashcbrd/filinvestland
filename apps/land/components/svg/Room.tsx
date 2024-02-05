import React from "react";

const Room = ({ color = "#163e82" }: { color?: string }) => {
  return (
    <svg
      id="room"
      xmlns="http://www.w3.org/2000/svg"
      width="45.251"
      height="45"
      viewBox="0 0 45.251 45"
    >
      <path
        id="Path_725"
        data-name="Path 725"
        d="M41.1,39.66V7.985H32.8V.914L7.913,5.206V39.66H1.125v3.017H9.317L32.8,45.914V11h5.28V42.676h8.3V39.66ZM29.783,42.454l-18.855-2.6V7.746L29.783,4.5Z"
        transform="translate(-1.125 -0.914)"
        fill={color}
      />
      <path
        id="Path_726"
        data-name="Path 726"
        d="M18,16.313h3.017v6.033H18Z"
        transform="translate(4.625 4.333)"
        fill={color}
      />
    </svg>
  );
};

export default Room;
