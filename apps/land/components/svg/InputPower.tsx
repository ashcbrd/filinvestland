import React from "react";

const InputPower = ({
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
      height="26.429"
      viewBox="0 0 18.5 26.429"
      className={classes}
    >
      <path
        id="input-power"
        d="M9.712,1.125V6.851H6.188V17.368l5.726,5.286v4.9h7.048v-4.9l5.726-5.286V6.851H21.165V1.125H19.4V6.851H11.474V1.125ZM22.926,8.613V16.6L17.2,21.882v3.909H13.676V21.882L7.949,16.6V8.613Z"
        transform="translate(-6.188 -1.125)"
        fill={color}
      />
    </svg>
  );
};

export default InputPower;
