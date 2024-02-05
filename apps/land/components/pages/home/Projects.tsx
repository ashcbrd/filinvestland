"use client";
import FullPropertySlider from "@/components/Slider/FullPropertySlider";
import React from "react";
import useAnimation from "../../../hooks/useAnimation";
const Projects = ({ content }: any) => {
  const { container } = useAnimation("#anim-text");
  return (
    <section ref={container} className={`pt-20`}>
      <h4
        id="anim-text"
        className="text-dark-cornflower-blue mx-6 text-center text-lg font-black tracking-widest md:mx-0 md:text-[2vh]"
      >
        {content?.content[1].title}
      </h4>
      <h2
        id="anim-text"
        className="mx-6 mt-2 text-center text-3xl font-black tracking-tighter md:mx-0 md:text-4xl lg:mt-[2vh] lg:text-[6vh] lg:leading-[6vh]"
      >
        {content?.content[1].subTitle}
      </h2>
      <h4
        id="anim-text"
        className="text-dim-gray mx-6 -mb-16 mt-4 text-center md:mx-0 md:mb-0 lg:mt-[3vh] lg:text-[2.2vh]"
      >
        {content?.content[1].description}
      </h4>
      <FullPropertySlider
        sliders={content?.content[1].imageSlides}
        isDefault={false}
        with360={true}
      />
    </section>
  );
};

export default Projects;
