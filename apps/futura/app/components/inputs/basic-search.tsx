"use client";
import React from "react";
import { motion } from "framer-motion";
import { getters, setters } from "@/app/context/News";
import Request from "@/config/Request";
import qs from "qs";

function BasicSearch({ isfor }: { isfor?: string }) {
  const set = setters();
  const get = getters();

  const handleOnNews = () => {
    const query = qs.stringify({
      where: {
        _status: { equals: "published" },
        "newsTypeTag.title": { equals: isfor },
        ...(get.keyword ? { title: { like: get.keyword } } : {}),
      },
    });

    Request()
      .get(`/futura-news?sort=-Date&${query}`)
      .then((res) => {
        set.setNews(res.data);
      });
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex justify-center items-center w-full max-w-[993px] mx-auto rounded-[20px] overflow-hidden"
      style={{ boxShadow: "0px 4px 40px 2px rgba(0, 0, 0, 0.10)" }}
    >
      <div className="w-full h-max md:h-[92px] bg-white shadow-xl shadow-gray-200/50 flex flex-col md:flex-row p-6 md:p-0">
        <div className="flex items-center w-full pl-[39px] pr-[41px] pt-[7px] max-md:!px-0 max-md:!mb-[20px] max-md:pb-[10px]">
          <input
            type="text"
            className="font-[600] block w-full text-[18px] pb-[20px] leading-none border-b text-[#1C1C1C] outline-none placeholder-[#1C1C1C] font-quicksand"
            placeholder="Search..."
            value={get.keyword}
            onChange={(e) => set.setKeyword(e.target.value)}
          />
        </div>

        <button
          onClick={handleOnNews}
          className="bg-[#E12827] hover:bg-red-400 transition-all px-12 text-[18px] md:w-max text-white flex items-center justify-center rounded-full md:rounded-none w-full md:rounded-r-[20px] max-md:h-[50px]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.40472 2.399C5.78895 -0.864371 10.8254 -0.734301 13.9576 2.399C16.9528 5.39522 17.1359 10.1393 14.5069 13.3492L19.1564 18.0007L18.0011 19.1564L13.3512 14.5053C10.1423 17.1352 5.39992 16.952 2.40472 13.9558C-0.727511 10.8225 -0.874791 5.5614 2.40472 2.399ZM12.8023 3.55468C10.2501 1.00162 6.1122 1.00162 3.56001 3.55468C1.00782 6.10774 1.00782 10.2471 3.56001 12.8001C6.1122 15.3532 10.2501 15.3532 12.8023 12.8001C15.3545 10.2471 15.3545 6.10774 12.8023 3.55468Z"
              fill="#fff"
            />
          </svg>
          <span className="text-[18px] font-quicksand ml-[16px] font-[600]">
            Search
          </span>
        </button>
      </div>
    </motion.div>
  );
}

export default BasicSearch;
