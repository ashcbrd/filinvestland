import React from "react";
import Link from "next/link";
import BorderButton from "@/components/button/BorderButton";
export default function InvestorRelationHighlights({ content }: any) {
  return (
    <div className="h-[100%] flex-1 px-4 text-center md:px-0 md:text-left lg:w-1/4">
      <h4 className="text-dark-cornflower-blue text-lg font-black tracking-widest md:text-[2vh]">
        {content?.content[7].title}
      </h4>
      <h2 className="mt-2 text-3xl font-black tracking-tighter md:text-4xl lg:text-[6vh] lg:leading-[6vh]">
        {content?.content[7].subTitle}
      </h2>
      <h4 className="text-dim-gray mt-4 lg:mt-[3vh] lg:text-[2.2vh]">
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
  );
}
