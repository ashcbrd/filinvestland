"use client";
import React from "react";
import numbro from "numbro";
import { Typography } from "../typography/typography";

// const prevIcon = (
//   <svg
//     width="120"
//     height="120"
//     viewBox="0 0 138 136"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <g filter="url(#filter0_d_77_2265)">
//       <path
//         d="M94.766 63.7806C94.766 77.4983 83.2479 88.6481 69.0026 88.6481C54.7574 88.6481 43.2393 77.4983 43.2393 63.7806C43.2393 50.0629 54.7574 38.9131 69.0026 38.9131C83.2479 38.9131 94.766 50.0629 94.766 63.7806Z"
//         stroke="white"
//         shape-rendering="crispEdges"
//       />
//     </g>
//     <path d="M71.9209 58.1436L65.3551 64.4854L71.9209 70.8273" stroke="white" />
//     <defs>
//       <filter
//         id="filter0_d_77_2265"
//         x="0.739258"
//         y="0.413086"
//         width="136.527"
//         height="134.735"
//         filterUnits="userSpaceOnUse"
//         color-interpolation-filters="sRGB"
//       >
//         <feFlood floodOpacity="0" result="BackgroundImageFix" />
//         <feColorMatrix
//           in="SourceAlpha"
//           type="matrix"
//           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//           result="hardAlpha"
//         />
//         <feMorphology
//           radius="2"
//           operator="dilate"
//           in="SourceAlpha"
//           result="effect1_dropShadow_77_2265"
//         />
//         <feOffset dy="4" />
//         <feGaussianBlur stdDeviation="20" />
//         <feComposite in2="hardAlpha" operator="out" />
//         <feColorMatrix
//           type="matrix"
//           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
//         />
//         <feBlend
//           mode="normal"
//           in2="BackgroundImageFix"
//           result="effect1_dropShadow_77_2265"
//         />
//         <feBlend
//           mode="normal"
//           in="SourceGraphic"
//           in2="effect1_dropShadow_77_2265"
//           result="shape"
//         />
//       </filter>
//     </defs>
//   </svg>
// );

// const nextIcon = (
//   <svg
//     width="120"
//     height="120"
//     viewBox="0 0 137 136"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <g filter="url(#filter0_d_77_2268)">
//       <path
//         d="M42.9127 63.7809C42.9127 50.0632 54.4309 38.9134 68.6761 38.9134C82.9213 38.9134 94.4395 50.0632 94.4395 63.7809C94.4395 77.4987 82.9213 88.6484 68.6761 88.6484C54.4309 88.6484 42.9127 77.4987 42.9127 63.7809Z"
//         stroke="white"
//         shape-rendering="crispEdges"
//       />
//     </g>
//     <path d="M65.7578 69.418L72.3237 63.0761L65.7578 56.7342" stroke="white" />
//     <defs>
//       <filter
//         id="filter0_d_77_2268"
//         x="0.412598"
//         y="0.413391"
//         width="136.527"
//         height="134.735"
//         filterUnits="userSpaceOnUse"
//         color-interpolation-filters="sRGB"
//       >
//         <feFlood floodOpacity="0" result="BackgroundImageFix" />
//         <feColorMatrix
//           in="SourceAlpha"
//           type="matrix"
//           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//           result="hardAlpha"
//         />
//         <feMorphology
//           radius="2"
//           operator="dilate"
//           in="SourceAlpha"
//           result="effect1_dropShadow_77_2268"
//         />
//         <feOffset dy="4" />
//         <feGaussianBlur stdDeviation="20" />
//         <feComposite in2="hardAlpha" operator="out" />
//         <feColorMatrix
//           type="matrix"
//           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
//         />
//         <feBlend
//           mode="normal"
//           in2="BackgroundImageFix"
//           result="effect1_dropShadow_77_2268"
//         />
//         <feBlend
//           mode="normal"
//           in="SourceGraphic"
//           in2="effect1_dropShadow_77_2268"
//           result="shape"
//         />
//       </filter>
//     </defs>
//   </svg>
// );

const SliderCard = (props: any) => {
  const { data } = props;
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const imgSrc = data?.PropertyImages?.map((item: any) => item.image.url);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgSrc.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgSrc.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="card bg-base-100 flex w-full flex-col">
      <div className="relative">
        <img
          src={imgSrc[currentImageIndex]}
          className="h-[340px] w-full transform object-cover transition-transform duration-500"
        />

        <div className="absolute bottom-6 left-6 flex items-center gap-3">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white outline-none transition-all hover:scale-105 hover:bg-black/10"
            aria-label="Previous"
            onClick={prevImage}
          >
            <span className="block h-2 w-2 rotate-45 transform border border-white border-r-transparent border-t-transparent" />
          </button>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white outline-none transition-all hover:scale-105 hover:bg-black/10"
            aria-label="Next"
            onClick={nextImage}
          >
            <span className="block h-2 w-2 rotate-45 transform border border-white border-b-transparent border-l-transparent" />
          </button>
        </div>

        <div className="absolute left-6 top-6 flex w-[160px] items-center rounded-full border border-[#261119] bg-[#fff] px-6 py-2">
          <img
            src={"/assets/images/link.png"}
            alt="Banner"
            className="mr-2 h-[16px] w-[16px]"
          />
          <p className="absolute ml-6 text-[12px] font-[500] uppercase text-black">
            {data.propertyType.title}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md">
        <div className="flex items-center justify-between border-b border-[#DDDDDD] px-5 py-4">
          <Typography
            size="heading2"
            color="dark"
            font="cormorant"
            text={data.title}
            className="!text-lg sm:!text-xl"
          />
          <div className="flex items-center">
            <svg
              width="12"
              height="18"
              viewBox="0 0 12 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M6 0C2.69166 0 0 2.69167 0 6.00001C0 6.99318 0.248308 7.9779 0.72035 8.85132L5.67189 17.8066C5.73781 17.926 5.86342 18 6 18C6.13658 18 6.26219 17.926 6.32811 17.8066L11.2815 8.84837C11.7517 7.9779 12 6.99314 12 5.99998C12 2.69167 9.30834 0 6 0ZM6 9C4.34583 9 3.00002 7.65418 3.00002 6.00001C3.00002 4.34584 4.34583 3.00002 6 3.00002C7.65417 3.00002 8.99998 4.34584 8.99998 6.00001C8.99998 7.65418 7.65417 9 6 9Z"
                fill="#9F4C03"
              />
            </svg>
            <p className="text-base text-[#5F5F5F]">{data.location.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-5 py-4">
          <div className="flex flex-col justify-center border-r border-[#DDDDDD]">
            <p className="text-base text-[#878787]">Price Range</p>
            <p className="text-base">
              ₱ {numbro(0).format("0a")} - {numbro(0).format("0a")}
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-base text-[#878787]">Unit Type</p>
            <p className="text-base">
              {data.propertyDetails.numberOfBedrooms} BR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
