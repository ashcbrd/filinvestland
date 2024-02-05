"use client";
import Link from "next/link";
import React from "react";

type ItemProps = {
  title: string;
  link?: string;
};

const Breadcrumbs = ({ items }: { items: ItemProps[] }) => {
  return (
    <div className="mx-5 text-[2vh] text-white">
      {items?.map((item, index) => {
        if (item.link) {
          return (
            <span key={index}>
              <Link href={`${item?.link}`} className="hover:underline">
                {item.title}
              </Link>{" "}
              {items.length > 1 && "/"}{" "}
            </span>
          );
        } else {
          return <span key={index}>{item.title}</span>;
        }
      })}
    </div>
  );
};

export default Breadcrumbs;
