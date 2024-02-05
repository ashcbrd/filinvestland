import React from "react";
import Download from "@/components/svg/Download";
import Image from "next/image";
import Link from "next/link";
const Charters = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item?.blockType === "board-committees-charter"
  );
  return (
    <div className="flex flex-1 flex-col gap-[3rem]">
      {data.charter.map((item: any) => (
        <div className="mt-4 flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-jet">{item?.year}</h3>
          {item.charterItem.map((charterItem: any, index: number) => (
            <div
              className="hover:cursor-pointer hover:bg-ghost-white"
              key={index}
            >
              <div className="flex items-center gap-6">
                <div className="flex flex-1 items-center gap-6">
                  <div className="flex w-16 flex-none items-center justify-center rounded-full bg-dark-cornflower-blue px-6 py-6 shadow-2xl">
                    <Image
                      src={`${charterItem.icon.url}`}
                      width={1834}
                      height={1414}
                      alt={charterItem.icon.alt}
                    />
                  </div>
                  <Link
                    href={`${charterItem?.downloadLink?.url}`}
                    target="_blank"
                  >
                    <h4 className="flex-1 underline">{charterItem.title}</h4>
                  </Link>
                </div>
                <Link
                  href={`${charterItem?.downloadLink?.url}`}
                  target="_blank"
                >
                  <Download />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ))
      }
    </div >
  );
};

export default Charters;
