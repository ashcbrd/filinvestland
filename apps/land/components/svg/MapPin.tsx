import React from "react";

const MapPin = ({
  color = "#163e82",
  ...props
}: { color?: string } & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      id="location_on_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="27.977"
      height="27.977"
      viewBox="0 0 27.977 27.977"
      {...props}
    >
      <path
        id="Path_42"
        data-name="Path 42"
        d="M0,0H27.977V27.977H0Z"
        fill="none"
      />
      <path
        id="Path_43"
        data-name="Path 43"
        d="M13.16,2A8.154,8.154,0,0,0,5,10.16c0,6.12,8.16,15.154,8.16,15.154s8.16-9.034,8.16-15.154A8.154,8.154,0,0,0,13.16,2Zm0,11.074a2.914,2.914,0,1,1,2.914-2.914A2.915,2.915,0,0,1,13.16,13.074Z"
        transform="translate(0.828 0.331)"
        fill={color}
      />
    </svg>
  );
};

export default MapPin;
