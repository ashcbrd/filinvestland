import React from "react";

const PersonOutline = ({
  color = "#9b9b9b",
  classes,
}: {
  color?: string;
  classes?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20.106"
      height="21.641"
      viewBox="0 0 20.106 21.641"
      className={classes}
    >
      <g id="person-outline" transform="translate(-3.697 -2.575)">
        <path
          id="Path_1111"
          data-name="Path 1111"
          d="M20.285,8c-.189,2.547-2.12,4.625-4.24,4.625S11.991,10.547,11.806,8a4.155,4.155,0,0,1,4.24-4.625A4.178,4.178,0,0,1,20.285,8Z"
          transform="translate(-2.296)"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <path
          id="Path_1112"
          data-name="Path 1112"
          d="M13.75,21.375c-4.191,0-8.445,2.312-9.233,6.677a.81.81,0,0,0,.754,1.031H22.229a.809.809,0,0,0,.754-1.031C22.2,23.687,17.941,21.375,13.75,21.375Z"
          transform="translate(0 -5.667)"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
        />
      </g>
    </svg>
  );
};

export default PersonOutline;
