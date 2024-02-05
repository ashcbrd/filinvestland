"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { setters } from "@/context/Projects";
import { getters } from "@/context/Common";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ClickAwayListener, useMediaQuery } from "@mui/material";

const Header = () => {
  const matches = useMediaQuery("(max-width:425px)");
  const searchParams = useSearchParams();
  const router = useRouter();
  const get = getters();
  const contents = getters().headerContents;
  const methods = setters();
  const [isScrolling, setScrolling] = useState(false);
  const [isSearching, setSearching] = useState(
    Boolean(searchParams?.get("keyword")) ?? false
  );
  const [openMegamenu, setMegamenu] = useState(false);
  const [openMobilemenu, setOpenMobilemenu] = useState(false);
  const [keyword, setKeyword] = useState(searchParams?.get("keyword") ?? "");
  const [height, setHeight] = useState(0);
  const [mouseovered, setMouseovered] = useState([] as any);
  const pathname = usePathname();
  const browseByPropertyType =
    contents.projectsMegaMenu?.browseByPropertyType?.filter(
      (m: any) => m.title
    );
  const browseByCity = contents.projectsMegaMenu?.browseByCity?.filter(
    (m: any) => m.title
  );
  const browseByProvince = contents.projectsMegaMenu?.browseByProvince?.filter(
    (m: any) => m.title
  );

  useEffect(() => {
    if ((document.documentElement.scrollTop || document.body.scrollTop) > 50) {
      setScrolling(true);
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    });
  }, []);

  const onSearch = (e?: any, isSearch: boolean = true) => {
    e?.preventDefault();
    if (keyword && isSearch) {
      window.location.href = `/projects?keyword=${keyword}`;
    } else {
      window.location.href = `/projects`;
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setMouseovered([])}>
      <div
        onMouseLeave={() => setMouseovered([])}
        id="main-header"
        className={`${
          isScrolling || isSearching || openMobilemenu
            ? "bg-custom-black-3/90"
            : ""
        } ${
          mouseovered.length > 0 ? "bg-custom-black-3/90" : ""
        } fixed top-0 z-[23] w-full pb-[20px] pt-[30px] transition-all duration-[0.2s] ease-in-out md:pt-[20px]`}
      >
        <div className="container flex items-center justify-between">
          <div className="logo-container flex-shrink-0">
            <Link href="/" className="block">
              {contents.AspireFilinvestLogo && (
                <img
                  className={`md:w-[120px] ${
                    isSearching && matches ? "!hidden" : ""
                  }`}
                  src={contents.AspireFilinvestLogo.url}
                  alt={contents.AspireFilinvestLogo.alt}
                  width={197}
                />
              )}
            </Link>
          </div>
          <div className="menu-container relative w-full max-w-[909px]">
            <ul
              className={`flex justify-center text-white smd:block smd:hidden ${
                isSearching ? "pointer-events-none opacity-[0.05]" : ""
              }`}
            >
              {contents.mainMenu &&
                contents.mainMenu.map((m: any) => (
                  <>
                    {m.link.url !== "/projects" && (
                      <li className="px-[13px] text-center">
                        <Link
                          onMouseEnter={() => setMouseovered([])}
                          className={`text-[16px] transition-all duration-[0.3px] ease-in-out hover:opacity-50`}
                          href={m.link.url}
                        >
                          {m.link.label}
                        </Link>
                      </li>
                    )}
                    {m.link.url === "/projects" && (
                      <li
                        className="mx-[13px] text-center"
                        onMouseOver={() =>
                          setMouseovered((mo: any) => [...mo, "p"])
                        }
                      >
                        <Link
                          href="/projects"
                          className={`inline-flex items-center justify-center text-[16px] transition-all duration-[0.3px] ease-in-out hover:opacity-50`}
                        >
                          {m.link.label}
                          <svg
                            className={`ml-[7px] ${
                              mouseovered.length > 0 ? "rotate-[180deg]" : ""
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="9"
                            viewBox="0 0 15 9"
                            fill="none"
                          >
                            <path d="M1 1L7.5 7.5L14 1" stroke="white" />
                          </svg>
                        </Link>
                      </li>
                    )}
                  </>
                ))}
            </ul>
            {isSearching && (
              <div className="absolute left-[0] right-0 top-[50%] mt-[3px] translate-y-[-50%] px-[13px]">
                <form onSubmit={onSearch}>
                  <input
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    type="text"
                    placeholder="What are you looking for?"
                    className="border-0 border-b border-b-[#767676] bg-transparent pb-[25px] pl-0 text-[20px] text-[#CDEDFF]"
                  />
                  <button
                    type="button"
                    className="absolute right-[10px] top-[8px]"
                    onClick={(e: any) => {
                      setSearching(false);
                      setKeyword("");
                      onSearch(e, false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        d="M8.87422 7.50011L14.7149 1.65911C15.095 1.27918 15.095 0.664882 14.7149 0.28495C14.335 -0.0949832 13.7207 -0.0949832 13.3408 0.28495L7.49991 6.12595L1.65921 0.28495C1.27911 -0.0949832 0.665002 -0.0949832 0.285077 0.28495C-0.0950257 0.664882 -0.0950257 1.27918 0.285077 1.65911L6.12578 7.50011L0.285077 13.3411C-0.0950257 13.721 -0.0950257 14.3353 0.285077 14.7153C0.474417 14.9048 0.72337 15 0.972145 15C1.22092 15 1.46969 14.9048 1.65921 14.7153L7.49991 8.87428L13.3408 14.7153C13.5303 14.9048 13.7791 15 14.0279 15C14.2766 15 14.5254 14.9048 14.7149 14.7153C15.095 14.3353 15.095 13.721 14.7149 13.3411L8.87422 7.50011Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className="button-container flex flex-shrink-0 items-center smd:hidden">
            <button
              className="mr-[19px]"
              onClick={() => setSearching(!isSearching)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  d="M20.6807 19.1277L15.5038 13.9295C16.8349 12.4018 17.5642 10.4797 17.5642 8.47874C17.5642 3.80364 13.6245 0 8.7821 0C3.93973 0 0 3.80364 0 8.47874C0 13.1538 3.93973 16.9575 8.7821 16.9575C10.6 16.9575 12.3324 16.4281 13.8135 15.4232L19.0297 20.6609C19.2477 20.8795 19.5409 21 19.8552 21C20.1526 21 20.4348 20.8905 20.649 20.6914C21.1042 20.2686 21.1187 19.5675 20.6807 19.1277ZM8.7821 2.21185C12.3614 2.21185 15.2732 5.0231 15.2732 8.47874C15.2732 11.9344 12.3614 14.7456 8.7821 14.7456C5.20282 14.7456 2.29098 11.9344 2.29098 8.47874C2.29098 5.0231 5.20282 2.21185 8.7821 2.21185Z"
                  fill="white"
                />
              </svg>
            </button>
            <Button
              className="h-[54px] border-light-blue bg-light-blue !px-[27px] !py-0 text-[16px] hover:!border-white hover:!bg-transparent hover:!text-white"
              onClick={() => methods.setGeneralInquiry(true)}
            >
              {contents.callToActionText}
            </Button>
          </div>
          <div className="hidden smd:flex">
            {!isSearching && (
              <button
                className="mr-[19px]"
                onClick={() => setSearching(!isSearching)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    d="M20.6807 19.1277L15.5038 13.9295C16.8349 12.4018 17.5642 10.4797 17.5642 8.47874C17.5642 3.80364 13.6245 0 8.7821 0C3.93973 0 0 3.80364 0 8.47874C0 13.1538 3.93973 16.9575 8.7821 16.9575C10.6 16.9575 12.3324 16.4281 13.8135 15.4232L19.0297 20.6609C19.2477 20.8795 19.5409 21 19.8552 21C20.1526 21 20.4348 20.8905 20.649 20.6914C21.1042 20.2686 21.1187 19.5675 20.6807 19.1277ZM8.7821 2.21185C12.3614 2.21185 15.2732 5.0231 15.2732 8.47874C15.2732 11.9344 12.3614 14.7456 8.7821 14.7456C5.20282 14.7456 2.29098 11.9344 2.29098 8.47874C2.29098 5.0231 5.20282 2.21185 8.7821 2.21185Z"
                    fill="white"
                  />
                </svg>
              </button>
            )}
            <button onClick={() => setOpenMobilemenu(!openMobilemenu)}>
              {openMobilemenu ? (
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="#FFF"
                    stroke-linecap="square"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="#FFF"
                    stroke-linecap="square"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 7H19" stroke="#FFF" stroke-linecap="round" />
                  <path d="M5 12H19" stroke="#FFF" stroke-linecap="round" />
                  <path d="M5 17H19" stroke="#FFF" stroke-linecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className="menu-container hidden overflow-hidden transition-all duration-[0.3s] ease-in-out smd:block"
          style={{ height }}
        >
          <ul
            className="block py-[30px] text-white"
            ref={(newRef) => {
              if (newRef) {
                if (openMobilemenu) {
                  setHeight(newRef.clientHeight);
                } else {
                  setHeight(0);
                }
              }
            }}
          >
            {contents.mainMenu &&
              contents.mainMenu.map((m: any) => (
                <li className="px-[13px] pb-[15px] text-center">
                  <Link
                    className="text-[16px] transition-all duration-[0.3px] ease-in-out hover:opacity-50"
                    href={m.link.url}
                  >
                    {m.link.label}
                  </Link>
                </li>
              ))}
            <li className="px-[13px] pb-[0] pt-[15px] text-center">
              <Button
                className="h-[54px] border-light-blue bg-light-blue !px-[27px] !py-0 text-[16px] hover:!border-white hover:!bg-white"
                onClick={() => methods.setGeneralInquiry(true)}
              >
                {contents.callToActionText}
              </Button>
            </li>
          </ul>
        </div>
        {mouseovered.length > 0 && contents.projectsMegaMenu && (
          <div
            className="container relative pb-[52px] pt-[42px] text-white smd:hidden"
            onMouseOver={() => setMouseovered((mo: any) => [...mo, "mm"])}
          >
            <button
              onClick={() => setMouseovered([])}
              className="absolute right-0 top-0"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <div className="flex pb-[68px]">
              <div className="flex w-[42%]">
                <h3 className="mr-[66px] max-w-[129px] text-[20px] font-[400]">
                  Browse by Property Type
                  <div className="mt-[24px] h-[2px] w-[55px] bg-[#00A1FF]" />
                </h3>
                <div className="flex pt-[7px] leading-[24px]">
                  <div className="flex flex-col">
                    {browseByPropertyType.map((m: any) => (
                      <Link
                        href={`/${m.slug}`}
                        className="mb-[22px] text-[#89D3FF] transition-all duration-[0.3s] ease-in-out hover:text-white"
                      >
                        {m.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex w-[58%]">
                <h3 className="mr-[66px] max-w-[129px] text-[20px] font-[400]">
                  Browse by Province
                  <div className="mt-[24px] h-[2px] w-[55px] bg-[#00A1FF]" />
                </h3>
                <div className="flex pt-[7px] leading-[24px]">
                  <div className="flex flex-col pr-[75px]">
                    {browseByProvince.slice(0, 4).map((m: any) => (
                      <a
                        href={`/projects?province=${m.id}`}
                        className="mb-[22px] text-[#89D3FF] transition-all duration-[0.3s] ease-in-out hover:text-white"
                      >
                        {m.title}
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-col pr-[75px]">
                    {browseByProvince.slice(4, 8).map((m: any) => (
                      <a
                        href={`/projects?province=${m.id}`}
                        className="mb-[22px] text-[#89D3FF] transition-all duration-[0.3s] ease-in-out hover:text-white"
                      >
                        {m.title}
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    {browseByProvince.slice(8, 12).map((m: any) => (
                      <a
                        href={`/projects?province=${m.id}`}
                        className="mb-[22px] text-[#89D3FF] transition-all duration-[0.3s] ease-in-out hover:text-white"
                      >
                        {m.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex">
                <h3 className="mr-[103px] max-w-[92px] text-[20px] font-[400]">
                  Browse by City
                  <div className="mt-[24px] h-[2px] w-[55px] bg-[#00A1FF]" />
                </h3>
                <div className="flex pt-[7px] leading-[24px]">
                  <div className="flex flex-col pr-[75px]">
                    {browseByCity.slice(0, 4).map((m: any) => (
                      <a
                        href={`/projects?city=${m.id}`}
                        className="mb-[22px] text-[#89D3FF] transition-all duration-[0.3s] ease-in-out hover:text-white"
                      >
                        {m.title}
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-col pr-[75px]">
                    {browseByCity.slice(4, 8).map((m: any) => (
                      <a
                        href={`/projects?city=${m.id}`}
                        className="mb-[22px] text-[#89D3FF] transition-all duration-[0.3s] ease-in-out hover:text-white"
                      >
                        {m.title}
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-col pr-[75px]">
                    {browseByCity.slice(8, 12).map((m: any) => (
                      <a
                        href={`/projects?city=${m.id}`}
                        className="mb-[22px] text-[#89D3FF] transition-all duration-[0.3s] ease-in-out hover:text-white"
                      >
                        {m.title}
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    {browseByCity.slice(12, 16).map((m: any) => (
                      <a
                        href={`/projects?city=${m.id}`}
                        className="mb-[22px] border-b border-transparent text-[#89D3FF] transition-all duration-[0.3s] ease-in-out hover:border-[#89D3FF]"
                      >
                        {m.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Header;
