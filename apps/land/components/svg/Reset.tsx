import React from "react";

const Reset = ({
  color = "#000",
  ...props
}: { color?: string } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="31.162"
      height="25.79"
      viewBox="0 0 31.162 25.79"
      {...props}
    >
      <path
        id="reset"
        d="M19.393,30.29A12.895,12.895,0,1,0,6.5,17.395v6.662L2.629,20.189l-1.5,1.5,6.447,6.447,6.447-6.447-1.5-1.5L8.647,24.057V17.395A10.746,10.746,0,1,1,19.393,28.141Z"
        transform="translate(-1.125 -4.5)"
        fill={color}
      />
    </svg>
  );
};

export default Reset;
