"use client";

import React from "react";
import { Typography } from "../typography/typography";

type Props = {
  data?: any;
};

export const NewsCard: React.FC<Props> = ({ data }) => {

  // console.log(data)
  const imgSrc = data?.PropertyImages?.map((item: any) => item.image.url);
  return (
    <div className="relative w-[385px] bg-white before:absolute before:bottom-0 before:z-[1] before:h-full before:w-full before:bg-gradient-to-b before:from-transparent before:to-black/70">
      {data?.headerImage && <img
        src={data?.headerImage?.url}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />}
      <div className="relative z-[1] min-h-[417px] p-6 flex flex-col justify-end">
        <div className="h-auto w-full space-y-2">
          <Typography
            size="40"
            color="light"
            font="cormorant"
            text={data.title}
            className="font-medium"
            slugs={`/project/${data?.slug}`}
          />
          <Typography
            size="16"
            color="white"
            font="sans"
            text={data?.cardDescription}
            className="w-full leading-snug  line-clamp-[3]"
          />
        </div>
      </div>
    </div>
  );
};
