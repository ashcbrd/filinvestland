import React from "react";

const Flag = ({
  color = "#163e82",
  classes,
}: {
  color?: string;
  classes?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30.8"
      height="38.5"
      viewBox="0 0 30.8 38.5"
      className={classes}
    >
      <path
        id="flag"
        d="M9.85,22.25V39.575a1.925,1.925,0,0,1-3.85,0V6.85A3.861,3.861,0,0,1,9.85,3H21.4a3.859,3.859,0,0,1,3.847,3.85h7.7A3.85,3.85,0,0,1,36.8,10.7V22.25a3.85,3.85,0,0,1-3.85,3.85H23.325a3.85,3.85,0,0,1-3.845-3.85Zm0-15.4V18.4H23.325v3.85h9.629V10.7H21.4V6.85Z"
        transform="translate(-6 -3)"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};

export default Flag;
