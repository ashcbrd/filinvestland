"use client";

import React, { useState } from "react";
import numbro from "numbro";
import Link from "next/link";
import Button from "../button";
import { usePathname, useRouter } from "next/navigation";
import { useVirtualTour } from "@/app/context/VirtualTourContext";
import { useVirtualTourUrl } from "@/app/context/VirtualTourUrlContext";

interface Props {
  imgSrc: any;
  title: string;
  location: string;
  type: string;
  addtionalCss?: string;
  redirect: () => void;
  minPrice: any;
  maxPrice: any;
  numberOfBedrooms: any;
  id: string;
  onSetProjectId: any;
  onShowModal: (id: string) => void;
  virtualRedirect: any;
  slug: string;
  propertyStatus: any;
}

const prevIcon = (
  <div className="flex items-center">
    <svg
      width="120"
      height="120"
      viewBox="0 0 138 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_77_2265)">
        <path
          d="M94.766 63.7806C94.766 77.4983 83.2479 88.6481 69.0026 88.6481C54.7574 88.6481 43.2393 77.4983 43.2393 63.7806C43.2393 50.0629 54.7574 38.9131 69.0026 38.9131C83.2479 38.9131 94.766 50.0629 94.766 63.7806Z"
          stroke="white"
          shape-rendering="crispEdges"
        />
      </g>
      <path
        d="M71.9209 58.1436L65.3551 64.4854L71.9209 70.8273"
        stroke="white"
      />
      <defs>
        <filter
          id="filter0_d_77_2265"
          x="0.739258"
          y="0.413086"
          width="136.527"
          height="134.735"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
            result="effect1_dropShadow_77_2265"
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
            result="effect1_dropShadow_77_2265"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_77_2265"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </div>
);

const nextIcon = (
  <div className="flex items-center">
    <svg
      width="120"
      height="120"
      viewBox="0 0 137 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_77_2268)">
        <path
          d="M42.9127 63.7809C42.9127 50.0632 54.4309 38.9134 68.6761 38.9134C82.9213 38.9134 94.4395 50.0632 94.4395 63.7809C94.4395 77.4987 82.9213 88.6484 68.6761 88.6484C54.4309 88.6484 42.9127 77.4987 42.9127 63.7809Z"
          stroke="white"
          shape-rendering="crispEdges"
        />
      </g>
      <path
        d="M65.7578 69.418L72.3237 63.0761L65.7578 56.7342"
        stroke="white"
      />
      <defs>
        <filter
          id="filter0_d_77_2268"
          x="0.412598"
          y="0.413391"
          width="136.527"
          height="134.735"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
            result="effect1_dropShadow_77_2268"
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
            result="effect1_dropShadow_77_2268"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_77_2268"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </div>
);

