"use client";
import BorderButton from "@/components/button/BorderButton";
import Image from "next/image";
import React, { useState } from "react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Fade from "@/components/animation/Fade";
import FadeDown from "@/components/animation/FadeDown";
import combineTextWithoutCodeTrue from "@/helpers/extractTextOnly";

const NewsTileList = ({
  news,
  position = "grid",
  className,
  expandHeight = false,
  category,
}: {
  news: any;
  position?: string;
  className?: string;
  expandHeight?: boolean;
  category: string;
}) => {
  const router = useRouter();

  const formatURL = (url: string) => {
    if (url === "blogs")
      return url.substring(0, url.length - 1);
    return url;
  };

  return (
    <>
      {news && news.length > 0 ? (
        <div
          className={`grid ${
            position === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          } mt-12 gap-x-9 gap-y-20 ${className}`}
        >
          {news?.map((item: any, index: number) => {
            const extractedDescription = combineTextWithoutCodeTrue(
              item?.content
            );
            return (
              <motion.span
                layout
                transition={{
                  duration: 0.1,

                  type: "tween",
                }}
                onClick={() =>
                  router.push(`/${formatURL(category)}/${item?.slug}`)
                }
                className="group cursor-pointer"
                key={index}
              >
                <div className="h-[20rem] bg-ghost-white">
                  <Image
                    src={`${item?.coverImage?.url || "/filinvest-cover.png"}`}
                    width={1364}
                    height={663}
                    alt={item?.coverImage?.alt || ""}
                    className="h-[20rem] object-cover transition delay-150 group-hover:opacity-70"
                  />
                </div>
                <div className="mt-4 flex h-[200px] flex-col">
                  <div className="flex-1">
                    <Fade>
                      <h3 className="line-clamp-2 h-[4rem] text-2xl font-bold text-jet group-hover:text-dark-cornflower-blue">
                        {item?.title}
                      </h3>
                    </Fade>
                    <FadeDown>
                      <p className="text-sm text-dim-gray opacity-80">
                        Posted on {moment(item?.publishedDate).format("ll")}
                      </p>
                    </FadeDown>
                    <FadeDown>
                      <p className="mt-4 truncate text-base text-dim-gray">
                        {extractedDescription}
                      </p>
                    </FadeDown>
                  </div>
                  <div className="mt-8">
                    <Link href={`/${formatURL(category)}/${item?.slug}`}>
                      <BorderButton
                        buttonText="Read More"
                        textColor="dark-cornflower-blue"
                        borderColor="dark-cornflower-blue"
                      />
                    </Link>
                  </div>
                </div>
              </motion.span>
            );
          })}
        </div>
      ) : (
        <h3
          className={`text-xl italic text-silver-chalice ${
            expandHeight && "min-h-[600px]"
          }`}
        >
          No result
        </h3>
      )}
    </>
  );
};

export default NewsTileList;
