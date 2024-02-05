"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import FadeDown from "@/components/animation/FadeDown";
import Fade from "@/components/animation/Fade";

const OfficeParks = ({ content }: any) => {
  return (
    <>
      <div>
        <Fade>
          <h2 className="text-center text-4xl font-bold text-jet">
            {content?.title}
          </h2>
        </Fade>
        <FadeDown>
          <p className="mt-4 text-dim-gray">{content?.description}</p>
        </FadeDown>
      </div>
      <div className="mt-10 flex flex-col gap-9 md:flex-row">
        {content?.officeParks?.map((item: any, index: number) => (
          <Link
            className="flex-1 hover:opacity-80"
            key={index}
            href={`${item.link}`}
          >
            <div>
              <Image
                src={`${item?.image?.url}`}
                width={1574}
                height={882}
                alt={item?.image?.alt}
                className="h-full w-full"
              />
            </div>
            <Fade>
              <h3 className="mt-6 text-2xl font-bold text-jet">
                {item?.title}
              </h3>
            </Fade>
            <FadeDown>
              <p className="mt-3 text-dim-gray">{item?.description}</p>
            </FadeDown>
          </Link>
        ))}
      </div>
    </>
  );
};

export default OfficeParks;
