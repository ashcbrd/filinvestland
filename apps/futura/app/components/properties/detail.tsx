"use client";

import ScheduleForm from "@/app/projects/client/scheduleform";
import { serializeRichText } from "@/app/utils/serializeRichText";
import { ClickAwayListener, Stack, Tooltip } from "@mui/material";
import numbro from "numbro";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const Detail = ({ page }: any) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="mb-20 mt-10 md:mt-20">
          <div className="mb-20  flex items-center justify-center text-center">
            <div className="container  mx-auto flex h-32 w-full flex-col justify-between md:flex-row">
              <div className="col-start-1 col-end-8 flex flex-col items-center gap-y-4 p-2 px-4 md:flex-row md:px-0">
                <div className="mb-4 w-[200px] rounded-[20px] bg-white p-4 px-4 py-4 shadow-md md:mb-0">
                  <img src={page?.logo?.url} className="px-2 py-8" />
                </div>
                <div className="flex flex-col items-center md:ml-10 md:items-start">
                  <p className="text-start font-quicksand text-[12px] text-[#787878] md:text-[18px]">
                    Home / Properties / {page?.title}
                  </p>
                  <h2 className="mr-6 mt-2 text-start text-[18px] font-[700] leading-none md:text-[30px]">
                    {page?.title}
                  </h2>
                  <div className="mt-2 flex items-center">
                    <svg
                      viewBox="0 0 12 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 w-2 md:w-[10px]"
                    >
                      <path
                        d="M6 0C2.69166 0 0 2.69167 0 6.00001C0 6.99318 0.248308 7.9779 0.72035 8.85132L5.67189 17.8066C5.73781 17.926 5.86342 18 6 18C6.13658 18 6.26219 17.926 6.32811 17.8066L11.2815 8.84837C11.7517 7.9779 12 6.99314 12 5.99998C12 2.69167 9.30834 0 6 0ZM6 9C4.34583 9 3.00002 7.65418 3.00002 6.00001C3.00002 4.34584 4.34583 3.00002 6 3.00002C7.65417 3.00002 8.99998 4.34584 8.99998 6.00001C8.99998 7.65418 7.65417 9 6 9Z"
                        fill="#9F4C03"
                      />
                    </svg>
                    <p className="text-[10px] text-[#000] md:text-[15px]">
                      {page?.location?.title},{" "}
                      {page?.location?.locationGroup.title}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <img
                      src={"/assets/images/property/Peso.png"}
                      className="mr-4 w-2 object-cover  md:w-4"
                    />
                    <p className="text-[14px] font-[600] uppercase leading-normal text-[#9D0A06] md:text-[30px]">
                      {numbro(page?.minPrice).format("0.0a")} -{" "}
                      {numbro(page?.maxPrice).format("0.0a")}
                    </p>
                    <svg
                      width="18"
                      height="15"
                      viewBox="0 0 18 15"
                      className="ml-6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.9536 11.9909V12.8609C17.9536 13.0414 17.8406 13.2063 17.6617 13.287C14.6968 14.6242 11.7056 14.6242 8.74063 13.287C8.39323 13.1303 8.04626 12.994 7.69964 12.8781L7.65203 12.3216C7.36952 10.4103 6.50448 8.97976 5.05521 8.06459C3.63357 7.16689 2.01548 6.78051 0.222427 6.90823L0 6.92903V1.42898C0 1.24855 0.113004 1.08362 0.291906 1.00294C2.12487 0.176226 3.96789 -0.139406 5.80853 0.0560713V0.714514C5.81536 2.4473 6.19807 3.74193 6.98779 4.59278C7.46719 5.10932 8.01651 5.44455 9.0021 5.90186C9.06791 5.93238 9.13551 5.96348 9.22572 6.00485C9.33792 6.05619 9.39941 6.08434 9.45042 6.10775C9.63284 6.1915 9.76813 6.2546 9.90139 6.31854C10.242 6.48205 10.5281 6.63231 10.7995 6.79399C11.0503 6.94348 11.2839 7.10026 11.5058 7.27006C11.9427 7.60437 12.2283 7.98338 12.4742 8.50065C12.5585 8.67785 12.5879 8.74852 12.7598 9.17502C13.1743 10.2031 13.4991 10.6903 14.2535 11.1202C15.3522 11.7463 16.3931 12.042 17.3741 11.9909L17.9536 11.9909ZM17.9536 11.0389L17.3254 11.0392C16.5833 11.0809 15.7481 10.845 14.8175 10.3148C14.3164 10.0292 14.0926 9.69353 13.7523 8.84943C13.5721 8.40237 13.5403 8.326 13.4448 8.12517C13.139 7.48179 12.7629 6.98269 12.189 6.54356C11.9338 6.34828 11.6665 6.16884 11.3814 5.99903C11.0792 5.81898 10.7654 5.6541 10.3974 5.47748C10.2575 5.41032 10.117 5.34482 9.9294 5.25868C9.87779 5.23499 9.81562 5.20652 9.70396 5.15542C9.61521 5.11476 9.54907 5.08432 9.48517 5.05467C8.61593 4.65136 8.16299 4.37494 7.79758 3.98121C7.19205 3.32877 6.87067 2.24173 6.86464 0.712791V0.224369C7.6486 0.391051 8.43172 0.650575 9.21299 1.00294C11.8806 2.2061 14.5219 2.2061 17.1894 1.00294C17.5405 0.844598 17.9536 1.0749 17.9536 1.42898L17.9536 11.0389ZM14.5213 5.71596C14.9588 5.71596 15.3134 5.39608 15.3134 5.00147C15.3134 4.60685 14.9588 4.28697 14.5213 4.28697C14.0839 4.28697 13.7293 4.60685 13.7293 5.00147C13.7293 5.39608 14.0839 5.71596 14.5213 5.71596ZM6.61587 12.5821C4.6656 12.169 2.72199 12.404 0.764176 13.287C0.413113 13.4453 0 13.215 0 12.861V7.88666L0.318367 7.85695C1.85686 7.74753 3.23104 8.07568 4.44962 8.84513C5.63747 9.5952 6.35595 10.7802 6.60331 12.4346L6.61587 12.5821Z"
                        fill="#B6B6B6"
                      />
                    </svg>
                    <p className="pl-4 font-quicksand  text-[10px] font-[500] md:text-[18px]">
                      22.02 - 32.07 sqm
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-start-8 col-end-10 flex justify-center p-2 md:justify-end">
                <div className="text-center md:text-right">
                  <p className="mb-5 hidden text-[20px] font-[500] leading-normal md:block">
                    {page?.propertyDetails?.projectType.title}
                  </p>
                  <div className="flex items-center justify-end">
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                      <div>
                        <Tooltip
                          arrow
                          placement="top"
                          PopperProps={{
                            disablePortal: true,
                          }}
                          onClose={handleTooltipClose}
                          open={open}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          title={
                            <Stack direction="row" gap={1} py={1}>
                              <FacebookShareButton url={window.location.href}>
                                <FacebookIcon size={32} round={true} />
                              </FacebookShareButton>
                              <TwitterShareButton url={window.location.href}>
                                <svg
                                  width="34"
                                  height="34"
                                  viewBox="0 0 36 37"
                                  fill="#E02926"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="18"
                                    cy="18.1797"
                                    r="17.75"
                                    stroke="#FF9B9B"
                                    stroke-width="0.5"
                                  />
                                  <path
                                    d="M11.5 26L25 11H23.5L9.5 26H11.5Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M21 26L10 11H15L26 26H21Z"
                                    fill="#BF0B09"
                                    stroke="white"
                                  />
                                </svg>
                              </TwitterShareButton>
                              <LinkedinShareButton url={window.location.href}>
                                <LinkedinIcon size={32} round={true} />
                              </LinkedinShareButton>
                            </Stack>
                          }
                        >
                          <Tooltip title="Share now">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="23"
                              height="23"
                              viewBox="0 0 23 23"
                              fill="none"
                              onClick={handleTooltipOpen}
                              className="cursor-pointer"
                            >
                              <g clip-path="url(#clip0_672_9279)">
                                <path
                                  d="M17.4792 15.2466C16.3932 15.2466 15.4147 15.7156 14.7356 16.4616L8.62744 12.6786C8.79052 12.2611 8.88096 11.8077 8.88096 11.3333C8.88096 10.8588 8.79052 10.4054 8.62744 9.98808L14.7356 6.20483C15.4147 6.95086 16.3932 7.42003 17.4792 7.42003C19.525 7.42003 21.1893 5.75572 21.1893 3.70993C21.1893 1.66413 19.525 0 17.4792 0C15.4334 0 13.7691 1.6643 13.7691 3.7101C13.7691 4.18445 13.8597 4.63788 14.0226 5.05534L7.91461 8.83842C7.23551 8.09239 6.25705 7.62322 5.17104 7.62322C3.12524 7.62322 1.46094 9.2877 1.46094 11.3333C1.46094 13.3791 3.12524 15.0434 5.17104 15.0434C6.25705 15.0434 7.23551 14.5744 7.91461 13.8282L14.0226 17.6113C13.8597 18.0288 13.7691 18.4822 13.7691 18.9567C13.7691 21.0023 15.4334 22.6666 17.4792 22.6666C19.525 22.6666 21.1893 21.0023 21.1893 18.9567C21.1893 16.9109 19.525 15.2466 17.4792 15.2466ZM15.1219 3.7101C15.1219 2.41034 16.1794 1.35285 17.4792 1.35285C18.7789 1.35285 19.8364 2.41034 19.8364 3.7101C19.8364 5.00986 18.7789 6.06735 17.4792 6.06735C16.1794 6.06735 15.1219 5.00986 15.1219 3.7101ZM5.17104 13.6906C3.8711 13.6906 2.81362 12.6331 2.81362 11.3333C2.81362 10.0336 3.8711 8.97607 5.17104 8.97607C6.4708 8.97607 7.52811 10.0336 7.52811 11.3333C7.52811 12.6331 6.4708 13.6906 5.17104 13.6906ZM15.1219 18.9565C15.1219 17.6568 16.1794 16.5993 17.4792 16.5993C18.7789 16.5993 19.8364 17.6568 19.8364 18.9565C19.8364 20.2563 18.7789 21.3138 17.4792 21.3138C16.1794 21.3138 15.1219 20.2563 15.1219 18.9565Z"
                                  fill="black"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_672_9279">
                                  <rect
                                    width="22.6667"
                                    height="22.6667"
                                    fill="white"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </Tooltip>
                        </Tooltip>
                      </div>
                    </ClickAwayListener>
                    <ScheduleForm data={page} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-80 flex flex-1 flex-col justify-center gap-4 text-center font-quicksand text-[14px] leading-7 text-[#343434] md:mt-4 md:text-start md:text-[18px]">
            {serializeRichText(page?.descriptiveOverview, true)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
