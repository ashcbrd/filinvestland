import React from "react";
import Link from "next/link";
import BorderButton from "@/components/button/BorderButton";
import Image from "next/image";
import ChevronCircleLeft from "@/components/svg/ChevronCircleLeft";
import ChevronCircleRight from "@/components/svg/ChevronCircleRight";

export default function InvestorRelationsOld({ content }: any) {
  return (
    <section className="flex flex-col items-center">
      <div className="mx-6 flex flex-col gap-16 pt-36 lg:mx-9 lg:flex-row xl:mx-16 xl:pt-44 2xl:mx-44">
        <div className="flex-1 px-4 text-center md:px-0 md:text-left  lg:w-1/4">
          <h4 className="text-dark-cornflower-blue text-lg font-black tracking-widest md:text-[2vh]">
            {content?.content[7].title}
          </h4>
          <h2 className="text-jet mt-2 text-4xl font-black tracking-tighter lg:mt-[2vh] lg:text-[6vh]">
            {content?.content[7].subTitle}
          </h2>
          <h4 className="text-dim-gray mt-4 text-2xl lg:mt-[3vh] lg:text-[2.2vh]">
            {content?.content[7].description}
          </h4>
          <button type="button" className="mt-16">
            <Link href={`${content?.content[7].learnMoreLink}`}>
              <BorderButton
                buttonText="Learn More"
                textColor="dark-cornflower-blue"
                borderColor="dark-cornflower-blue"
              />
            </Link>
          </button>
        </div>
        <div className="flex flex-col gap-12 xl:gap-20">
          <div className="flex flex-1 flex-col gap-9 xl:flex-row">
            <div className="flex items-center gap-6 md:min-w-[450px] md:gap-9">
              <div className="flex-none">
                <Image
                  src="/pie-chart.png"
                  width={90}
                  height={90}
                  alt="Picture of the author"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h2 className="text-2xl font-bold">
                  Net income attributable to
                  <br />
                  equity holders of parent
                </h2>
                <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-center">
                  <h3 className="text-dark-cornflower-blue text-2xl font-bold">
                    P 3.80 B
                  </h3>
                  <p className="text-dark-cornflower-blue text-normal">
                    Year 2021
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 md:min-w-[450px] md:gap-9">
              <div className="flex-none">
                <Image
                  src="/pie-chart.png"
                  width={90}
                  height={90}
                  alt="Picture of the author"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h2 className="text-2xl font-bold">Revenue</h2>
                <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-center">
                  <h3 className="text-dark-cornflower-blue text-2xl font-bold">
                    P 17.74B B
                  </h3>
                  <p className="text-dark-cornflower-blue text-normal">
                    Year 2021
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-9 xl:flex-row">
            <div className="flex items-center gap-6 md:min-w-[450px] md:gap-9">
              <div className="flex-none">
                <Image
                  src="/pie-chart.png"
                  width={90}
                  height={90}
                  alt="Picture of the author"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h2 className="text-2xl font-bold">Total Assets</h2>
                <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-center">
                  <h3 className="text-dark-cornflower-blue text-2xl font-bold">
                    P 193.22 B B
                  </h3>
                  <p className="text-dark-cornflower-blue text-normal">
                    Year 2021
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 md:min-w-[450px] md:gap-9">
              <div className="flex-none">
                <Image
                  src="/pie-chart.png"
                  width={90}
                  height={90}
                  alt="Picture of the author"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h2 className="text-2xl font-bold">Earnings per share</h2>
                <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-center">
                  <h3 className="text-dark-cornflower-blue text-2xl font-bold">
                    P 0.16 B
                  </h3>
                </div>
              </div>
            </div>
          </div>
          {/*  <div className="mt-16 ml-16 flex gap-6">
          <ChevronCircleLeft />
          <ChevronCircleRight />
        </div> */}
        </div>
      </div>
      <div className="mt-16 hidden gap-6 lg:flex">
        <ChevronCircleLeft />
        <ChevronCircleRight />
      </div>
    </section>
  );
}
