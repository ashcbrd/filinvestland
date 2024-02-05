import React from "react";

const Diamond = ({ color = "#0550E3" }: { color?: string }) => {
  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.99998 0.0149936L13.0765 6.71366L0.952196 6.73963L6.99998 0.0149936Z"
        fill={color}
      />
      <path
        d="M7.13867 13.057L0.972587 6.44063L13.0955 6.2516L7.13867 13.057Z"
        fill={color}
      />
    </svg>
  );
};

export default Diamond;
