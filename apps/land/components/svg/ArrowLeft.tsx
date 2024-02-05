import React from "react";

const ArrowLeft = ({
  color = "white",
  width = 23,
  height = 16,
}: {
  color?: string;
  height?: number;
  width?: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.290777 7.32811C-0.0985173 7.71986 -0.096527 8.35302 0.295223 8.74232L6.67916 15.0862C7.07091 15.4755 7.70407 15.4735 8.09336 15.0818C8.48266 14.69 8.48067 14.0569 8.08892 13.6676L2.41431 8.02855L8.05335 2.35394C8.44265 1.96219 8.44066 1.32903 8.04891 0.939732C7.65716 0.550437 7.024 0.552427 6.6347 0.944177L0.290777 7.32811ZM21.9969 6.96698L0.99696 7.033L1.00325 9.03299L22.0031 8.96698L21.9969 6.96698Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowLeft;
