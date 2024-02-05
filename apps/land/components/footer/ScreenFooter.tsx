"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ZoBot from "./ZoBot";
import useGetFloatingMenu from "../navigation/MainNavigation/hooks/useGetFloatingMenu";
import { getDomainRedirection } from "../../utils";

const ScreenFooter = ({ content }: any) => {
  const { data } = useGetFloatingMenu();
  const [origin, setOrigin] = useState<any>("");

  useEffect(() => {
    if (window !== undefined) {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    <>
      <div className="fixed bottom-[40px] right-4 z-[100] md:right-7">
        <div className="flex items-center justify-center gap-2">
          {data && (
            <Link
              href={
                getDomainRedirection(
                  origin as string,
                  data?.HomeCalculator?.homeCalculatorLink
                ) as any
              }
              target="_blank"
              className="image-float mr-[0.4rem] flex h-[55px] w-[55px] items-center justify-center rounded-[10px] bg-white md:h-[72px] md:w-[72px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                src={data?.HomeCalculator?.homeCalculatorIcon?.url}
                alt="calchome"
                width={72}
                height={72}
                className="rounded-[10px]"
              />
            </Link>
          )}
          {data && (
            <Link
              href={
                getDomainRedirection(
                  origin as string,
                  data?.HomeFilpay?.homeFilpayLink
                ) as any
              }
              target="_blank"
              className="image-float mr-[0.4rem] flex h-[55px] w-[55px] items-center justify-center rounded-[10px] bg-white md:h-[72px] md:w-[72px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                src={data?.HomeFilpay?.filpayIcon?.url}
                alt="FilPay Floating"
                width={72}
                height={72}
                className="rounded-[10px]"
              />
            </Link>
          )}
          <button>
            <div className="chat-with-us-body mr-[20px] flex items-center">
              <div className="chat-with-us-circle relative mr-[-38px] flex h-[76px] w-[76px] items-center justify-center rounded-[100%] bg-[#1c58bb]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="28"
                  viewBox="0 0 23 28"
                  fill="none"
                >
                  <path
                    d="M11.5145 13.4957C15.2202 13.4957 18.2244 10.5069 18.2244 6.82012C18.2244 3.13329 15.2202 0.144531 11.5145 0.144531C7.80878 0.144531 4.80469 3.13329 4.80469 6.82012C4.80469 10.5069 7.80878 13.4957 11.5145 13.4957Z"
                    fill="white"
                  ></path>
                  <path
                    d="M15.0075 16.2773H8.01814C3.96429 16.2773 0.609375 19.6153 0.609375 23.6484C0.609375 24.6219 1.02874 25.4564 1.86747 25.8736C3.12555 26.569 5.92132 27.4032 11.5128 27.4032C17.1044 27.4032 19.9001 26.569 21.1582 25.8736C21.8571 25.4564 22.4163 24.6219 22.4163 23.6484C22.4163 19.4761 19.0614 16.2773 15.0075 16.2773Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="chat-with-us-float bg-[#103d97] pb-[13px] pl-[50px] pr-[42px] pt-[13px] text-left text-white">
                <label className="inline-block text-[14px] leading-none tracking-[-0.28px]">
                  Interested in a Property?
                </label>
                <p className="text-[18px] font-[500] leading-[26px] tracking-[-0.36px]">
                  Chat With Us Today
                </p>
              </div>
            </div>
          </button>
          {data && (
            <ZoBot
              icon={data?.ZohoBot?.zohoIcon?.url}
              widgetCode={process.env.ZOHO_BOT_WIDGET_CODE || ""}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ScreenFooter;
