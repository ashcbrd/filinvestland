"use client";

import React, { useState, useEffect, memo } from "react";
import Request from "@/config/API";
import qs from "qs";
import _ from "lodash";
import { getters, setters } from "@/context/News";
import { useRouter } from "next/navigation";

const NewsFilter = ({ type }: { type: any }) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const q = params.get("keyword");

  const get = getters();
  const set = setters();
  const router = useRouter();

  const titleQuery = qs.stringify({
    where: {
      title: {
        like: get.keyword,
      },
      newsTypeTag: {
        equals:
          type === "news"
            ? "63d743dbb7b2cb2bb619fbd4"
            : "63d743d4b7b2cb2bb619fbca",
      },
    },
  });

  useEffect(() => {
    set.setKeyword(q);
  }, [q]);

  const onSetKeyword = (e: any) => {
    set.setKeyword(e.target.value);
  };

  const onSearch = (e: any) => {
    e.preventDefault();

    Request()
      .get(
        `${process.env.CMS_URL}/api/aspire-news?limit=4&sort=-Date&${titleQuery}`
      )
      .then((res) => {
        set.setNews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="property-filter" className="relative z-[2] pb-[33px]">
      <div
        className="bg-white"
        style={{ boxShadow: "0px 4px 40px 2px rgba(0, 0, 0, 0.10)" }}
      >
        <div className="flex justify-between">
          <form onSubmit={onSearch} className="flex w-full justify-between">
            <div className="flex w-full items-end pb-[26px] pl-[34px] pr-[28px]">
              <div className="w-full">
                <input
                  onChange={onSetKeyword}
                  type="text"
                  placeholder="Search..."
                  className="w-full"
                  value={get.keyword}
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex h-[107px] w-full max-w-[246px] flex-shrink-0 items-center justify-center bg-aqua-blue text-white sm:!max-w-[75px] md:h-[75px] md:max-w-[150px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="mr-[20px] md:mr-[0px]"
              >
                <path
                  d="M2.40472 2.399C5.78895 -0.864371 10.8254 -0.734301 13.9576 2.399C16.9528 5.39522 17.1359 10.1393 14.5069 13.3492L19.1564 18.0007L18.0011 19.1564L13.3512 14.5053C10.1423 17.1352 5.39992 16.952 2.40472 13.9558C-0.727511 10.8225 -0.874791 5.5614 2.40472 2.399ZM12.8023 3.55468C10.2501 1.00162 6.1122 1.00162 3.56001 3.55468C1.00782 6.10774 1.00782 10.2471 3.56001 12.8001C6.1122 15.3532 10.2501 15.3532 12.8023 12.8001C15.3545 10.2471 15.3545 6.10774 12.8023 3.55468Z"
                  fill="white"
                />
              </svg>
              <span className="text-[18px] font-[500] leading-none md:hidden">
                Search
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsFilter;
