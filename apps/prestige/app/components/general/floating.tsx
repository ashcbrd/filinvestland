"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Zoho from "@/app/containers/zoho";
import Script from "next/script";
import { getDomainRedirection } from "@/app/utils";

export const Floating = () => {
  const [floatingData, setFloatingData] = useState<any>(null);
  const [origin, setOrigin] = useState<any>(null)
  const onClick = () => {
    document.getElementById("zoho-trigger")?.click();
  };

  const getFloatingData = async () => {
    const footerPrestigeQuery = await fetch(
      `${process.env.CMS_URL}/api/globals/prestige-floating-menu`,
      { cache: "no-cache" }
    );

    return await footerPrestigeQuery.json();
  };

  useEffect(() => {
    const loadFloating = async () => {
      const data = await getFloatingData();

      setFloatingData(data);
      console.log(data);
    };

    loadFloating();
    if (window !== undefined) {
      setOrigin(window.location.origin)
    }
  }, []);

  return (
    <div className="fixed bottom-3 right-3 z-[5] grid h-auto w-auto grid-cols-[auto,_auto,_1fr] gap-2 sm:bottom-8 sm:right-12 sm:gap-3">
      {/* <Link
        target="_blank"
        href={"https://marketing.filinvest.ph/home-loan-calculator"}
        className="cursor-pointer outline-none h-12 sm:h-16 w-12 sm:w-16 p-1 sm:p-2 flex items-center justify-center bg-white rounded-full shadow-lg"
      >
        <Image
          alt="s"
          src={"/assets/images/g2415.svg"}
          className="w-6 sm:w-8"
          width={16}
          height={16}
        />
      </Link> */}
      <Link
        target="_blank"
        href={
          getDomainRedirection(
            origin,
            floatingData?.HomeFilpay?.homeFilpayLink
          ) ?? ""
        }
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-1 shadow-lg outline-none sm:h-16 sm:w-16"
      >
        <Image
          alt="s"
          src={"/assets/images/Pay-All.svg"}
          className="w-12 sm:w-16"
          width={16}
          height={16}
        />
      </Link>
      <button
        onClick={onClick}
        className="chat-with-us-body flex h-12 cursor-pointer items-center gap-2 rounded-full rounded-br-none rounded-tr-none bg-[#C56007] pr-3 text-left shadow-lg outline-none sm:h-16 sm:gap-3 sm:pr-5"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#9F4C03] shadow-lg sm:h-16 sm:w-16">
          <Image
            alt="s"
            src={"/assets/images/user.svg"}
            className="w-6 sm:w-8"
            width={16}
            height={16}
          />
        </div>
        <span className="flex flex-1 flex-col">
          <span className="text-xs text-[#FFAA5F] sm:text-base">
            Interested in a Property?
          </span>
          <span className="text-sm text-white sm:text-lg">
            Chat With Us Today
          </span>
        </span>
      </button>
      <Script
        type="text/javascript"
        async
        src="https://crm.zoho.com/crm/javascript/zcga.js"
      />
      <Zoho />
    </div>
  );
};
