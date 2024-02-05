import React from "react";
import Image from "next/image";
import FadeDown from "@/components/animation/FadeDown";
import Fade from "@/components/animation/Fade";
import Link from "next/link";
export default function InvestorRelationsProgramBlock({ content }: any) {
  const block = content?.content?.find(
    (item: any) => item.blockType === "investor-relations-programs-programs"
  );
  const imageBlock = content?.content?.find(
    (item: any) => item.blockType === "investor-relations-programs-image"
  );
  return (
    <section className="">
      <div className="mx-9 mt-9 lg:mx-auto lg:max-w-[1024px] xl:max-w-[1200px]">
        <FadeDown>
          <p className="mt-8 px-6 text-dim-gray">{block?.description}</p>
        </FadeDown>
      </div>
      <div className="mx-3 mt-16 flex flex-col justify-center gap-12 px-6 lg:mx-auto lg:max-w-[1024px] xl:max-w-[1200px]">
        {block?.programs?.map((program: any) => (
          <Fade>
            <div className="flex flex-col items-center justify-center gap-8 xs:items-start md:flex-row">
              <div className="flex h-[82px] w-[82px] flex-none items-center justify-center rounded-full shadow-2xl">
                <Image
                  className="mx-auto h-full w-full"
                  src={program?.icon?.url}
                  width={82}
                  height={82}
                  alt={program?.icon?.alt}
                />
              </div>

              <div className="flex-1">
                <h3 className="text-4xl font-bold text-jet">
                  {program?.title}
                </h3>

                <p className="mt-5 text-dim-gray">{program?.description}</p>
              </div>
            </div>
          </Fade>
        ))}
        <div className="mt-4">
          <h1 className="mb-2 text-2xl">Melissa C. Ortiz</h1>
          <p className="text-gray-400">Head of Investor Relations</p>
          <p className="mt-8 text-lg">
            Email address:{" "}
            <a href="mailto:ir@filinvestland.com" style={{ color: "#2363ab" }}>
              ir@filinvestland.com
            </a>
          </p>
        </div>
      </div>
      <div className="w-full">
        <Image
          src={imageBlock?.image?.url}
          width={2018}
          height={1340}
          alt={imageBlock?.image?.alt}
        />
      </div>
    </section>
  );
}
