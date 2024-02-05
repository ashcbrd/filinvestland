"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Button from "../general/button";
import { Typography } from "../typography/typography";
import Image from "next/image";

const HeaderBanner = ({
  children,
  data,
  noOverlay = false,
  customClass = "",
}: {
  data: any;
  children?: any;
  noOverlay?: boolean;
  customClass?: string;
}) => {
  return (
    <>
      <StyledBannerSection
        className={`${customClass} ${
          children ? "" : "h-[50vh]"
        } relative flex w-full items-center justify-center lg:h-[764px] lg:min-h-fit xl:h-[917px] 2xl:h-[1146px]`}
      >
        {!noOverlay && (
          <div className="h-full h-screen transition-all before:absolute before:inset-0 before:z-[1] before:bg-[#130A01]/70 before:content-['']" />
        )}
        <Image
          src={data?.mediaBackground?.url ?? data?.url}
          fill
          alt={data?.title}
          sizes="100vw"
          objectFit="cover"
          priority
          quality={100}
        />
        {children}
      </StyledBannerSection>
    </>
  );
};

const StyledBannerSection = styled.section`
  @media screen and (max-height: 600px) {
    img {
      height: auto;
      min-height: 600px;
    }
  }
`;

export default HeaderBanner;
