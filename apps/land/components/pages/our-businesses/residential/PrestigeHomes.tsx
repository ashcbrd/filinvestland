"use client";
import React from "react";
import Image from "next/image";
import BorderButton from "@/components/button/BorderButton";
import FullPropertySlider from "@/components/Slider/FullPropertySlider";
import Link from "next/link";
import Fade from "@/components/animation/Fade";
import FadeDown from "@/components/animation/FadeDown";

const PrestigeHomes = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "residential-prestige"
  );
  const sliderPrestige = content?.content?.find(
    (item: any) =>
      item.blockType === "residential-slider" &&
      item.id === "63fe028370c5bf66a883e7dc"
  );

  return (
    <>
      <div className="mx-9 mt-9 xl:mx-16 2xl:mx-44">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={`${data.prestigeImage.url}`}
            width={314}
            height={157}
            alt={data.prestigeImage.alt}
          />
          <Fade>
            <h3 className="text-center text-2xl font-bold text-jet">
              {data.title}
            </h3>
          </Fade>
          <FadeDown>
            <p className="text-center text-dim-gray">{data.description}</p>
          </FadeDown>
          <div className="mt-9">
            <Link href={`${data.readMoreLink}`}>
              <BorderButton
                buttonText="Read More"
                textColor="dark-cornflower-blue"
                borderColor="dark-cornflower-blue"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-22 relative">
        <FullPropertySlider
          sliders={sliderPrestige.imageSlides}
          withThumbnail={true}
          isDefault={false}
        />
      </div>
      <div className="mx-9 mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:mx-16 2xl:mx-44">
        {data.prestigeHomes.map((item: any, index: number) => (
          <div
            className="flex flex-col justify-between bg-white shadow-xl"
            key={index}
          >
            <div>
              <Image
                src={`${item.homeImage.url}`}
                width={916}
                height={712}
                alt={item.homeImage.alt}
                className="hover:cursor-pointer hover:opacity-75"
              />
              <div className="p-6">
                <Fade>
                  <h3 className="text-2xl font-bold text-jet">
                    {item.homeName}
                  </h3>
                </Fade>
                <FadeDown>
                  <p className="mt-3 text-dim-gray">{item.homeDescription}</p>
                </FadeDown>
              </div>
            </div>
            <Link href={item.learnMoreLink} className="p-6 pb-10">
              <BorderButton
                buttonText="Learn More"
                textColor="dark-cornflower-blue"
                borderColor="dark-cornflower-blue"
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PrestigeHomes;