function Propcard(props: Props) {
  const {
    imgSrc,
    title,
    location,
    type,
    redirect,
    minPrice,
    maxPrice,
    numberOfBedrooms,
    id,
    onSetProjectId,
    onShowModal,
    virtualRedirect,
    slug,
    propertyStatus,
  } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgSrc.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgSrc.length - 1 : prevIndex - 1
    );
  };

  const router = useRouter();
  const pathname = usePathname();

  const home = pathname === "/";
  const news = pathname.includes("/news");
  const blogs = pathname.includes("/blogs");
  const virtual = pathname === "/virtual-tour";

  const { startVirtualTour } = useVirtualTour();

  const { setVirtualTourUrlEmbed } = useVirtualTourUrl();

  return (
    <div
      className={`card ${
        news || blogs ? "w-full !px-0" : "flex-1"
      } relative max-md:w-full ${
        news || blogs ? "pb-[30px]" : "pb-[64px]"
      } flex flex-col`}
    >
      <div
        className="overflow-hidden rounded-[20px]"
        style={{ boxShadow: "0px 4px 40px 2px rgba(0, 0, 0, 0.10)" }}
      >
        <div className="relative">
          <div
            className="group relative h-[260px] overflow-hidden bg-cover bg-center xl:h-[323px]"
            style={{ backgroundImage: `url(${imgSrc})` }}
          >
            {propertyStatus?.id === "6538e70c3a484c06a66cbacb" && (
              <div className="absolute z-[99] py-4 top-0 bottom-0 left-0 right-0 m-auto bg-black/60 h-max w-full">
                <p className="w-full text-center text-white font-semibold">
                  {propertyStatus?.title}
                </p>
              </div>
            )}
            <div className="jusitfy-center absolute left-0 top-0  flex h-[323px] w-full items-center bg-black/60 opacity-0 backdrop-blur-[1px] transition-all group-hover:opacity-100 z-[100]">
              <div className="mx-auto flex flex-col gap-y-2">
                {virtual ? (
                  <>
                    <Button
                      onClick={() => {
                        setVirtualTourUrlEmbed(virtualRedirect);
                        startVirtualTour();
                      }}
                      className="px-10 py-3 font-quicksand text-[14px]"
                    >
                      TAKE A TOUR
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/project/${slug}`}
                      className="i rounded-full bg-white px-6 py-2 font-quicksand text-[14px] text-black hover:bg-gray-200"
                    >
                      VIEW DETAILS
                    </Link>
                    <Button
                      onClick={() => onShowModal(id)}
                      className="px-6 py-2 font-quicksand text-[14px]"
                    >
                      INQUIRE NOW
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/30" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex h-full w-full items-center justify-between">
            {/* <button
                    className="text-white"
                    aria-label="Previous"
                    onClick={prevImage}
                >
                    {prevIcon}
                </button>
                <button className="text-white" aria-label="Next" onClick={nextImage}>
                    {nextIcon}
                </button> */}
            <div className="absolute top-4 z-20 flex w-full items-center justify-between px-4">
              {virtual ? (
                <div className="flex items-center gap-x-2">
                  <svg
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_793_398)">
                      <path
                        d="M15.2226 26.6268C17.5009 26.6268 19.4296 24.1594 20.3697 20.4859C24.0432 19.5458 26.5106 17.6171 26.5106 15.3388C26.5106 12.1081 21.5524 9.57719 15.2226 9.57719C13.8783 9.57353 12.5367 9.69463 11.2148 9.93884C12.0645 7.0405 13.558 5.57278 15.2226 5.57278C16.0929 5.57278 16.8112 5.61014 17.3275 6.17859L16.5836 6.48887C16.325 6.59644 16.2027 6.89324 16.3102 7.15178C16.347 7.24003 16.4079 7.31613 16.486 7.37121L18.9969 9.14634C19.2257 9.30804 19.5423 9.25364 19.704 9.02482C19.7513 8.9579 19.7817 8.88053 19.7925 8.79934L20.1918 5.81036C20.2289 5.53261 20.0338 5.27747 19.756 5.24043C19.6671 5.22854 19.5765 5.24053 19.4937 5.27503L18.3098 5.76887C17.397 4.64805 16.3344 4.05078 15.2226 4.05078C12.9443 4.05078 11.0155 6.51817 10.0754 10.1916C6.40195 11.1317 3.93457 13.0605 3.93457 15.3388C3.93457 16.4506 4.53178 17.5132 5.6526 18.426L5.15876 19.61C5.05093 19.8686 5.1732 20.1656 5.43184 20.2734C5.51468 20.308 5.60516 20.3199 5.6941 20.3081L8.68307 19.9087C8.96077 19.8716 9.15579 19.6163 9.11865 19.3386C9.10777 19.2574 9.07741 19.18 9.03013 19.1131L7.255 16.6021C7.09352 16.3733 6.77714 16.3188 6.54837 16.4803C6.47025 16.5354 6.40933 16.6114 6.37261 16.6997L6.06233 17.4436C5.49388 16.9274 5.45652 16.2091 5.45652 15.3388C5.45652 13.6742 6.92424 12.1807 9.82257 11.3307C9.57831 12.6527 9.45721 13.9945 9.46092 15.3388C9.46098 21.6686 11.9919 26.6268 15.2226 26.6268ZM15.2226 10.5919C20.7913 10.5919 24.9886 12.7658 24.9886 15.3389C24.9886 17.0034 23.5209 18.4968 20.6224 19.3467C20.8666 18.0249 20.9877 16.6831 20.984 15.3389C20.9972 14.4072 20.9392 13.4759 20.8105 12.5531C20.777 12.2749 20.5242 12.0766 20.2461 12.1102C19.968 12.1438 19.7696 12.3966 19.8032 12.6747C19.804 12.6814 19.805 12.6881 19.806 12.6947C19.9283 13.5706 19.9829 14.4546 19.9693 15.3389C19.9716 16.7813 19.8187 18.2199 19.5133 19.6296C18.1035 19.935 16.665 20.0879 15.2225 20.0856C14.3504 20.1004 13.4784 20.0472 12.6146 19.9267C12.338 19.882 12.0775 20.07 12.0328 20.3466C11.9882 20.6232 12.1762 20.8837 12.4528 20.9283C12.4595 20.9294 12.4662 20.9304 12.4729 20.9312C13.3837 21.0589 14.303 21.1154 15.2226 21.1001C16.5669 21.1038 17.9085 20.9827 19.2304 20.7385C18.3805 23.6372 16.8871 25.1049 15.2225 25.1049C12.6495 25.1049 10.4755 20.9076 10.4755 15.3389C10.4732 13.8964 10.6261 12.4578 10.9316 11.048C12.3415 10.7424 13.7801 10.5895 15.2226 10.5919Z"
                        fill="white"
                      />
                      <path
                        d="M2.53733 21.7396C-0.997759 14.7359 1.81413 6.19253 8.81781 2.65749C14.1298 -0.0236958 20.5499 0.889952 24.903 4.94657L24.1948 5.65767C23.997 5.85614 23.9976 6.17735 24.1961 6.37513C24.2637 6.44252 24.3489 6.48943 24.442 6.51055L27.3374 7.16747C27.3743 7.1758 27.412 7.18004 27.4499 7.18009C27.7301 7.1802 27.9573 6.95313 27.9573 6.67294C27.9573 6.62889 27.9517 6.58506 27.9403 6.5425L27.1932 3.72822C27.121 3.45731 26.8428 3.2962 26.5719 3.36837C26.4852 3.39146 26.4063 3.4371 26.343 3.50056L25.619 4.22758C19.4812 -1.5155 9.8499 -1.19562 4.10677 4.94206C-0.256206 9.60476 -1.24457 16.4952 1.63169 22.1964C1.75045 22.4501 2.05246 22.5595 2.30622 22.4408C2.55998 22.322 2.66941 22.02 2.55064 21.7662C2.54645 21.7573 2.542 21.7485 2.53727 21.7398L2.53733 21.7396Z"
                        fill="white"
                      />
                      <path
                        d="M28.8139 8.47842C28.6835 8.23038 28.3768 8.13502 28.1288 8.26541C27.8865 8.39277 27.7889 8.68936 27.9083 8.93564C31.4423 15.9398 28.6291 24.4828 21.6249 28.0167C16.3139 30.6964 9.89573 29.783 5.54316 25.7281L6.25059 25.0176C6.44842 24.819 6.44784 24.4976 6.24921 24.2997C6.1816 24.2324 6.09638 24.1855 6.00335 24.1644L3.1083 23.5076C2.83506 23.4456 2.56331 23.6169 2.50133 23.8902C2.48318 23.9703 2.48472 24.0535 2.50584 24.1328L3.25296 26.9469C3.29956 27.1224 3.43647 27.2596 3.61191 27.3066C3.65468 27.3182 3.69888 27.324 3.74319 27.3239C3.87803 27.3238 4.00736 27.2701 4.10261 27.1747L4.82755 26.4472C10.966 32.1896 20.5972 31.8684 26.3396 25.73C30.7011 21.0677 31.6892 14.1788 28.8139 8.47842Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_793_398">
                        <rect
                          width="30.4453"
                          height="30.4453"
                          fill="white"
                          transform="translate(0 0.113281)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="font-quicksand text-white">Take a tour</p>
                </div>
              ) : (
                <>
                  {/* <small className="bg-white px-4 py-1 rounded-full text-[10px]">
                        FEATURED
                    </small> */}
                </>
              )}
              {/* <button className="">
                    <img src="/assets/share.png" className="h-6 w-6 object-contain" />
                    </button> */}
            </div>
            <div className="absolute bottom-[18px] left-[20px] z-20 flex items-center  gap-x-2 rounded-full bg-[#E12827] px-6 py-2">
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 0C1.79444 0 0 1.94398 0 4.33334C0 5.05063 0.165539 5.76182 0.480233 6.39262L3.78126 12.8604C3.8252 12.9466 3.90895 13 4 13C4.09105 13 4.1748 12.9466 4.21874 12.8604L7.52099 6.39049C7.83446 5.76182 8 5.0506 8 4.33332C8 1.94398 6.20556 0 4 0ZM4 6.5C2.89722 6.5 2.00001 5.52802 2.00001 4.33334C2.00001 3.13866 2.89722 2.16668 4 2.16668C5.10278 2.16668 5.99999 3.13866 5.99999 4.33334C5.99999 5.52802 5.10278 6.5 4 6.5Z"
                  fill="white"
                />
              </svg>

              <p className="text-[18px] font-[500] text-white">{location}</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => router.push(`/project/${slug}`)}
          className="cursor-pointer bg-white shadow-md"
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-[#DDDDDD] px-[17px] py-[19px]">
              <h2
                className={`${
                  news || blogs ? "text-[20px]" : "text-[20px]"
                } flex-1 font-quicksand font-[700] leading-[25px] text-[#1B1B1B]`}
              >
                <a href={`/project/${slug}`}>{title}</a>
              </h2>
            </div>
            <div className="flex px-[17px] py-[17px] pt-[14px]">
              <div className="h-full pr-[12px] lg:pr-[26px]">
                <p
                  className={`mb-[2px] text-[#ABABAB] ${
                    news || blogs
                      ? "text-[12px] leading-[17px] lg:text-[14px]"
                      : "w-max text-[12px] leading-[19px] lg:text-[16px]"
                  }`}
                >
                  Price Range
                </p>
                <p
                  className={`${
                    home
                      ? "w-max text-[16px] font-[600]"
                      : news
                      ? "w-max text-[14px] font-[600]"
                      : "w-max text-[12px] font-[600] lg:text-[16px]"
                  } uppercase`}
                >
                  ₱{" "}
                  {numbro(minPrice).format({
                    average: true,
                    mantissa: 1,
                    spaceSeparated: true,
                    output: "number",
                  })}{" "}
                  -{" "}
                  {numbro(maxPrice).format({
                    average: true,
                    mantissa: 1,
                    spaceSeparated: true,
                    output: "number",
                  })}
                </p>
              </div>
              <div className="pr-[12px] lg:pr-[26px]">
                <div className={`${home && "w-max"}`}>
                  <p
                    className={`mb-[2px] text-[#ABABAB] ${
                      news || blogs
                        ? "text-[12px] leading-[17px] lg:text-[14px]"
                        : "w-max text-[12px] leading-[19px] lg:text-[16px]"
                    }`}
                  >
                    Unit Type
                  </p>
                  <p
                    className={
                      home
                        ? "text-[16px] font-[600]"
                        : news
                        ? "w-max text-[14px] font-[600]"
                        : "w-max text-[12px] font-[600] lg:text-[16px]"
                    }
                  >
                    {numberOfBedrooms}BR
                  </p>
                </div>
              </div>
              <div>
                <div className="pl-0">
                  <p
                    className={`mb-[2px] text-[#ABABAB] ${
                      news || blogs
                        ? "text-[12px] leading-[17px] lg:text-[14px]"
                        : "w-max text-[12px] leading-[19px] lg:text-[16px]"
                    }`}
                  >
                    Size
                  </p>
                  <p
                    className={
                      home
                        ? "text-[16px] font-[600]"
                        : news
                        ? "w-max text-[14px] font-[600]"
                        : "text-[12px] font-[600] lg:text-[16px]"
                    }
                  >
                    49sqm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Propcard;
