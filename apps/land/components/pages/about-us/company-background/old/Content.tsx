import Image from "next/image";
import React from "react";

const Content = () => {
  return (
    <section className="mt-16">
      <div className="flex flex-col justify-center gap-16">
        <div className="mx-3 flex items-center lg:mx-9 xl:mx-16 2xl:mx-80">
          <Image
            src="/charts-company-background.png"
            width={2496}
            height={952}
            alt="Picture of the author"
          />
        </div>
        <div className="mx-3 flex items-center lg:mx-9 xl:mx-16 2xl:mx-44">
          <Image
            src="/slider-company-background.png"
            width={1819}
            height={1383}
            alt="Picture of the author"
          />
        </div>
        <div className="mx-3 mb-28 mt-16 lg:mx-9 xl:mx-16 2xl:mx-80">
          <p className="text-dim-gray">{`With over 50 years of experience, Filinvest Land, Inc. (FLI) is one of the leading full-range property developers in the Philippines with a diverse project portfolio spanning the archipelago. The company has developed over 3,000 hectares of land into homes for over 160,000 families.`}</p>
          <p className="text-dim-gray mt-5">{`From residential communities, FLI has diversified into building townships, mid-rise and high-rise condominiums, BPO hubs, office buildings, shopping centers and leisure developments. With over 250 ongoing developments in 50 key areas across the country, FLI continues to expand and innovate, propelled by its commitment to build the Filipino dream.`}</p>
        </div>
      </div>
    </section>
  );
};

export default Content;
