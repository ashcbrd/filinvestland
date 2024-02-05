import Fade from "@/components/animation/Fade";
import FadeDown from "@/components/animation/FadeDown";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { Award } from "shared-types";

const Content = ({ awards }: { awards: Award[] }) => {
  return (
    <section className="short:mt-32 relative z-10 mb-24 mt-12 gap-9 px-9 lg:mt-36 xl:px-16 2xl:mt-36 2xl:px-44">
      <div className="columns-1 gap-12 px-8 md:columns-2">
        {awards.map((award, index) => {
          return (
            <div className="mb-4 flex flex-col gap-6" key={index}>
              <Fade>
                <Image
                  src={award.coverImage.url ? award.coverImage.url : ""}
                  width={award.coverImage.width ? award.coverImage.width : 512}
                  height={
                    award.coverImage.height ? award.coverImage.height : 512
                  }
                  alt={award.coverImage.alt ? award.coverImage.alt : ""}
                />

                <h3 className="text-jet text-1xl font-bold italic">
                  {moment(award.createdAt).format("ll")}
                </h3>
              </Fade>
              <FadeDown>
                <h2 className="text-jet text-3xl font-bold">{award.title}</h2>
              </FadeDown>
              <p className="text-dim-gray">{award.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Content;
