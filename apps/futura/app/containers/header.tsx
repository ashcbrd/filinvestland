"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Modal from "@/app/components/general/modal";
import Card from "@/app/components/cards/card";
import moment from "moment";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "../components/button";
import Link from "next/link";
import _ from "lodash";
import qs from "qs";
import numbro from "numbro";
import Request from "@/config/Request";
import ReCAPTCHA from "react-google-recaptcha";
import verifyCaptcha from "@/app/server-action";
import { setters } from "../context/Project";
import { useZoho } from "../hooks/useZoho";

interface BookingParams {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone: string;
  Notes?: string;
  Lead_Source: string;
  Website_Source: string;
  Reason_for_contacting_us: string;
  Project_Category: string;
  Product_Type: string;
  Project_Name: string;
  Management_Group: string;
  Web_Inquiry: string;
}

const Header = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  async function getData() {
    const page = fetch(`${process.env.CMS_URL}/api/globals/futura-navigation`, {
      cache: "no-store",
    });

    const req = await Promise.all([page]);

    return {
      page: (await req[0].json()) as any,
    };
  }

  const [keyword, setKeyword] = useState(searchParams?.get("keyword") ?? "");
  const [menu, setMenuData] = useState([]);
  const [logo, setLogo] = useState("");
  const [projectsMegaMenu, setProjectMegaMenu] = useState([]);
  const [browseByCity, setBrowseByCity] = useState([]);
  const [browseByPropertyType, setBrowseByPropertyType] = useState([]);
  const [browseByProvince, setBrowseByProvince] = useState([]);
  const set = setters();

  const [modal, setModal] = useState(false);

  const [showSearchInput, setShowSearchInput] = useState<boolean>(
    Boolean(searchParams?.get("keyword")) ?? false
  );
  const [mobileNav, setMobileNav] = useState(
    searchParams?.get("keyword") ?? false
  );
  const [openMegamenu, setMegamenu] = useState(false);

  const megamenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const toggleModal = useCallback(() => {
    setModal((prevModal) => !prevModal);
  }, []);

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megamenuRef.current &&
        !megamenuRef.current.contains(event.target as Node)
      ) {
        setMegamenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [megamenuRef]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        const mainMenu = data?.page?.mainMenu;
        const projectsMegaMenu = data?.page?.projectsMegaMenu;
        const browseByCity = projectsMegaMenu?.browseByCity;
        const browseByPropertyType = projectsMegaMenu?.browseByPropertyType;
        const browseByProvince = projectsMegaMenu?.browseByProvince;
        const futuraLogo = data?.page?.FuturaFilinvestLogo?.url;

        setMenuData(mainMenu);
        setLogo(futuraLogo);
        setProjectMegaMenu(projectsMegaMenu);
        setBrowseByCity(browseByCity);
        setBrowseByPropertyType(browseByPropertyType);
        setBrowseByProvince(browseByProvince);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the asynchronous function immediately
  }, []);

  const handleOpenSearch = (e: any) => {
    e.preventDefault();
    toggleSearchInput();
  };

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const currentPathname =
        pathname === "/virtual-tour" ? "/virtual-tour" : "/projects";
      const searchQ = keyword ? `?keyword=${keyword}` : "";
      window.location.href = `${currentPathname}${searchQ}`;
    }
  };

  useEffect(() => {
    if (!showSearchInput && keyword) {
      console.log("showSearchInput", showSearchInput);
      set.setFilters((value: any) => ({ ...value, keyword: "" }));
      router.push("/projects");
    }
  }, [showSearchInput]);

  return (
    <div className="h-[104px]">
      <header
        className={`fixed left-0 top-0 z-[999] hidden w-full bg-[#FFF8F8] py-4 text-[#1C1C1C] xl:block`}
      >
        <div className="container relative mx-auto flex h-[104px] items-center justify-between">
          <a href="/">
            <div className="relative z-[9999] flex min-w-max items-center">
              {logo && (
                <img src={logo} alt="Logo" className="h-20 object-contain" />
              )}
            </div>
          </a>
          <nav
            className={`absolute left-0 right-0 mx-auto flex justify-center ${
              showSearchInput ? "z-30" : "z-50"
            } duration-300`}
          >
            <ul className="flex font-quicksand text-[14px] font-bold">
              {menu &&
                menu.map((m: any) => {
                  const isActive = m?.link.url
                    .substring(1)
                    .includes(pathname.split("/")[1]);
                  return (
                    <li className="px-[20px] text-center">
                      {m?.link.url !== "/project" && (
                        <Link
                          className={`transition-all duration-[0.3px] ease-in-out hover:text-[#BD1817]/70 ${
                            isActive && pathname !== "/" && "text-[#BD1817]"
                          }`}
                          href={m?.link.url}
                        >
                          {m?.link.label}
                        </Link>
                      )}
                      {m?.link.url === "/project" && (
                        <Link
                          onMouseOver={() => setMegamenu(true)}
                          href="/project"
                          className={`${
                            openMegamenu || pathname.includes("/project")
                              ? "text-[#BD1817] !opacity-100"
                              : ""
                          } flex items-center transition-all duration-[0.3px] ease-in-out hover:text-[#BD1817]/70`}
                        >
                          {m?.link.label}
                          {/* <svg
                            className={`ml-[7px] ${
                              openMegamenu ? "rotate-180" : "rotate-0"
                            } transition-all`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="9"
                            viewBox="0 0 15 9"
                            fill="#888"
                          >
                            <path d="M1 1L7.5 7.5L14 1" stroke="white" />
                          </svg> */}
                        </Link>
                      )}
                    </li>
                  );
                })}
            </ul>
          </nav>

          <div className={`z-40 flex w-full justify-end`}>
            <div
              className={`${
                showSearchInput ? "w-full" : "w-0"
              } bg-[#FFF8F8] pl-10 duration-300`}
            >
              <div className="relative flex items-center justify-between">
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => onSearch(e)}
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full border-b-2 border-[#D9D9D9] bg-transparent py-2 text-xl font-normal text-black outline-none placeholder:text-[14px] placeholder:text-black"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-shrink-0 justify-end">
            <button
              className="z-50 mr-[24px] rounded text-sm font-normal text-white  hover:text-white"
              onClick={handleOpenSearch}
            >
              {showSearchInput ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.6569 5.65685C16.0474 5.26633 16.6804 5.26633 17.0709 5.65685C17.4614 6.04738 17.4614 6.68038 17.0709 7.07091L12.4142 11.7276L17.071 16.3844C17.4615 16.7749 17.4615 17.4079 17.071 17.7984C16.6804 18.1889 16.0474 18.1889 15.6569 17.7984L11 13.1416L6.34315 17.7984C5.95262 18.1889 5.31962 18.1889 4.92909 17.7984C4.53856 17.4079 4.53856 16.7749 4.92909 16.3844L9.58586 11.7276L4.92909 7.07091C4.53856 6.68038 4.53856 6.04738 4.92909 5.65685C5.31962 5.26633 5.95262 5.26633 6.34315 5.65685L11 10.3137L15.6569 5.65685Z"
                    fill="#000"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.40472 2.399C5.78895 -0.864371 10.8254 -0.734301 13.9576 2.399C16.9528 5.39522 17.1359 10.1393 14.5069 13.3492L19.1564 18.0007L18.0011 19.1564L13.3512 14.5053C10.1423 17.1352 5.39992 16.952 2.40472 13.9558C-0.727511 10.8225 -0.874791 5.5614 2.40472 2.399ZM12.8023 3.55468C10.2501 1.00162 6.1122 1.00162 3.56001 3.55468C1.00782 6.10774 1.00782 10.2471 3.56001 12.8001C6.1122 15.3532 10.2501 15.3532 12.8023 12.8001C15.3545 10.2471 15.3545 6.10774 12.8023 3.55468Z"
                    fill="#000"
                  />
                </svg>
              )}
            </button>
            <Button
              className="z-[51] flex h-[56px] w-[215px] flex-shrink-0 items-center justify-center text-sm !font-[700]"
              onClick={() => setModal(!modal)}
            >
              Schedule A Trip Today
            </Button>
          </div>
        </div>
        {openMegamenu && projectsMegaMenu && (
          <div className="absolute h-screen w-screen bg-black/50">
            <div
              ref={megamenuRef}
              className="relative mx-auto bg-[#FFF8F8] px-10 pb-[52px] pt-[42px] text-black"
            >
              <div className="container relative">
                <button
                  onClick={() => setMegamenu(false)}
                  className="absolute right-4 top-4 rounded-full border p-2 shadow"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.6569 5.65685C16.0474 5.26633 16.6804 5.26633 17.0709 5.65685C17.4614 6.04738 17.4614 6.68038 17.0709 7.07091L12.4142 11.7276L17.071 16.3844C17.4615 16.7749 17.4615 17.4079 17.071 17.7984C16.6804 18.1889 16.0474 18.1889 15.6569 17.7984L11 13.1416L6.34315 17.7984C5.95262 18.1889 5.31962 18.1889 4.92909 17.7984C4.53856 17.4079 4.53856 16.7749 4.92909 16.3844L9.58586 11.7276L4.92909 7.07091C4.53856 6.68038 4.53856 6.04738 4.92909 5.65685C5.31962 5.26633 5.95262 5.26633 6.34315 5.65685L11 10.3137L15.6569 5.65685Z"
                      fill="#000"
                    />
                  </svg>
                </button>
                <div className="flex">
                  <div className="flex w-[42%]">
                    <h3 className="mr-[66px] max-w-[146px] text-[20px] font-[700] leading-[25px]">
                      Browse by<br></br>Property Type
                      <div className="mt-[24px] h-[4px] w-[27px] rounded-[50px] bg-[#E02926]" />
                    </h3>
                    <div className="flex pt-[7px] leading-[24px]">
                      <div className="flex flex-col pr-[75px]">
                        {browseByPropertyType.map((m: any) => (
                          <a
                            href={`/project/${m?.slug}`}
                            className="link-hover mb-[22px] w-max text-[#000]"
                          >
                            {m?.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-[58%]">
                    <h3 className="mr-[66px] max-w-[129px] text-[20px] font-[700] leading-[25px]">
                      Browse by Province
                      <div className="mt-[24px] h-[4px] w-[27px] bg-[#E02926]" />
                    </h3>
                    <div className="flex pt-[7px] leading-[24px]">
                      <div className="grid grid-cols-3 gap-x-6 gap-y-6 pr-[75px]">
                        {browseByProvince.map((m: any) => (
                          <a
                            href={`/projects?province=${m?.id}`}
                            className=" link-hover w-max text-[#000]"
                          >
                            {m?.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex">
                    <h3 className="mr-[66px] max-w-[146px] text-[20px] font-[700] leading-[25px]">
                      Browse<br></br>by City
                      <div className="mt-[24px] h-[4px] w-[27px] bg-[#E02926]" />
                    </h3>
                    <div className="flex pt-[7px] leading-[24px]">
                      <div className="flex flex-col pr-[75px]">
                        {browseByCity.slice(0, 4).map((m: any) => (
                          <a
                            href={`/projects?location=${m?.id}`}
                            className="link-hover mb-[22px] w-max text-[#000]"
                          >
                            {m?.title}
                          </a>
                        ))}
                      </div>
                      <div className="flex flex-col pr-[75px]">
                        {browseByCity.slice(4, 8).map((m: any) => (
                          <a
                            href={`/projects?location=${m?.id}`}
                            className="link-hover mb-[22px] w-max text-[#000]"
                          >
                            {m?.title}
                          </a>
                        ))}
                      </div>
                      <div className="flex flex-col pr-[75px]">
                        {browseByCity.slice(8, 12).map((m: any) => (
                          <a
                            href={`/projects?location=${m?.id}`}
                            className="link-hover mb-[22px] w-max text-[#000]"
                          >
                            {m?.title}
                          </a>
                        ))}
                      </div>
                      <div className="flex flex-col">
                        {browseByCity.slice(12, 16).map((m: any) => (
                          <a
                            href={`/projects?location=${m?.id}`}
                            className="link-hover mb-[22px] w-max border-b border-transparent text-[#000] transition-all duration-[0.3s] ease-in-out hover:border-[#89D3FF]"
                          >
                            {m?.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <header className="flex flex-col px-2 xl:hidden">
        <div className="relative z-[100] flex h-[104px] w-full items-center justify-between p-3">
          <Link href="/" className="flex min-w-max items-center">
            {logo && (
              <img src={logo} alt="Logo" className="h-20 object-contain" />
            )}
          </Link>
          <button
            onClick={() => setMobileNav((mobileNav) => !mobileNav)}
            className="flex flex-col items-end gap-y-1"
          >
            <div
              className={` h-[4px] rounded-full bg-[#E12827] ${
                mobileNav
                  ? "w-[28px] translate-y-2 rotate-45"
                  : "w-[36px] translate-y-0 rotate-0"
              } transition-all`}
            />
            <div
              className={`h-[4px] w-[28px] rounded-full bg-[#E12827] ${
                mobileNav ? "-rotate-45" : "rotate-0 "
              } transition-all`}
            />
          </button>
        </div>
        <div
          className={`absolute right-0 top-0 z-[99] m-auto flex w-full flex-col gap-y-6 bg-white p-12 py-10 pt-20 shadow-md shadow-gray-300/50 ${
            mobileNav
              ? "pointer-events-auto h-max opacity-100"
              : "pointer-events-none h-0 opacity-0"
          }  overflow-hidden shadow-gray-300/50 transition-all`}
        >
          <div className="mt-6 flex items-center rounded-full border px-4">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => onSearch(e)}
              type="text"
              placeholder="What are you looking for?"
              className="w-full border-[#D9D9D9] bg-transparent py-2 text-xl font-normal text-black outline-none placeholder:text-[14px] placeholder:text-black"
            />
            <svg
              onClick={() =>
                (window.location.href = `/projects?keyword=${keyword}`)
              }
              className="block md:hidden"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.40472 2.399C5.78895 -0.864371 10.8254 -0.734301 13.9576 2.399C16.9528 5.39522 17.1359 10.1393 14.5069 13.3492L19.1564 18.0007L18.0011 19.1564L13.3512 14.5053C10.1423 17.1352 5.39992 16.952 2.40472 13.9558C-0.727511 10.8225 -0.874791 5.5614 2.40472 2.399ZM12.8023 3.55468C10.2501 1.00162 6.1122 1.00162 3.56001 3.55468C1.00782 6.10774 1.00782 10.2471 3.56001 12.8001C6.1122 15.3532 10.2501 15.3532 12.8023 12.8001C15.3545 10.2471 15.3545 6.10774 12.8023 3.55468Z"
                fill="#000"
              />
            </svg>
          </div>
          <nav>
            <ul className="flex flex-col gap-y-6 font-quicksand text-[14px] font-bold">
              {menu &&
                menu.map((m: any) => {
                  const isActive = m?.link.url
                    .substring(1)
                    .includes(pathname.split("/")[1]);
                  return (
                    <li className="px-[13px]">
                      {m?.link.url !== "/project" && (
                        <Link
                          onClick={() => setMobileNav(false)}
                          className={`transition-all duration-[0.3px] ease-in-out hover:text-[#BD1817]/70 ${
                            isActive && pathname !== "/" && "text-[#BD1817]"
                          }`}
                          href={m?.link.url}
                        >
                          {m?.link.label}
                        </Link>
                      )}
                      {m?.link.url === "/project" && (
                        <>
                          <button
                            onClick={() => setMegamenu(!openMegamenu)}
                            className={`${
                              openMegamenu || pathname.includes("/project")
                                ? "text-[#BD1817] !opacity-100"
                                : ""
                            } flex items-center transition-all duration-[0.3px] ease-in-out hover:text-[#BD1817]/70`}
                          >
                            {m?.link.label}
                            <svg
                              className={`ml-[7px] ${
                                openMegamenu ? "rotate-180" : "rotate-0"
                              } transition-all`}
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="9"
                              viewBox="0 0 15 9"
                              fill="#888"
                            >
                              <path d="M1 1L7.5 7.5L14 1" stroke="white" />
                            </svg>
                          </button>
                          <>
                            {openMegamenu && projectsMegaMenu && (
                              <div className="z-[999] h-max py-6">
                                <div className="container relative mx-auto border-y  bg-white py-6 pb-[52px] text-black">
                                  <div className="flex flex-col pb-[20px]">
                                    <div className="flex flex-col">
                                      <h3 className=" text-[18px] font-[400]">
                                        Browse by Property Type
                                        <div className="mt-[24px] h-[4px] w-[55px] bg-[#E02926]" />
                                      </h3>
                                      <div className="mt-6 flex pt-[7px] leading-[24px]">
                                        <div className="flex flex-col pr-[75px]">
                                          {browseByPropertyType
                                            .slice(0, 4)
                                            .map((m: any) => (
                                              <a
                                                onClick={() =>
                                                  setMobileNav(false)
                                                }
                                                href={`/projects?propertyType=${m?.id}`}
                                                className="link-hover mb-[22px] w-max text-[12px] text-[#000]"
                                              >
                                                {m?.title}
                                              </a>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-10 flex flex-col">
                                      <h3 className=" text-[18px] font-[400]">
                                        Browse by Province
                                        <div className="mt-[24px] h-[4px] w-[55px] bg-[#E02926]" />
                                      </h3>
                                      <div className="mt-6 grid grid-cols-2 pt-[7px] leading-[24px]">
                                        <div className="grid grid-cols-2 gap-x-32 gap-y-6">
                                          {browseByProvince.map((m: any) => (
                                            <a
                                              onClick={() =>
                                                setMobileNav(false)
                                              }
                                              href={`/projects?province=${m?.id}`}
                                              className="link-hover w-max text-[12px] text-[#000]"
                                            >
                                              {m?.title}
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-10 flex">
                                    <div className="flex flex-col">
                                      <h3 className="text-[18px] font-[400]">
                                        Browse by City
                                        <div className="mt-[24px] h-[4px] w-[55px] bg-[#E02926]" />
                                      </h3>
                                      <div className="pt-[7px]">
                                        <div className="grid grid-cols-2 gap-x-32 gap-y-6">
                                          {browseByCity.map((m: any) => (
                                            <a
                                              onClick={() =>
                                                setMobileNav(false)
                                              }
                                              href={`/projects?location=${m?.id}`}
                                              className="link-hover w-max text-[12px] text-[#000]"
                                            >
                                              {m?.title}
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        </>
                      )}
                    </li>
                  );
                })}
            </ul>
          </nav>
          <Button
            className="z-[51] w-max px-4 py-2 text-sm md:px-6 md:py-4"
            onClick={() => setModal(!modal)}
          >
            Schedule A Trip Today
          </Button>
        </div>
      </header>
      {modal && (
        <Modal>
          <PresentationForm onClose={toggleModal} />
        </Modal>
      )}
    </div>
  );
};

export const PresentationForm = ({
  onClose,
  formData,
  inquireNow = false,
  title = "Schedule a Trip Now",
}: any) => {
  const [inputTime, setInputTime] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputNotes, setInputNotes] = useState("");
  const [selected, setSelected] = useState(null);
  const [today, setToday] = useState(moment() as any);
  const [page, setPage] = useState(1);
  const [projects, setProjects] = useState({} as any);
  const [searchInquiry, setSearchInquiry] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [data, setData] = useState(formData ?? {}) as any;
  const [isAgreed, setIsAgreed] = useState(false);

  const [loader, setLoader] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [captcha, setCaptcha] = useState<any>(null);
  const recaptchRef = useRef<any>(null);
  const [captchaError, setCaptchaError] = useState<any>(null);
  const { submitInquiry } = useZoho();

  const handleCaptchaSubmission = async (token: string | null) => {
    return await verifyCaptcha(token)
      .then((res: any) => {
        if (res?.success) {
          setCaptcha(res.success);
        } else {
          setCaptchaError(res?.message);
        }
      })
      .catch((err: any) => {
        console.error(err);
        setCaptcha(false);
      });
  };

  const dates = [
    moment(today),
    moment(today).add(1, "day"),
    moment(today).add(2, "day"),
    moment(today).add(3, "day"),
    moment(today).add(4, "day"),
  ];

  const datesMobile = [
    moment(today),
    moment(today).add(1, "day"),
    moment(today).add(2, "day"),
  ];

  const onForward = (limit = 5 as any) => {
    setPage((p: any) => p + 1);
    setToday(moment(today).add(limit, "day"));
  };

  const onBackward = (limit = 5 as any) => {
    setPage((p: any) => p - 1);
    setToday(moment(today).subtract(limit, "day"));
  };

  const onSearch = _.debounce((e: any) => {
    setSearchInquiry(e.target.value);
    if (e.target.value.length <= 0) {
      setSearchVisible(false);
    } else {
      const query = qs.stringify({
        "where[or][0][and][0][_status]": {
          equals: "published",
        },
      });

      const locationquery = qs.stringify({
        "where[or][0][and][1][location.title]": {
          like: e.target.value,
        },
      });

      const titlequery = qs.stringify({
        "where[or][1][and][1][title]": {
          like: e.target.value,
        },
      });

      fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/futura-projects?limit=5&${query}&${locationquery}&${titlequery}`
      )
        .then((response) => response.json())
        .then((data: any) => {
          setProjects(data.docs);
          setSearchVisible(true);
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching projects:", error);
        });
    }
  }, 300);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (data: any) => {
    // Your click event handling logic here
    setSearchVisible(false);
    setData(data);
  };

  const areAllInputsFilled = () => {
    const DateNumber = moment(selected).format("D");

    if (inquireNow) {
      return (
        inputFirstName.trim() !== "" &&
        inputLastName.trim() !== "" &&
        inputPhone.trim() !== "" &&
        inputEmail.trim() !== "" &&
        inputNotes.trim() !== "" &&
        isAgreed === true &&
        Object.keys(data).length > 0
      );
    }

    return (
      inputFirstName.trim() !== "" &&
      inputLastName.trim() !== "" &&
      inputPhone.trim() !== "" &&
      inputEmail.trim() !== "" &&
      inputNotes.trim() !== "" &&
      isAgreed === true &&
      Object.keys(data).length > 0 &&
      !isNaN(Number(DateNumber))
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!captcha) {
      return setCaptcha("");
    }

    setLoader(true);
    try {
      const payload = {
        data: [
          {
            First_Name: inputFirstName,
            Last_Name: inputLastName,
            Email: inputEmail,
            Phone: inputPhone,
            Web_Inquiry: inputNotes,
            Lead_Source: "Website",
            Website_Source: window.location.hostname,
            Reason_for_contacting_us: "Inquire about a property",
            Project_Category: data.propertyType.title ?? "",
            Project_Name: data.title,
            Product_Type: data.propertyDetails.projectType.title ?? "",
            Management_Group: data.locationGroup.title ?? "",
          },
        ],
        trigger: ["approval", "workflow", "blueprint"],
      };
      const res = await submitInquiry(payload);

      if (res) {
        alert("Your request has been submitted!");
        setLoader(false);
        onClose();
      } else {
        alert("Oooops! Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="left-0 top-0 z-[999999] flex items-center justify-center overflow-scroll bg-black/50 p-10 md:fixed md:h-screen md:w-screen md:p-0">
      <Card style="max-w-[600px] p-10 bg-white mt-[400px] md:mt-[600px] relative rounded-xl border md:border-none">
        <div className="mb-4 flex items-center justify-between px-4 md:px-0">
          <div className="flex w-full flex-col items-center gap-y-4">
            <p className="w-full text-center font-quicksand text-[25px] font-bold md:text-[20px]">
              {title}
            </p>
            <div className="h-[3px] w-[100px] rounded-full bg-[#E12827]" />
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border p-2 shadow-md"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.6569 5.65685C16.0474 5.26633 16.6804 5.26633 17.0709 5.65685C17.4614 6.04738 17.4614 6.68038 17.0709 7.07091L12.4142 11.7276L17.071 16.3844C17.4615 16.7749 17.4615 17.4079 17.071 17.7984C16.6804 18.1889 16.0474 18.1889 15.6569 17.7984L11 13.1416L6.34315 17.7984C5.95262 18.1889 5.31962 18.1889 4.92909 17.7984C4.53856 17.4079 4.53856 16.7749 4.92909 16.3844L9.58586 11.7276L4.92909 7.07091C4.53856 6.68038 4.53856 6.04738 4.92909 5.65685C5.31962 5.26633 5.95262 5.26633 6.34315 5.65685L11 10.3137L15.6569 5.65685Z"
                fill="#000"
              />
            </svg>
          </button>
        </div>
        <div className={`${!inquireNow ? "mb-10" : ""} mt-12`}>
          <div className="mb-[25px] flex border-b border-b-[#D4D4D4]">
            <div className="relative inline-block w-full flex-shrink-0 px-[5px] pb-[11px] text-[20px] leading-[24px]">
              Property
              <div className="absolute bottom-0 left-0 h-[1px] w-full max-w-[153px] bg-red-700"></div>
            </div>
          </div>
          {Object.keys(data).length > 0 ? (
            <div className="mb-[35px] flex items-center">
              <div
                className="relative mr-[23px] h-[170px] w-full max-w-[148px] bg-gray-50 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${data?.headerImage?.url})`,
                  borderRadius: "10px",
                }}
              >
                <Link
                  href={`/project/${data?.slug}`}
                  className="absolute bottom-0 left-0 right-0 top-0"
                ></Link>
              </div>
              <div className="">
                <h4 className="pb-[13px] text-[26px] font-[500] leading-[32px]">
                  <Link href={`/project/${data?.slug}`}>{data?.title}</Link>
                </h4>
                <div className="pb-[9px]">
                  <label className="text-[18px] leading-[24px] text-[#787878]">
                    Address
                  </label>
                  <p className="text-[20px] font-[500] leading-[25px]">
                    {data?.subLocationTwo
                      ? `${data.subLocationTwo?.title}, `
                      : ""}
                    {data.location?.title}
                    {`, ${data?.locationGroup?.title}`}
                  </p>
                </div>
                <div>
                  <label className="text-[18px] leading-[24px] text-[#787878]">
                    Unit Price
                  </label>
                  <p className="text-[20px] font-[500] uppercase leading-[25px]">
                    ₱ {numbro(data?.minPrice).format("0.0a")} -{" "}
                    {numbro(data?.maxPrice).format("0.0a")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <input
              type="text"
              className="mt-3 w-full border bg-gray-100 px-4 py-4 focus:outline-[#E02926]/80"
              placeholder="Search..."
              onChange={onSearch}
            />
          )}
        </div>

        {searchVisible && Object.keys(data).length === 0 ? (
          <>
            <div className="mb-10">
              <div className="flex justify-between pb-[24px] text-[15px]">
                <span>Recommended</span>
                <span className="font-[500]">{projects?.length} results</span>
              </div>
              <div className="max-h-[350px] overflow-y-auto">
                {projects?.length > 0 &&
                  projects?.map((x: any) => (
                    <>
                      <div
                        className="mb-[23px] flex w-full cursor-pointer flex-wrap text-left"
                        onClick={() => handleClick(x)}
                      >
                        <div className="relative flex h-auto w-3/6 bg-gray-50">
                          <div className="absolute left-0 top-0 z-[1] flex h-[23px] items-center justify-center bg-[#E02926] px-[12px] text-[10px] font-[500] uppercase tracking-[1px] text-white">
                            {x.propertyDetails.status?.title}
                          </div>
                          <img
                            src={`${x.headerImage?.url}`}
                            alt="Property Image"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="w-3/6 border border-[#D2D2D2]">
                          <div className="border-b border-b-[#D2D2D2] pb-[27px] pl-[23px] pr-[21px] pt-[22px]">
                            <div className="flex justify-end pb-[27px]">
                              <a
                                href="#"
                                className="flex items-center rounded-full bg-[#E12827] px-4 py-2 text-[20px] "
                              >
                                <img
                                  src="/assets/location.png"
                                  className="h-3 object-contain"
                                />
                                <p className="ml-2 text-[12px] font-[500] leading-[25px] text-white">
                                  {x.subLocationTwo?.title
                                    ? `${x.subLocationTwo?.title}, `
                                    : ""}
                                  {x.location.title}
                                </p>
                              </a>
                            </div>
                            <div>
                              <h3 className="text-[25px] leading-[32px]">
                                {x.title}
                              </h3>
                            </div>
                          </div>

                          <div className="flex items-center pb-[18px] pl-[23px] pr-[21px] pt-[14px]">
                            <div className="border-r-2 pr-[20px]">
                              <label className="text-[16px] text-[#878787] ">
                                Price Range
                              </label>
                              <p className="text-[15px] uppercase">
                                ₱{numbro(x.minPrice).format("0a")} - ₱
                                {numbro(x.maxPrice).format("0a")}
                              </p>
                            </div>
                            <div className="pl-[27px]">
                              <label className="text-[16px] text-[#878787]">
                                Unit Type
                              </label>
                              <p className="text-[15px]">
                                {x.propertyDetails.numberOfBedrooms}BR
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {!inquireNow && (
              <div className="mt-30 relative mb-10 flex items-center">
                <div className="flex w-full items-center">
                  {page > 1 && (
                    <button
                      onClick={() => onBackward(5)}
                      className="pointer-events-auto absolute left-[-18px] top-[50%] z-[1] flex h-[40px] w-[40px] flex-shrink-0 translate-y-[-50%] rotate-[90deg] items-center justify-center rounded-[100%] border-[1px] border-[#E2E2E2] bg-white transition-all duration-[0.3s] ease-in-out hover:opacity-50"
                    >
                      <svg
                        className=""
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 21 12"
                        fill="none"
                      >
                        <path d="M1 1L10.5 10.5L20 1" stroke="#000000"></path>
                      </svg>
                    </button>
                  )}
                  {dates.map((d: any) => (
                    <div
                      key={`d_${moment(d).format("MMDDYYYY")}`}
                      className="w-[20%] px-[2.5px]"
                    >
                      <button
                        onClick={() => setSelected(d)}
                        className={`${
                          moment(selected).format("MMDDYYYY") ===
                          moment(d).format("MMDDYYYY")
                            ? "!border-[#E12827] !bg-[#E12827] !text-white"
                            : ""
                        } flex w-full flex-col items-center rounded-md border border-[#DDD] py-[13px] text-center text-[16px] leading-[24px] transition-all duration-[0.3s] ease-in-out`}
                      >
                        <span className="block">{d.format("ddd")}</span>
                        <span className="block text-[30px] font-[500] leading-[35px]">
                          {d.format("DD")}
                        </span>
                        <span className="block">{d.format("MMM")}</span>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => onForward(5)}
                    className="pointer-events-auto absolute right-[-18px] top-[50%] z-[1] flex h-[40px] w-[40px] flex-shrink-0 translate-y-[-50%] rotate-[270deg] items-center justify-center rounded-[100%] border-[1px] border-[#E2E2E2] bg-white transition-all duration-[0.3s] ease-in-out hover:opacity-50"
                  >
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 21 12"
                      fill="none"
                    >
                      <path d="M1 1L10.5 10.5L20 1" stroke="#000000"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
            <div className="mt-2">
              <div className="mb-[25px] flex border-b border-b-[#D4D4D4]">
                <div className="relative inline-block w-full flex-shrink-0 px-[5px] pb-[11px] text-[20px] leading-[24px]">
                  Personal Information
                  <div className="absolute bottom-0 left-0 h-[1px] w-full max-w-[153px] bg-red-700"></div>
                </div>
              </div>
              <form className="gap-4 md:grid md:grid-cols-2">
                <div className="col-span-2 flex flex-col md:flex-row">
                  {/* <input
                          value={inputTime}
                          onChange={(e) => setInputTime(e.target.value)}
                          type="text"
                          className="mt-3 flex-1 py-4 border px-4 bg-gray-100 focus:outline-[#E02926]/80 md:mr-2"
                          placeholder="Time"
                        /> */}
                  <input
                    value={inputFirstName}
                    onChange={(e) => setInputFirstName(e.target.value)}
                    type="text"
                    className="mt-3 flex-1 border bg-gray-100 px-4 py-4 focus:outline-[#E02926]/80 md:mr-2"
                    placeholder="First Name"
                  />
                  <input
                    value={inputLastName}
                    onChange={(e) => setInputLastName(e.target.value)}
                    type="text"
                    className="mt-3 flex-1 border bg-gray-100 px-4 py-4 focus:outline-[#E02926]/80 md:ml-2"
                    placeholder="Last Name"
                  />
                </div>
                <div className="col-span-2 flex flex-col md:flex-row">
                  <input
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    type="text"
                    className="mt-3 flex-1 border bg-gray-100 px-4 py-4 focus:outline-[#E02926]/80 md:mr-2"
                    placeholder="Phone"
                  />
                  <input
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    type="text"
                    className="mt-3 flex-1 border bg-gray-100 px-4 py-4 focus:outline-[#E02926]/80 md:ml-2"
                    placeholder="Email"
                  />
                </div>
              </form>
            </div>
            <div className="col-span-2">
              <textarea
                value={inputNotes}
                onChange={(e) => setInputNotes(e.target.value)}
                className="mt-3 w-full border bg-gray-100 px-4 py-4 focus:outline-[#E02926]/80"
                rows={4}
                placeholder="Enter your message"
              />
            </div>
            <div className="col-span-2 flex items-center">
              <input
                type="checkbox"
                id="agreeCheckbox"
                className="mr-2 bg-red-500"
                onChange={() => setIsAgreed(!isAgreed)}
                checked={isAgreed}
              />
              <label htmlFor="agreeCheckbox" className="text-gray-600">
                By submitting this form I agree to{" "}
                <a
                  target="_blank"
                  href="https://filinvest.com/terms-and-conditions"
                  className="text-[#E02926] underline hover:text-[#E02926]/70"
                >
                  Terms of Use
                </a>
              </label>
            </div>
            <div className="mt-2 flex flex-col">
              <ReCAPTCHA
                ref={recaptchRef}
                sitekey={
                  process.env.GOOGLE_RECAPTCHA_SITE_KEY ??
                  "6LdR3xwpAAAAAMRLrT3h4K9OdIl1XSPU2kpxFZgi"
                }
                onChange={handleCaptchaSubmission}
              />
              {captcha !== null && captcha === "" && (
                <p className="pt-6 text-[red]">
                  {captchaError ?? "Please verify that you are not a robot."}
                </p>
              )}
            </div>

            <div className="col-span-2 mt-12">
              <button
                disabled={!areAllInputsFilled()}
                onClick={(e) => !loader && handleSubmit(e)}
                className={`w-full ${
                  !areAllInputsFilled() || loader
                    ? `bg-gray-200 text-black`
                    : `bg-[#E02926] text-white`
                } h-[60px] rounded py-3 uppercase`}
                type="button"
              >
                {loader ? "sending..." : "Submit your request"}
              </button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Header;
