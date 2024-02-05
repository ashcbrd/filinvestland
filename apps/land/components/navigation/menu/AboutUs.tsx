"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Award } from "shared-types";
import { Project } from "shared-types";
import { News } from "shared-types";
// import { ABOUT_US_SUB_ROUTES } from "@/helpers/routes/aboutUs";

type Features =
  | {
      value: News;
      relationTo: "news";
    }
  | {
      value: Project;
      relationTo: "projects";
    }
  | {
      value: Award;
      relationTo: "awards";
    };

type T_AboutUsMenu = {
  title: string;
  subTitle?: string;
  link: string;
  newTab: boolean;
  featured?: Features;
};
const AboutUs = ({
  aboutUsMenu,
  firstAwards,
  secondAwards,
}: {
  aboutUsMenu?: T_AboutUsMenu[];
  firstAwards: any;
  secondAwards: any;
}) => {
  const [currentFeature, setCurrentFeature] = useState<undefined | Features>(
    undefined
  );

  const onMouseEnter = (index: number) => {
    if (aboutUsMenu?.[index]?.featured) {
      setCurrentFeature(aboutUsMenu[index].featured);
    } else setCurrentFeature(undefined);
  };

  useEffect(()=>{
    
    if(!currentFeature){
      setCurrentFeature(aboutUsMenu?.[0]?.featured)
    }
  },[aboutUsMenu])

  return (
    <div className="divide-sonic-silver flex divide-x py-8">
      <div className="max-h-[700px] flex-none overflow-hidden pr-24 hover:overflow-auto">
        {aboutUsMenu &&
          aboutUsMenu.map((routes: T_AboutUsMenu, index: number) => {
            return (
              <div key={index} className={`${index > 0 && "mt-9"}`}>
                <Link
                  href={`${routes.link}`}
                  target={routes.newTab ? "_blank" : "_self"}
                  className="text-white transition delay-150 hover:opacity-70"
                  onMouseEnter={() => onMouseEnter(index)}
                >
                  <h3 className="text-xl text-white">{routes.title}</h3>
                  <h4 className="text-white opacity-50">{routes.subTitle}</h4>
                </Link>
              </div>
            );
          })}
      </div>
      <div className="grid max-h-[700px] grid-cols-2 gap-6 overflow-hidden px-24 hover:overflow-auto">

          <div className="flex-1">
            <h3 className="text-xl text-white">Our Business Units</h3>
            <Link
              href={
                currentFeature?.relationTo == "awards"
                  ? `/awards`
                  : `/${
                      currentFeature?.relationTo == "news"
                        ? "article"
                        : "project"
                    }/${currentFeature?.value?.slug}`
              }
              className="cursor-pointer transition delay-150 hover:opacity-70"
            >
              <h2 className="mt-4 text-4xl text-white">
                {currentFeature?.value?.title}
              </h2>
              <p className="mt-6 text-white opacity-50">
                {currentFeature?.relationTo === "awards"
                  ? currentFeature?.value?.description
                  : currentFeature?.value?.shortDescription}
              </p>
              <div className="mt-9">
                <Image
                  src={`${
                    currentFeature?.value?.coverImage?.url ||
                    "/filinvest-cover.png"
                  }`}
                  width={350}
                  height={currentFeature?.value?.coverImage?.height || 350}
                  alt="property"
                />
              </div>
            </Link>
          </div>
    
      </div>
    </div>
  );
};

export default AboutUs;
