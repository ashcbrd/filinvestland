"use client";
import React, { useEffect, useState } from "react";
import { getters } from "@/context/Common";
import Script from "next/script";
import { getCookie, setCookie } from "cookies-next";
import { getDomainRedirection } from "@/utils";
import dynamic from "next/dynamic";
import ChatIcon from "@mui/icons-material/Chat";

const Zoho = dynamic(() => import("../Zoho/Zoho"));

const Footer = () => {
  const contents = getters().footerContents;
  const floating = getters().floatingContents;
  const [cookiePolicy, setCookiePolicy] = useState(1);
  const [origin, setOrigin] = useState("");
  const [zoho, setZoho] = useState(false);
  const onClick = () => {
    document.getElementById("zoho-trigger")?.click();
    setZoho(!zoho);
  };

  const onSetPolicy = () => {
    setCookie("policy", 1);
    setCookiePolicy(1);
  };

  useEffect(() => {
    setCookiePolicy(getCookie("policy") ? 1 : 0);

    if (window !== undefined) {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    <>
      <div id="main-footer" className="bg-aqua-blue text-white">
        <div className="fprimary pb-[100px] pt-[64px] tablet:!pb-[60px] tablet:!pt-[60px]">
          <div className="container flex justify-between lg:flex-col">
            <div className="fcol mr-[99px] max-w-[203px] leading-[22px] lg:mr-0 lg:max-w-full lg:pb-[40px]">
              <div className="pb-[18px]">
                {contents.AspireFilinvestLogo && (
                  <img
                    className="tablet:!w-[120px] lg:w-[197px]"
                    src={contents.AspireFilinvestLogo?.url}
                    alt={contents.AspireFilinvestLogo?.alt}
                  />
                )}
              </div>
              <p>{contents.description}</p>
            </div>
            {contents.ConnectWithUs && (
              <>
                <div className="fcol mr-[36px] max-w-[255px] lg:mr-0 lg:max-w-full lg:pb-[40px]">
                  <h6 className="pb-[29px] text-[18px] font-[400] leading-[23px] text-sky-blue lg:pb-[15px]">
                    Contact Us
                  </h6>
                  <div>
                    <p className="pb-[13px]">{contents.ContactUs?.address}</p>
                    <p className="pb-[6px]">
                      <a
                        href={`tel:${contents.ContactUs?.firstPhone}`}
                        className="transition-all duration-[0.3s] ease-in-out hover:text-[#28D8FF]"
                      >
                        {contents.ContactUs?.firstPhone}
                      </a>
                    </p>
                    <p className="pb-[6px]">
                      <a
                        href={`tel:${contents.ContactUs?.secondPhone}`}
                        className="transition-all duration-[0.3s] ease-in-out hover:text-[#28D8FF]"
                      >
                        {contents.ContactUs?.secondPhone}
                      </a>
                    </p>
                    <p>
                      <a
                        href={`mailto:${contents.ContactUs?.emailAddress}`}
                        className="transition-all duration-[0.3s] ease-in-out hover:text-[#28D8FF]"
                      >
                        {contents.ContactUs?.emailAddress}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="fcol mr-[88px] max-w-[177px] lg:mr-0 lg:max-w-full lg:pb-[40px]">
                  <h6 className="pb-[29px] text-[18px] font-[400] leading-[23px] text-sky-blue lg:pb-[15px]">
                    Connect with us
                  </h6>
                  <ul className="mx-[-5px] flex">
                    <li className="px-[5px]">
                      <a
                        href={contents.ConnectWithUs.facebookLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-[36px] w-[36px] items-center justify-center rounded-[100%] border border-[#28D8FF] transition-all duration-[0.3s] ease-in-out hover:bg-[#28D8FF]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="18"
                          viewBox="0 0 10 18"
                          fill="none"
                        >
                          <path
                            d="M6.33954 17.5316V9.77396H8.94242L9.33293 6.74977H6.33954V4.81926C6.33954 3.94395 6.58161 3.34745 7.83821 3.34745L9.43829 3.34679V0.64184C9.16158 0.605881 8.21173 0.523438 7.1062 0.523438C4.79768 0.523438 3.21722 1.93254 3.21722 4.51974V6.74977H0.606445V9.77396H3.21722V17.5316H6.33954Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="px-[5px]">
                      <a
                        href={contents.ConnectWithUs.twitterLink}
                        target="_blank"
                        rel="noreferrer"
                        className="group/twitter flex h-[36px] w-[36px] items-center justify-center rounded-[100%] border border-[#28D8FF] transition-all duration-[0.3s] ease-in-out hover:bg-[#28D8FF]"
                      >
                        <svg
                          width="36"
                          height="37"
                          viewBox="0 0 36 37"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5 26L25 11H23.5L9.5 26H11.5Z"
                            fill="white"
                          ></path>
                          <path
                            d="M21 26L10 11H15L26 26H21Z"
                            className="fill-aqua-blue transition-all duration-[0.3s] ease-in-out group-hover/twitter:fill-[#28D8FF]"
                            stroke="white"
                          ></path>
                        </svg>
                      </a>
                    </li>
                    <li className="px-[5px]">
                      <a
                        href={contents.ConnectWithUs.instagramLink || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-[36px] w-[36px] items-center justify-center rounded-[100%] border border-[#28D8FF] transition-all duration-[0.3s] ease-in-out hover:bg-[#28D8FF]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M12.0969 0.390625H4.29205C2.14592 0.390625 0.389648 2.1469 0.389648 4.29303V12.0982C0.389648 14.2438 2.14592 16.0006 4.29205 16.0006H12.0969C14.243 16.0006 15.9993 14.2438 15.9993 12.0982V4.29303C15.9993 2.1469 14.243 0.390625 12.0969 0.390625ZM14.6984 12.0982C14.6984 13.5323 13.5318 14.6997 12.0969 14.6997H4.29205C2.85773 14.6997 1.69051 13.5323 1.69051 12.0982V4.29303C1.69051 2.85851 2.85773 1.69149 4.29205 1.69149H12.0969C13.5318 1.69149 14.6984 2.85851 14.6984 4.29303V12.0982Z"
                            fill="white"
                          />
                          <path
                            d="M12.422 4.94354C12.9608 4.94354 13.3976 4.50672 13.3976 3.96786C13.3976 3.42901 12.9608 2.99219 12.422 2.99219C11.8831 2.99219 11.4463 3.42901 11.4463 3.96786C11.4463 4.50672 11.8831 4.94354 12.422 4.94354Z"
                            fill="white"
                          />
                          <path
                            d="M8.19372 4.29297C6.03786 4.29297 4.29102 6.04 4.29102 8.19567C4.29102 10.3505 6.03786 12.0988 8.19372 12.0988C10.349 12.0988 12.0964 10.3505 12.0964 8.19567C12.0964 6.04 10.349 4.29297 8.19372 4.29297ZM8.19372 10.7978C6.75692 10.7978 5.59198 9.63285 5.59198 8.19567C5.59198 6.7585 6.75692 5.59393 8.19372 5.59393C9.63052 5.59393 10.7955 6.7585 10.7955 8.19567C10.7955 9.63285 9.63052 10.7978 8.19372 10.7978Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="px-[5px]">
                      <a
                        href={contents.ConnectWithUs.youtubeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-[36px] w-[36px] items-center justify-center rounded-[100%] border border-[#28D8FF] transition-all duration-[0.3s] ease-in-out hover:bg-[#28D8FF]"
                      >
                        <svg
                          width="17"
                          height="12"
                          viewBox="0 0 17 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.6497 1.87771C16.4538 1.14347 15.8796 0.564674 15.1514 0.366965C13.8211 0 8.49981 0 8.49981 0C8.49981 0 3.17869 0 1.84838 0.353052C1.1342 0.550552 0.545985 1.14357 0.350086 1.87771C0 3.21879 0 6 0 6C0 6 0 8.79523 0.350086 10.1223C0.546192 10.8564 1.12019 11.4352 1.84848 11.6329C3.19269 12 8.50002 12 8.50002 12C8.50002 12 13.8211 12 15.1514 11.6469C15.8797 11.4493 16.4538 10.8705 16.6499 10.1364C16.9999 8.79523 16.9999 6.01412 16.9999 6.01412C16.9999 6.01412 17.0139 3.21879 16.6497 1.87771ZM6.80562 8.56938V3.43062L11.2306 6L6.80562 8.56938Z"
                            fill="white"
                          />
                        </svg>
                      </a>
                    </li>
                    <li className="px-[5px]">
                      <a
                        href={
                          contents.ConnectWithUs.tiktokLink ||
                          "https://www.tiktok.com/@aspirebyfilinvest"
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-[36px] w-[36px] items-center justify-center rounded-[100%] border border-[#28D8FF] transition-all duration-[0.3s] ease-in-out hover:bg-[#28D8FF]"
                      >
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_2037_1250)">
                            <path
                              d="M15.0085 4.51953C14.0954 4.51953 13.2529 4.21703 12.5763 3.70672C11.8004 3.12172 11.2429 2.26359 11.046 1.27453C10.9973 1.03016 10.971 0.777969 10.9685 0.519531H8.36007V7.64703L8.35695 11.5511C8.35695 12.5948 7.67726 13.4798 6.73507 13.7911C6.46163 13.8814 6.16632 13.9242 5.85882 13.9073C5.46632 13.8858 5.09851 13.7673 4.77882 13.5761C4.09851 13.1692 3.63726 12.4311 3.62476 11.5867C3.60507 10.267 4.67195 9.19109 5.9907 9.19109C6.25101 9.19109 6.50101 9.23359 6.73507 9.31078V7.36266V6.66234C6.4882 6.62578 6.23695 6.60672 5.98288 6.60672C4.53945 6.60672 3.18945 7.20672 2.22445 8.28766C1.49507 9.10453 1.05757 10.1467 0.990072 11.2395C0.901634 12.6752 1.42695 14.0398 2.4457 15.0467C2.59538 15.1945 2.75257 15.3317 2.91695 15.4583C3.79038 16.1305 4.8582 16.4948 5.98288 16.4948C6.23695 16.4948 6.4882 16.4761 6.73507 16.4395C7.7857 16.2839 8.75507 15.803 9.52007 15.0467C10.4601 14.1177 10.9794 12.8842 10.9851 11.5714L10.9716 5.74141C11.4201 6.08734 11.9104 6.37359 12.4366 6.59578C13.2551 6.94109 14.1229 7.11609 15.016 7.11578V5.22172V4.51891C15.0166 4.51953 15.0091 4.51953 15.0085 4.51953Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2037_1250">
                              <rect
                                width="16"
                                height="16"
                                fill="white"
                                transform="translate(0 0.507812)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            )}
            <div className="fcol mr-[112px] max-w-[132px] flex-shrink-0 lg:mr-0 lg:max-w-full lg:pb-[40px]">
              <h6 className="pb-[29px] text-[18px] font-[400] leading-[23px] text-sky-blue lg:pb-[15px]">
                Learn More
              </h6>
              <ul className="leading-[23px]">
                {contents.LearnMore &&
                  contents.LearnMore.map((m: any) => {
                    return (
                      <li className="pb-[9px]">
                        <a
                          href={getDomainRedirection(
                            origin as string,
                            m.link?.url
                          )}
                          target="_blank"
                          className="transition-all duration-[0.3s] ease-in-out hover:text-[#28D8FF]"
                        >
                          {m.link?.label}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
            {/* <div className="fcol max-w-[324px] lg:max-w-full">
                            <h5 className="pb-[15px] text-[22px] font-[400] leading-[1.2]">
                                {contents.RightSection && contents.RightSection.length > 0 && contents.RightSection[0].description1}
                            </h5>
                            <p>
                                {contents.RightSection && contents.RightSection.length > 0 && contents.RightSection[0].description2}
                            </p>
                        </div> */}
          </div>
        </div>
        <div className="fbottom bg-deep-blue pb-[34px] pt-[40px] text-[16px] text-white">
          <div className="container text-center">
            <p>{contents.copyrightText}</p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-[32px] right-[32px] z-[11] flex items-center md:right-[60px]">
        <a
          href={getDomainRedirection(
            origin,
            floating.HomeCalculator?.homeCalculatorLink
          )}
          target="_blank"
          className="mr-[12px] flex inline-flex h-[72px] w-[72px] items-center justify-center rounded-[10px] bg-white transition-all duration-[0.3s] ease-in-out hover:opacity-70 sm:!hidden md:h-[50px] md:w-[50px]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 40px 2px" }}
        >
          <svg
            className="xs:h-[30px] xs:w-[30px]"
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
          >
            <path
              d="M5.44215 0.355469C2.63245 0.355469 0.355469 2.63245 0.355469 5.44215V21.627H21.627V0.355469H5.44215ZM13.7658 12.841H11.9161V14.6907C11.9161 15.4564 11.2946 16.0779 10.5288 16.0779C9.76305 16.0779 9.14155 15.4564 9.14155 14.6907V12.841H7.29185C6.52608 12.841 5.90458 12.2195 5.90458 11.4537C5.90458 10.6879 6.52608 10.0664 7.29185 10.0664H9.14155V8.2167C9.14155 7.45093 9.76305 6.82943 10.5288 6.82943C11.2946 6.82943 11.9161 7.45093 11.9161 8.2167V10.0664H13.7658C14.5316 10.0664 15.1531 10.6879 15.1531 11.4537C15.1531 12.2195 14.5316 12.841 13.7658 12.841Z"
              fill="#025586"
            />
            <path
              d="M0.355469 23.4766V39.6615C0.355469 42.4712 2.63245 44.7481 5.44215 44.7481H21.627V23.4766H0.355469ZM14.2837 35.4441C14.8257 35.9861 14.8257 36.8647 14.2837 37.4067C14.0137 37.6767 13.6585 37.8118 13.3034 37.8118C12.9482 37.8118 12.5931 37.6767 12.323 37.4048L10.9913 36.073L9.65947 37.4048C9.38941 37.6749 9.03427 37.8118 8.67913 37.8118C8.32399 37.8118 7.96884 37.6767 7.69879 37.4048C7.15682 36.8629 7.15682 35.9842 7.69879 35.4423L9.03057 34.1105L7.69879 32.7787C7.15682 32.2368 7.15682 31.3581 7.69879 30.8162C8.24075 30.2742 9.11936 30.2742 9.66132 30.8162L10.9931 32.148L12.3249 30.8162C12.8669 30.2742 13.7455 30.2742 14.2874 30.8162C14.8294 31.3581 14.8294 32.2368 14.2874 32.7787L12.9556 34.1105L14.2837 35.4441Z"
              fill="#025586"
            />
            <path
              d="M39.6615 0.355469H23.4766V21.627H44.7481V5.44215C44.7481 2.63245 42.4712 0.355469 39.6615 0.355469ZM38.7366 12.3785H30.4129C29.6472 12.3785 29.0257 11.757 29.0257 10.9913C29.0257 10.2255 29.6472 9.60398 30.4129 9.60398H38.7366C39.5024 9.60398 40.1239 10.2255 40.1239 10.9913C40.1239 11.757 39.5024 12.3785 38.7366 12.3785Z"
              fill="#025586"
            />
            <path
              d="M23.4766 23.4766V44.7481H39.6615C42.4712 44.7481 44.7481 42.4712 44.7481 39.6615V23.4766H23.4766ZM38.2742 38.2742H29.9505C29.1847 38.2742 28.5632 37.6527 28.5632 36.8869C28.5632 36.1211 29.1847 35.4996 29.9505 35.4996H38.2742C39.04 35.4996 39.6615 36.1211 39.6615 36.8869C39.6615 37.6527 39.04 38.2742 38.2742 38.2742ZM38.2742 32.7251H29.9505C29.1847 32.7251 28.5632 32.1036 28.5632 31.3378C28.5632 30.572 29.1847 29.9505 29.9505 29.9505H38.2742C39.04 29.9505 39.6615 30.572 39.6615 31.3378C39.6615 32.1036 39.04 32.7251 38.2742 32.7251Z"
              fill="#025586"
            />
          </svg>
        </a>
        <a
          href={getDomainRedirection(
            origin,
            floating.HomeFilpay?.homeFilpayLink
          )}
          target="_blank"
          rel="norefferer"
          className="mr-[12px] flex inline-flex h-[72px] w-[72px] items-center justify-center rounded-[10px] bg-white transition-all duration-[0.3s] ease-in-out hover:opacity-70 sm:!hidden md:h-[50px] md:w-[50px]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 40px 2px" }}
        >
          <img
            className="xs:h-[20px] xs:w-full"
            src="/images/pay-all.png"
            alt="Pay All"
          />
        </a>
        <button
          onClick={onClick}
          className="chat-with-us-body transition-all duration-[0.3s] ease-in-out hover:opacity-70"
        >
          <div className="flex items-center">
            <div className="relative mr-[-38px] flex h-[76px] w-[76px] items-center justify-center rounded-[100%] bg-[#0666AB] md:h-[50px] md:w-[50px]">
              <ChatIcon sx={{ fontSize: 30, fill: "#fff" }} />
            </div>
            <div className="bg-[#0377CB] pb-[14px] pl-[50px] pr-[42px] pt-[9px] text-left text-white md:hidden">
              <label className="inline-block text-[14px] leading-none tracking-[-0.28px]">
                Interested in a Property?
              </label>
              <p className="text-[18px] font-[500] leading-[26px] tracking-[-0.36px]">
                Chat With Us Today
              </p>
            </div>
          </div>
        </button>
      </div>
      {!cookiePolicy && (
        <div
          id="policy"
          className="fixed bottom-[25px] left-0 right-0 z-[25] mx-auto max-w-[1000px] rounded-[5px] bg-aqua-blue/95 p-[20px] px-[30px] text-white"
          style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 40px 2px" }}
        >
          <h3 className="pb-[10px] text-[24px] font-[700]">Cookie Policy</h3>
          <p className="pb-[15px]">
            aspirebyfilinvest.com uses cookies to ensure that you get the best
            experience. By continuing to browse our site, you are agreeing to
            our use of cookies. For further info, please read our{" "}
            <a
              href="https://fli-land.stagingurls.com/privacy"
              target="_blank"
              className="underline"
            >
              Privacy Policy
            </a>
          </p>
          <button
            onClick={onSetPolicy}
            className="mb-[5px] flex h-[45px] items-center border border-white bg-white px-[25px] text-[17px] font-[600] text-aqua-blue transition-all duration-[0.3s] ease-in-out hover:!bg-transparent hover:!text-white"
          >
            I agree
          </button>
        </div>
      )}
      <Script
        type="text/javascript"
        async
        src="https://crm.zoho.com/crm/javascript/zcga.js"
      />
      <Zoho zoho={zoho} />
    </>
  );
};

export default Footer;
