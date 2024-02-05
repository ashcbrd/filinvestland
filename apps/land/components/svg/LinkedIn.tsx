"use client";
import React, { useState } from "react";

const LinkedIn = ({ color = "white" }: { color?: string }) => {
  const [isHovering, setisHovering] = useState(false);
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition hover:opacity-90"
      onMouseEnter={() => setisHovering(true)}
      onMouseLeave={() => setisHovering(false)}
    >
      <g clipPath="url(#clip0_238_27)">
        <path
          d="M4.18994 5.79077H0.57641C0.416035 5.79077 0.286087 5.92078 0.286087 6.08109V17.6898C0.286087 17.8502 0.416035 17.9801 0.57641 17.9801H4.18994C4.35031 17.9801 4.48026 17.8502 4.48026 17.6898V6.08109C4.48026 5.92078 4.35031 5.79077 4.18994 5.79077Z"
          fill={isHovering ? "#1AC0E8" : color}
        />
        <path
          d="M2.38448 0.0197983C1.06966 0.0197983 0 1.0883 0 2.40166C0 3.7156 1.06966 4.78451 2.38448 4.78451C3.69825 4.78451 4.76704 3.71555 4.76704 2.40166C4.7671 1.0883 3.69825 0.0197983 2.38448 0.0197983Z"
          fill={isHovering ? "#1AC0E8" : color}
        />
        <path
          d="M13.3812 5.50225C11.9299 5.50225 10.857 6.12615 10.2063 6.83506V6.0811C10.2063 5.92078 10.0763 5.79077 9.91596 5.79077H6.45538C6.295 5.79077 6.16505 5.92078 6.16505 6.0811V17.6898C6.16505 17.8502 6.295 17.9801 6.45538 17.9801H10.061C10.2214 17.9801 10.3513 17.8502 10.3513 17.6898V11.9462C10.3513 10.0107 10.877 9.2567 12.2262 9.2567C13.6956 9.2567 13.8124 10.4655 13.8124 12.0458V17.6899C13.8124 17.8502 13.9423 17.9802 14.1027 17.9802H17.7097C17.87 17.9802 18 17.8502 18 17.6899V11.3223C18 8.44432 17.4512 5.50225 13.3812 5.50225Z"
          fill={isHovering ? "#1AC0E8" : color}
        />
      </g>
      <defs>
        <clipPath id="clip0_238_27">
          <rect width="18" height="18" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LinkedIn;
