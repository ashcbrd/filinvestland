import React from "react";

const Grid = ({
  color = "#303030",
  ...props
}: { color?: string } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="23.147"
      viewBox="0 0 36 23.147"
      {...props}
    >
      <path
        id="box-1"
        d="M25.713,7.2V17.487H36V7.2Zm7.713,7.713h-5.14V9.773h5.14ZM0,30.347H10.287V20.06H0Zm2.573-7.713h5.14v5.139H2.573v-5.14ZM0,17.487H10.287V7.2H0ZM2.573,9.773h5.14v5.14H2.573ZM12.86,17.486H23.147V7.2H12.86V17.487Zm2.567-7.713h5.14v5.14h-5.14ZM12.861,30.346H23.148V20.06H12.86V30.347Zm2.566-7.713h5.14v5.14h-5.14Zm10.287,7.713H36V20.06H25.713V30.347Zm2.573-7.713h5.14v5.14h-5.14v-5.14Z"
        transform="translate(0 -7.2)"
        fill={color}
      />
    </svg>
  );
};

export default Grid;
