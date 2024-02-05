"use client";

import React from "react";
import { Typography } from "@/app/components/typography/typography";

type Props = {
  data: any;
};

export const GoBeyond: React.FC<Props> = ({ data }) => {
  return (
    <section className="min-h-fit w-full bg-[#F4EBD0] px-8 py-16 sm:py-20 md:px-12 md:py-[100px]">
      <div className="mx-auto grid h-auto w-full max-w-[1650px] grid-cols-1 gap-8 lg:gap-16 lg:grid-cols-2">
        <div className="flex items-start justify-center">
          <img
            alt="Banner"
            src={data?.image?.url}
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Typography
            size="heading2"
            color="dark"
            font="cormorant"
            text={data?.title}
            className="leading-none font-medium"
          />
          <Typography size="20" className="whitespace-pre-wrap" color="dark" text={data?.description} />
        </div>
      </div>
    </section>
  );
};
