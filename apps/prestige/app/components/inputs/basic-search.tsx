"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

function BasicSearch({ isBlog = false }: { isBlog?: boolean }) {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams?.get("keyword") || "");

  const handleOnNews = () => {
    const path = isBlog ? "/blogs" : "/news";
    if (keyword.length > 0) {
      window.location.href = `${path}?keyword=${keyword}`;
    } else {
      window.location.href = `${path}`;
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full grid-cols-1 gap-4 bg-white shadow-2xl">
        <div className="flex flex-grow items-center pl-[55px] pr-[51px]">
          <input
            type="text"
            className="block w-full border-b border-b-[#D2D2D2] pb-[27px] text-[20px] leading-[20px] text-[#000] placeholder-black outline-none"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <button
          onClick={handleOnNews}
          className="flex h-[137px] w-[246px] items-center justify-center bg-[#311700] text-[15px] text-white"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.40472 2.399C5.78895 -0.864371 10.8254 -0.734301 13.9576 2.399C16.9528 5.39522 17.1359 10.1393 14.5069 13.3492L19.1564 18.0007L18.0011 19.1564L13.3512 14.5053C10.1423 17.1352 5.39992 16.952 2.40472 13.9558C-0.727511 10.8225 -0.874791 5.5614 2.40472 2.399ZM12.8023 3.55468C10.2501 1.00162 6.1122 1.00162 3.56001 3.55468C1.00782 6.10774 1.00782 10.2471 3.56001 12.8001C6.1122 15.3532 10.2501 15.3532 12.8023 12.8001C15.3545 10.2471 15.3545 6.10774 12.8023 3.55468Z"
              fill="#DB8539"
            />
          </svg>
          <span className="ml-2">Search</span>
        </button>
      </div>
    </div>
  );
}

export default BasicSearch;
