import React from "react";

const Elevator = ({
  color = "#9b9b9b",
  classes,
}: {
  color?: string;
  classes?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15.933"
      height="22.467"
      viewBox="0 0 15.933 22.467"
      className={classes}
    >
      <g id="elevator" transform="translate(-6.75 -2.137)">
        <path
          id="Path_1108"
          data-name="Path 1108"
          d="M14.717,2.137,6.75,9.022v3.153H22.683V9.023Zm6.373,8.445H8.343V9.752l6.373-5.508L21.09,9.752Z"
          fill={color}
        />
        <path
          id="Path_1109"
          data-name="Path 1109"
          d="M6.75,22.841l7.967,6.885,7.967-6.885V19.688H6.75Zm1.593-1.559H21.09v.831l-6.373,5.507L8.343,22.111Z"
          transform="translate(0 -5.122)"
          fill="#9b9b9b"
        />
      </g>
    </svg>
  );
};

export default Elevator;
