import React, { FunctionComponent } from "react";

interface CustomNavigationProps {
  onClick: () => void;
  direction: "prev" | "next";
}

const CustomNavigation: FunctionComponent<CustomNavigationProps> = ({
  onClick,
  direction,
}) => {
  return (
    <button
      onClick={onClick}
      className={`custom-navigation custom-${direction}-button bg-orage-500 w-14 h-14 overflow-hidden flex items-center justify-center`}
    >
      {direction === "prev" ? (
        <div>
          <svg
            width="124"
            height="123"
            viewBox="0 0 124 123"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <g filter="url(#filter0_d_672_10369)">
              <ellipse
                cx="61.5842"
                cy="57.842"
                rx="19.5842"
                ry="19.1584"
                fill="#E12827"
              />
            </g>
            <path
              d="M63.76 53.1602L58.864 57.8404L63.76 62.5207"
              stroke="white"
              stroke-width="2"
            />
            <defs>
              <filter
                id="filter0_d_672_10369"
                x="0"
                y="0.683594"
                width="123.168"
                height="122.316"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="2"
                  operator="dilate"
                  in="SourceAlpha"
                  result="effect1_dropShadow_672_10369"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="20" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_672_10369"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_672_10369"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      ) : (
        <div>
          <svg
            width="124"
            height="123"
            viewBox="0 0 124 123"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_672_10366)">
              <ellipse
                cx="62.4158"
                cy="57.8416"
                rx="19.5842"
                ry="19.1584"
                transform="rotate(-180 62.4158 57.8416)"
                fill="#E12827"
              />
            </g>
            <path
              d="M60.2402 62.5234L65.1363 57.8432L60.2402 53.1629"
              stroke="white"
              stroke-width="2"
            />
            <defs>
              <filter
                id="filter0_d_672_10366"
                x="0.831787"
                y="0.683594"
                width="123.168"
                height="122.316"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="2"
                  operator="dilate"
                  in="SourceAlpha"
                  result="effect1_dropShadow_672_10366"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="20" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_672_10366"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_672_10366"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      )}
    </button>
  );
};

export default CustomNavigation;
