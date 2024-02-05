"use client";
import Fade from "@/components/animation/Fade";
import FadeDown from "@/components/animation/FadeDown";
import Image from "next/image";

const IconText = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "dreams-built-green-icon-text"
  );

  return (
    <div>
      <Fade>
        <div className="mx-12 mt-8 flex flex-col justify-center gap-16 md:mt-12 md:flex-row lg:mx-0">
          {data.iconText.map((item: any, index: number) => (
            <div className="flex flex-col items-center gap-9" key={index}>
              <div className="flex h-[246px] w-[246px] items-center justify-center rounded-full bg-white px-12 py-12 shadow-2xl">
                <Image
                  src={`${item.iconImage.url}`}
                  width={150}
                  height={150}
                  alt={`${item.iconImage.alt}`}
                />
              </div>
              <FadeDown>
                <h3 className="text-sea-green text-2xl font-bold">
                  {item.text}
                </h3>
              </FadeDown>
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
};

export default IconText;
