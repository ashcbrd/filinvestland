import React from "react";
import LinkedIn from "@/components/svg/LinkedIn";

const Content = () => {
  return (
    <section className="mt-16">
      <div className="divide-gainsboro mx-3 flex flex-col justify-center divide-y lg:mx-9 xl:mx-16 2xl:mx-44">
        <div className="flex items-start gap-16 pb-8">
          <div className="bg-dark-cornflower-blue flex flex-none items-center justify-center rounded-full px-8 py-8 shadow-2xl">
            <LinkedIn />
          </div>
          <div className="flex-1">
            <h3 className="text-jet text-4xl font-bold">Vision</h3>
            <p className="text-dim-gray mt-8">
              To be the most trusted placemaker of environs that inspire and
              enhance a happy life.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-16 py-12">
          <div className="bg-dark-cornflower-blue flex flex-none items-center justify-center rounded-full px-8 py-8 shadow-2xl">
            <LinkedIn />
          </div>
          <div className="flex-1">
            <h3 className="text-jet text-4xl font-bold">Mission</h3>
            <ul className="text-dim-gray mt-8 list-none">
              <li>To enliven and enrich lives in Filinvest communities</li>
              <li>To enable and encourage the growth of our partners</li>
              <li>To create and add value for our investors</li>
              <li>
                To build platforms that create vibrant and sustainable
                ecosystems
              </li>
              <li>
                To respect and protect the environment To keep affordable
                housing at our core
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-start gap-16 pb-24 pt-12">
          <div className="bg-dark-cornflower-blue flex flex-none items-center justify-center rounded-full px-8 py-8 shadow-2xl">
            <LinkedIn />
          </div>
          <div className="flex-1">
            <h3 className="text-jet text-4xl font-bold">Core Values</h3>
            <p className="text-dim-gray mt-8">
              The core values of integrity, customer service, professionalism,
              teamwork, innovation and cost-effectiveness are highly valued. The
              highest standards of business and moral ethics shall be exercised.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
