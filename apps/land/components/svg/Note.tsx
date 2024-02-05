import React from "react";

const Note = ({
  color = "#163e82",
  className,
}: {
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
    >
      <g id="Group_772" data-name="Group 772" transform="translate(-296 -707)">
        <circle
          id="Ellipse_115"
          data-name="Ellipse 115"
          cx="30"
          cy="30"
          r="30"
          transform="translate(296 707)"
          fill={color}
        />
        <g id="notes" transform="translate(312.8 724.143)">
          <path
            id="Path_1130"
            data-name="Path 1130"
            d="M7.875,10.688H24.846v1.886H7.875Z"
            transform="translate(-3.161 -4.559)"
            fill="#fff"
          />
          <path
            id="Path_1131"
            data-name="Path 1131"
            d="M7.875,16.875H24.846v1.886H7.875Z"
            transform="translate(-3.161 -5.561)"
            fill="#fff"
          />
          <path
            id="Path_1132"
            data-name="Path 1132"
            d="M7.875,23.063h8.958v1.886H7.875Z"
            transform="translate(-3.161 -6.563)"
            fill="#fff"
          />
          <path
            id="Path_1133"
            data-name="Path 1133"
            d="M28.65,3.375H2.25V27.889h26.4ZM26.764,26H4.136V5.261H26.764Z"
            transform="translate(-2.25 -3.375)"
            fill="#fff"
          />
        </g>
      </g>
    </svg>
  );
};

export default Note;
