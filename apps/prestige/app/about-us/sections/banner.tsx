"use client";

import Banner from "@/app/components/carousel/banner";
import React from "react";

type Props = {
  data: any;
};

export const HeroBanner: React.FC<Props> = ({ data }) => {
  return (
    <Banner
      title={""}
      imageUrl={data?.url}
      opacity="bg-[#130A01]/80"
    />
  );
};
