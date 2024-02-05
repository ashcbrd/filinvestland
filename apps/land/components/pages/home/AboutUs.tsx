"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BorderButton from "../../button/BorderButton";
import useAnimation from "../../../hooks/useAnimation";
import FadeLeft from "@/components/animation/FadeLeft";
import FadeRight from "@/components/animation/FadeRight";

const AboutUs = ({ content }: any) => {
  const { container } = useAnimation("#anim");

  return (
    <section
      ref={container}
      className="justfify-center mx-6 flex flex-col items-end gap-12 pt-36 lg:mx-9 lg:flex-row lg:gap-24 xl:mx-16 xl:pt-44 2xl:mx-44"
    >
      <div className="flex-1">
        <FadeLeft>
          <Image
            src={`${!content?.content?.[5]?.coverImage?.url ? "/" : ""}${
              content?.content?.[5]?.coverImage?.url
            }`}
            width={1076}
            height={754}
            alt={content?.content?.[5]?.coverImage?.alt}
          />
        </FadeLeft>
      </div>
      <div className="flex-none px-4 text-center md:px-0 md:text-left lg:w-1/2">
        <FadeRight>
          <h4 className="text-dark-cornflower-blue text-lg font-black tracking-widest md:text-[2vh]">
            {content?.content?.[5]?.title}
          </h4>
          <h2 className="text-jet mt-2 break-normal px-4 text-3xl font-black tracking-tight md:px-0 md:text-4xl lg:mt-[2vh] lg:w-[20vw] lg:text-[6vh] lg:leading-[6vh]">
            {content?.content?.[5]?.subTitle}
          </h2>
          <h4 className="text-dim-gray mt-4 lg:mt-[3vh] lg:text-[2.2vh]">
            {content?.content?.[5]?.description}
          </h4>
          <button type="button" className="mt-14">
            <Link href={`${content?.content?.[5]?.learnMoreLink}`}>
              <BorderButton
                buttonText="Learn More"
                textColor="dark-cornflower-blue"
                borderColor="dark-cornflower-blue"
              />
            </Link>
          </button>
        </FadeRight>
      </div>
    </section>
  );
};

export default AboutUs;
