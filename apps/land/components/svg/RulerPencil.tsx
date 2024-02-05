import React from "react";

const RulerPencil = ({
  color = "#000000",
  className,
}: {
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33.166"
      height="33.006"
      viewBox="0 0 33.166 33.006"
      className={className}
    >
      <g id="ruler-pencil-line" transform="translate(-2 -0.994)">
        <path
          id="Path_1105"
          data-name="Path 1105"
          d="M9,17.41V27h9.59l-2-2H11V19.41Z"
          fill={color}
        />
        <path
          id="Path_1106"
          data-name="Path 1106"
          d="M34.87,32.29,32,29.38V32H4V27.85H6v-1.6H4V19.6H6V18H4V11.6H6V10H4V4.41L19.94,20.26V17.44L3.71,1.29A1,1,0,0,0,2,2V33a1,1,0,0,0,1,1H34.16a1,1,0,0,0,.71-1.71Z"
          fill={color}
        />
        <path
          id="Path_1107"
          data-name="Path 1107"
          d="M24,30h4a2,2,0,0,0,2-2V8.7L27.7,4.47a2.01,2.01,0,0,0-3.52.08L22,8.72V28A2,2,0,0,0,24,30ZM24,9.2l1.94-3.77L28,9.21V24H24Zm0,16.43h4v2.44H24Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default RulerPencil;
