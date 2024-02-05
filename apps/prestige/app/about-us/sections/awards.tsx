"use client";

import React from "react";
import Card from "@/app/components/cards/card";
import { Typography } from "@/app/components/typography/typography";

type Props = {
  data: any;
};

export const ProjectAwards: React.FC<Props> = ({ data }) => {
  return (
    <section className="min-h-fit w-full bg-[#FFFBF0] px-8 py-16 sm:py-20 md:px-12 md:py-[100px]">
      <div className="mx-auto grid h-auto w-full max-w-[1650px] space-y-4 text-center">
        <Typography
          size="heading2"
          color="dark"
          font="cormorant"
          text={data.title}
          className="leading-none font-medium"
        />
        <div className="w-full max-w-lg mx-auto">
          <Typography size="20" color="dark" text={data.awardDescription} />
        </div>
        <div className="!mt-16 grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,_minmax(390px,_1fr))] gap-4 sm:gap-8">
          {data.Content.map((item: any) => (
            <div className="">
              <Card key={item.id} style="w-full max-w-[450px] mx-auto">
                <div className="flex justify-center">
                  <img src={item?.Image?.url} alt="" className="h-40 w-40" />
                </div>
                <div className="p-4">
                  <Typography
                    size="40"
                    color="dark"
                    font="cormorant"
                    text={item.title}
                    className="font-medium"
                  />
                  <Typography
                    size="26"
                    color="dark"
                    font="cormorant"
                    text={item.subTitle}
                    className="font-medium"
                  />
                  <Typography
                    size="20"
                    color="dark"
                    text={item.description}
                    className="mt-4 whitespace-pre-wrap"
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
