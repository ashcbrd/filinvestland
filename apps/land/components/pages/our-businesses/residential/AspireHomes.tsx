"use client";
import React from "react";
import Image from "next/image";
import BorderButton from "@/components/button/BorderButton";
import FullPropertySlider from "@/components/Slider/FullPropertySlider";
import Link from "next/link";
import FadeDown from "@/components/animation/FadeDown";
import Fade from "@/components/animation/Fade";

const AspireHomes = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "residential-aspire"
  );
  const sliderAspire = content?.content?.find(
    (item: any) =>
      item.blockType === "residential-slider" &&
      item.id === "63fe045b70c5bf66a883e7df"
  );

  return (
    <>
      <div className="mx-9 mt-16 xl:mx-16 2xl:mx-44">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={`${data.aspireImage.url}`}
            width={314}
            height={157}
            alt={data.aspireImage.alt}
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
          sliders={sliderAspire.imageSlides}
          withThumbnail={true}
          isDefault={false}
        />
      </div>
      <div className="mx-9 mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:mx-16 2xl:mx-44">
        {data.aspireHomes.map((item: any, index: number) => (
          <Link
            href={`${item.learnMoreLink}`}
            className="cursor-pointer hover:opacity-75"
          >
            <div
              className="flex h-full flex-col justify-between bg-white shadow-xl"
              key={index}
            >
              <div>
                <Image
                  src={`${item.homeImage.url}`}
                  width={916}
                  height={712}
                  alt={item.homeImage.alt}
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
              <div className="p-6 pb-10">
                <BorderButton
                  buttonText="Learn More"
                  textColor="dark-cornflower-blue"
                  borderColor="dark-cornflower-blue"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AspireHomes;
