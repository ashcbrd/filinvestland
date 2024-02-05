import React from "react";

const SizeBox = ({
  color = "white",
  classes,
}: {
  color?: string;
  classes?: string;
}) => {
  return (
    <svg
      width="45"
      height="43"
      viewBox="0 0 45 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
    >
      <rect
        x="6.95453"
        y="6.31818"
        width="31.0909"
        height="31.0909"
        stroke={color}
        strokeWidth="3"
      />
      <rect y="15.7273" width="12.2727" height="12.2727" fill="white" />
      <rect
        x="32.7273"
        y="15.7273"
        width="12.2727"
        height="12.2727"
        fill="white"
      />
      <rect
        x="16.3636"
        y="0.727264"
        width="12.2727"
        height="12.2727"
        fill="white"
      />
      <rect
        x="16.3636"
        y="30.7273"
        width="12.2727"
        height="12.2727"
        fill="white"
      />
    </svg>
  );
};

export default SizeBox;
