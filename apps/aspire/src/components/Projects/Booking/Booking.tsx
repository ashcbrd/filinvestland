"use client";

import Overlay from "@/components/Overlay/Overlay";
import React, { useRef, useState } from "react";
import { getters, setters } from "@/context/Projects";
import Slider from "@/components/Slider/Slider";
import numbro from "numbro";
import Link from "next/link";
import moment from "moment";
import Request from "@/config/API";
import _ from "lodash";
import qs from "qs";
import ReCAPTCHA from "react-google-recaptcha";
import verifyCaptcha from "@/app/server-action";
import { useZoho } from "@/utils";

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

const Booking = () => {
  const { submitInquiry } = useZoho();
  const data = getters();
  const methods = setters();
  const generalInquiry = data.generalInquiry;
  const open = data.inquireTo || generalInquiry;
  const [page, setPage] = useState(1);
  const [today, setToday] = useState(moment() as any);
  const [selected, setSelected] = useState(null);
  const [loader, setLoader] = useState(false);
  const [projects, setProjects] = useState({} as any);
  const [isSuccess, setSuccess] = useState(false);
  const [fields, setFields] = useState({
    time: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    isAgreed: false,
  });
  const [captcha, setCaptcha] = useState<any>(null);
  const recaptchRef = useRef<any>(null);
  const [captchaError, setCaptchaError] = useState<any>(null);

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

  const isDisabled =
    !data.inquireTo ||
    !selected ||
    !fields.firstName ||
    !fields.lastName ||
    !fields.email ||
    !fields.message ||
    !fields.isAgreed;

  const onForward = (limit = 5 as any) => {
    setPage((p: any) => p + 1);
    setToday(moment(today).add(limit, "day"));
  };

  const onBackward = (limit = 5 as any) => {
    setPage((p: any) => p - 1);
    setToday(moment(today).subtract(limit, "day"));
  };

  const onClose = () => {
    if (methods.setGeneralInquiry) {
      methods.setGeneralInquiry(false);
    }

    if (methods.setInquireTo) {
      methods.setInquireTo(null);
    }

    setSelected(null);
    setFields((fs: any) => ({
      firstName: "",
      email: "",
      phone: "",
      message: "",
      time: "",
      isAgreed: false,
      lastName: "",
    }));
  };

  async function getToken() {
    try {
      const refreshToken = process.env.NEXT_PUBLIC_ZOHO_REFRESH_TOKEN;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/zoho-token?grant_type=refresh_token`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            Authorization: `${refreshToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to post data");
      }
      const jsonData = await res.json();
      return jsonData.access_token;
    } catch (err) {
      console.log(err);
    }
  }

  async function submitContact(token: string, params: BookingParams) {
    try {
      if (token) {
        const data = {
          data: [params],
          trigger: ["approval", "workflow", "blueprint"],
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/zoho-submit-form`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              Authorization: `Zoho-oauthtoken ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to post data");
        }
        const jsonData = await res.json();
        console.log(jsonData);
        return jsonData;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onBook = async (e: any) => {
    e.preventDefault();

    if (!captcha) {
      return setCaptcha("");
    }

    setLoader(true);
    try {
      const payload = {
        data: [
          {
            First_Name: fields.firstName,
            Last_Name: fields.lastName,
            Email: fields.email,
            Phone: fields.phone,
            Web_Inquiry: fields.message,
            Lead_Source: "Website",
            Website_Source: window.location.hostname,
            Reason_for_contacting_us: "Inquire about a property",
            Project_Category: data.inquireTo.propertyType.title,
            Project_Name: data.inquireTo.title,
            Product_Type: data.inquireTo.propertyDetails.projectType.title,
            Management_Group: data.inquireTo.locationGroup.title,
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

  const onSearch = _.debounce((e: any) => {
    methods.setSearchInquiry(e.target.value);

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

    Request()
      .get(
        `${process.env.CMS_URL}/api/aspire-projects?limit=5&${query}&${locationquery}&${titlequery}`
      )
      .then((res: any) => {
        setProjects(res.data);
      });
  }, 300);

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

  return (
    <>
      {open && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[23] flex items-center justify-center">
          <Overlay className="bg-black/50" onClick={onClose} />
          <div className="relative m-auto max-h-[90%] w-full max-w-[647px] overflow-auto bg-white px-[45px] pb-[54px] pt-[36px] md:h-[100%] md:max-h-[100%] tablet:pt-[80px]">
            <div className="absolute right-[20px] top-[20px]">
              <button
                onClick={onClose}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-[100%] border border-[#E2E2E2] bg-white shadow-booking-close"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.87422 7.50011L14.7149 1.65911C15.095 1.27918 15.095 0.664882 14.7149 0.28495C14.335 -0.0949832 13.7207 -0.0949832 13.3408 0.28495L7.49991 6.12595L1.65921 0.28495C1.27911 -0.0949832 0.665002 -0.0949832 0.285077 0.28495C-0.0950257 0.664882 -0.0950257 1.27918 0.285077 1.65911L6.12578 7.50011L0.285077 13.3411C-0.0950257 13.721 -0.0950257 14.3353 0.285077 14.7153C0.474417 14.9048 0.72337 15 0.972145 15C1.22092 15 1.46969 14.9048 1.65921 14.7153L7.49991 8.87428L13.3408 14.7153C13.5303 14.9048 13.7791 15 14.0279 15C14.2766 15 14.5254 14.9048 14.7149 14.7153C15.095 14.3353 15.095 13.721 14.7149 13.3411L8.87422 7.50011Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
            <div className="pb-[38px] text-center">
              <h3 className="text-[30px] font-[400]">
                Book a Presentation Now
              </h3>
            </div>
            <div className="mb-[25px] flex border-b border-b-[#D4D4D4]">
              <div className="relative inline-block w-full flex-shrink-0 px-[5px] pb-[11px] text-[20px] leading-[24px]">
                Property
                <div className="absolute bottom-0 left-0 h-[1px] w-full max-w-[153px] bg-light-blue"></div>
              </div>
            </div>
            {!data.inquireTo && (
              <div className="mb-[38px]">
                <input
                  className="h-[72px] rounded-[5px] border-0 bg-[#F2F2F2] px-[33px] text-[20px]"
                  placeholder="Search..."
                  onChange={onSearch}
                />
                {data.searchInquiry && projects?.docs?.length > 0 && (
                  <div className="mt-[50px]">
                    <div className="flex justify-between pb-[24px] text-[15px]">
                      <span>Recommended</span>
                      <span className="font-[500]">
                        {projects?.docs?.length} results
                      </span>
                    </div>
                    {projects?.docs?.map((p: any) => (
                      <div className="mb-[23px] flex w-full flex-wrap text-left">
                        <div className="relative flex h-auto w-3/6 bg-gray-50 md:w-full">
                          <div className="absolute left-0 top-0 z-[1] flex h-[23px] items-center justify-center bg-aqua-blue px-[12px] text-[10px] font-[500] uppercase tracking-[1px] text-white">
                            {p.propertyDetails.status?.title}
                          </div>
                          <Slider
                            slideClassName={`h-[222px]`}
                            slides={p.PropertyImages.map((img: any) => ({
                              image: img.image.url,
                            }))}
                            arrowType="bottom-sm"
                            className="flex w-full"
                          />
                        </div>
                        <div className="w-3/6 border border-[#D2D2D2] md:w-full">
                          <button
                            onClick={() => methods.setInquireTo(p)}
                            className="w-full text-left"
                          >
                            <div className="border-b border-b-[#D2D2D2] pb-[27px] pl-[23px] pr-[21px] pt-[22px]">
                              <div className="flex justify-end pb-[27px]">
                                <a
                                  href="#"
                                  className="flex items-center text-[20px]"
                                >
                                  <svg
                                    className="mr-[10px]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="11"
                                    height="16"
                                    viewBox="0 0 11 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M5.06464 0.791016C2.27205 0.791016 0 3.06307 0 5.85566C0 6.694 0.209598 7.52521 0.608052 8.26248L4.78768 15.8217C4.84332 15.9225 4.94935 15.9849 5.06464 15.9849C5.17993 15.9849 5.28596 15.9225 5.3416 15.8217L9.52277 8.25998C9.91968 7.52521 10.1293 6.69397 10.1293 5.85563C10.1293 3.06307 7.85723 0.791016 5.06464 0.791016ZM5.06464 8.38797C3.66834 8.38797 2.53233 7.25196 2.53233 5.85566C2.53233 4.45937 3.66834 3.32335 5.06464 3.32335C6.46093 3.32335 7.59694 4.45937 7.59694 5.85566C7.59694 7.25196 6.46093 8.38797 5.06464 8.38797Z"
                                      fill="#02579A"
                                    />
                                  </svg>
                                  <p className="text-[20px] font-[500] leading-[25px]">
                                    {p.subLocationTwo?.title
                                      ? `${p.subLocationTwo?.title}, `
                                      : ""}
                                    {p.location.title}
                                  </p>
                                </a>
                              </div>
                              <div>
                                <h3 className="text-[25px] leading-[32px]">
                                  {p.title}
                                </h3>
                              </div>
                            </div>
                            <div className="flex items-center pb-[18px] pl-[23px] pr-[21px] pt-[14px]">
                              <div className="pr-[20px]">
                                <label className="text-[16px] text-[#878787]">
                                  Price Range
                                </label>
                                <p className="text-[15px] uppercase">
                                  ₱{numbro(p.minPrice).format("0a")} - ₱
                                  {numbro(p.maxPrice).format("0a")}
                                </p>
                              </div>
                              <div className="pl-[27px]">
                                <label className="text-[16px] text-[#878787]">
                                  Unit Type
                                </label>
                                <p className="text-[15px]">
                                  {p.propertyDetails.numberOfBedrooms}BR
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {data.inquireTo && (
              <div className="mb-[35px] flex items-center">
                <div
                  className="relative mr-[23px] h-[160px] w-full max-w-[148px] bg-gray-50 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${data.inquireTo.headerImage.url})`,
                  }}
                >
                  <Link
                    href={`/project/${data.inquireTo.slug}`}
                    className="absolute bottom-0 left-0 right-0 top-0"
                  ></Link>
                </div>
                <div className="">
                  <h4 className="pb-[17px] text-[30px] font-[500] leading-[32px]">
                    <Link href={`/project/${data.inquireTo.slug}`}>
                      {data.inquireTo.title}
                    </Link>
                  </h4>
                  <div className="pb-[9px]">
                    <label className="leading-[24px] text-custom-gray-2">
                      Address
                    </label>
                    <p className="text-[20px] font-[500] leading-[25px]">
                      {data.inquireTo.subLocationTwo?.title
                        ? `${data.inquireTo.subLocationTwo?.title}, `
                        : ""}
                      {data.inquireTo.location.title}
                    </p>
                  </div>
                  <div>
                    <label className="leading-[24px] text-custom-gray-2">
                      Unit Price
                    </label>
                    <p className="text-[20px] font-[500] uppercase leading-[25px]">
                      ₱ {numbro(data.inquireTo.minPrice).format("0.0a")} -{" "}
                      {numbro(data.inquireTo.maxPrice).format("0.0a")}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {!data.searchInquiry && (
              <>
                <div className="relative mb-[30px] flex items-center">
                  <div className="flex w-full items-center md:hidden">
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
                              ? "!border-blue !bg-aqua-blue !text-white"
                              : ""
                          } flex w-full flex-col items-center border border-[#DDD] py-[13px] text-center text-[16px] leading-[24px] transition-all duration-[0.3s] ease-in-out`}
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
                  <div className="hidden w-full items-center md:flex">
                    {page > 1 && (
                      <button
                        onClick={() => onBackward(3)}
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
                    {datesMobile.map((d: any) => (
                      <div
                        key={`d_${moment(d).format("MMDDYYYY")}`}
                        className="w-[33.33%] px-[2.5px]"
                      >
                        <button
                          onClick={() => setSelected(d)}
                          className={`${
                            moment(selected).format("MMDDYYYY") ===
                            moment(d).format("MMDDYYYY")
                              ? "!border-blue !bg-aqua-blue !text-white"
                              : ""
                          } flex w-full flex-col items-center border border-[#DDD] py-[13px] text-center text-[16px] leading-[24px] transition-all duration-[0.3s] ease-in-out`}
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
                      onClick={() => onForward(3)}
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
                <div className="mb-[33px] flex border-b border-b-[#D4D4D4]">
                  <div className="relative inline-block w-full flex-shrink-0 px-[5px] pb-[11px] text-[20px] leading-[24px]">
                    Personal Information
                    <div className="absolute bottom-0 left-0 h-[1px] w-full max-w-[153px] bg-light-blue"></div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <form className="w-full" onSubmit={onBook}>
                    <div className="mx-[-5px] mb-[15px] flex flex-wrap">
                      <div className="w-3/6 px-[5px] md:mb-[15px] md:w-full">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={fields.firstName}
                          onChange={(e) =>
                            setFields((fs: any) => ({
                              ...fs,
                              firstName: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="w-3/6 px-[5px] md:w-full">
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={fields.lastName}
                          onChange={(e) =>
                            setFields((fs: any) => ({
                              ...fs,
                              lastName: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="mx-[-5px] mb-[15px] flex flex-wrap">
                      <div className="w-3/6 px-[5px] md:mb-[15px] md:w-full">
                        <input
                          type="text"
                          placeholder="Phone"
                          value={fields.phone}
                          onChange={(e) =>
                            setFields((fs: any) => ({
                              ...fs,
                              phone: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="w-3/6 px-[5px] md:w-full">
                        <input
                          type="text"
                          placeholder="Email"
                          value={fields.email}
                          onChange={(e) =>
                            setFields((fs: any) => ({
                              ...fs,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="flex w-full pb-[7px]">
                      <textarea
                        placeholder="Enter your message"
                        value={fields.message}
                        onChange={(e) =>
                          setFields((fs: any) => ({
                            ...fs,
                            message: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex w-full items-center pb-[7px] md:pt-[10px] md:text-[14px]">
                      <button
                        type="button"
                        onClick={() =>
                          setFields((fs: any) => ({
                            ...fs,
                            isAgreed: !fs.isAgreed,
                          }))
                        }
                        className={`mr-[8px] flex h-[15px] w-[15px] items-center justify-center border border-[#D9D2D2] ${
                          fields.isAgreed ? "!border-light-blue" : ""
                        }`}
                      >
                        {fields.isAgreed && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 14L9 17L18 6"
                              className="stroke-light-blue"
                            />
                          </svg>
                        )}
                      </button>
                      <span>
                        By submitting this form I agree to{" "}
                        <a
                          href="https://filinvest.com/terms-and-conditions"
                          target="_blank"
                          className="text-light-blue"
                        >
                          Terms of Use
                        </a>
                      </span>
                    </div>
                    <div className="pb-[39px]">
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
                          {captchaError ??
                            "Please verify that you are not a robot."}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className={`${
                        loader || isDisabled
                          ? "!pointer-events-none !border-[#F2F2F2] !bg-[#F2F2F2] !text-black"
                          : ""
                      } flex h-[67px] w-full items-center justify-center border border-light-blue bg-light-blue text-center text-[16px] font-[500] uppercase tracking-[1.6px] text-white transition-all duration-[0.3s] ease-in-out hover:!bg-transparent hover:!text-light-blue`}
                    >
                      {loader ? "Sending..." : "Submit your request"}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div
        className={`${
          isSuccess ? "!translate-y-[0%]" : ""
        } fixed bottom-[30px] left-0 right-0 z-[22] mx-auto max-w-[600px] translate-y-[150%] rounded-[10px] bg-white p-[30px] text-center text-[20px] font-[700] transition-all duration-[0.3s] ease-in-out`}
        style={{ boxShadow: "0px 4px 40px 2px rgba(0, 0, 0, 0.10)" }}
      >
        <p>Appointment was succesfully sent.</p>
      </div>
    </>
  );
};

export default Booking;
