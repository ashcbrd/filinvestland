import React from "react";

const Lightning = ({
  color = "#9b9b9b",
  classes,
}: {
  color?: string;
  classes?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18.5"
      height="26.909"
      viewBox="0 0 18.5 26.909"
      className={classes}
    >
      <g id="lightning" transform="translate(-5.624 0.001)">
        <path
          id="Path_1110"
          data-name="Path 1110"
          d="M20.342.114a.841.841,0,0,1,.382.975l-3.029,9.841h5.588a.841.841,0,0,1,.612,1.418L10.441,26.643a.841.841,0,0,1-1.416-.824l3.029-9.843H6.466a.841.841,0,0,1-.612-1.418L19.307.264A.841.841,0,0,1,20.342.113ZM8.411,14.294h4.781a.841.841,0,0,1,.8,1.088l-2.3,7.472,9.639-10.242h-4.78a.841.841,0,0,1-.8-1.088l2.3-7.471Z"
          transform="translate(0 0)"
          fill={color}
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};

export default Lightning;
