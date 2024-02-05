import React from "react";
import Image from "next/image";
import ArrowRight from "@/components/svg/ArrowRight";
import ArrowLeft from "@/components/svg/ArrowLeft";

const PageNextPrevButtonOld = ({
  imgName,
  pageName,
  isLeft = true,
}: {
  imgName: string;
  pageName: string;
  isLeft?: boolean;
}) => {
  return (
    <div
      className={`flex ${
        isLeft && "flex-row-reverse"
      } hover:bg-ghost-white items-center gap-6 hover:cursor-pointer`}
    >
      <div className="flex-none">
        <Image
          src={`/${imgName}`}
          width={64}
          height={54}
          alt="Picture of the author"
        />
      </div>
      <div>
        <p className="text-jet text-sm font-bold">
          {isLeft ? "Previous" : "Next"}
        </p>
        <h3 className="text-jet text-xl font-bold lg:text-2xl">{pageName}</h3>
      </div>
      {isLeft ? <ArrowLeft color="#000000" /> : <ArrowRight color="#000000" />}
    </div>
  );
};

export default PageNextPrevButtonOld;
