"use client";
import BorderButton from "@/components/button/BorderButton";
/* import SelectCategory from "@/components/select/SelectCategory"; */
import Grid from "@/components/svg/Grid";
import List from "@/components/svg/List";
import Image from "next/image";
import React, { useState } from "react";
import moment from "moment";
import Link from "next/link";

const Content = ({ news }: any) => {
  const newsArr = news && news.docs ? news.docs : null;
  const [position, setPosition] = useState<"list" | "grid">("grid");
  return (
    <section className="my-24 gap-9 lg:mx-9 xl:mx-16 2xl:mx-44">
      <div className="flex items-center justify-end gap-7">
        <List
          color={position === "list" ? "#0550E3" : "#303030"}
          className="hover:cursor-pointer focus:cursor-pointer"
          onClick={() => setPosition("list")}
        />
        <Grid
          color={position === "grid" ? "#0550E3" : "#303030"}
          className="hover:cursor-pointer focus:cursor-pointer"
          onClick={() => setPosition("grid")}
        />
        {/* <SelectCategory /> */}
      </div>
      <div
        className={`grid ${
          position === "grid" ? "grid-cols-3" : "grid-cols-1"
        } mt-12 gap-x-9 gap-y-20`}
      >
        {newsArr.map((singleNews: any) => {
          return (
            <div
              key={singleNews.id}
              className={`flex ${
                position === "grid"
                  ? "flex-col gap-4"
                  : "flex-row items-center gap-16"
              }`}
            >
              <div>
                <Image
                  src={`${singleNews.coverImage.url}`}
                  width={518}
                  height={403}
                  alt="Picture of the author"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-jet text-2xl font-bold">
                  {singleNews.title}
                </h3>
                <p className="text-dim-gray text-sm">
                  Created on {moment(singleNews.createdAt).format("ll")}
                </p>
                <p className="text-dim-gray truncate">
                  {singleNews.location} {singleNews.size}
                </p>
                <div className="mt-4">
                  <Link href={`/projects/${singleNews.id}`}>
                    <BorderButton
                      buttonText="Learn More"
                      textColor="dark-cornflower-blue"
                      borderColor="dark-cornflower-blue"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Content;
