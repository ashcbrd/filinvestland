"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type ItemProps = {
  title: string;
  link: string;
};

const Tabs = ({ items }: { items: ItemProps[] }) => {
  const pathname = usePathname();

  const checkPath = (link: string) => {
    if (pathname) {
      if (link === "#") {
        return true;
      } else if (link === pathname) {
        return true;
      } else if (pathname.includes(link)) {
        return true;
      } else if (link.includes(pathname)) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  };

  return (
    <div
      className={`grid-cols-${items?.length} mt-8 grid w-full gap-2 overflow-x-auto px-6 pb-3 md:mt-10 md:w-auto md:gap-5 lg:mx-9 lg:mt-12 lg:flex lg:gap-8 xl:mx-16 2xl:mx-44`}
    >
      {items?.map((item, index) => {
        return (
          <Link
            key={index}
            href={`${item.link}`}
            className={`${
              checkPath(item.link) ? "border-b-2 border-white" : ""
            } pb-2 text-center text-xs text-white hover:border-b-2 hover:border-white md:text-sm lg:text-xl`}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Tabs;
