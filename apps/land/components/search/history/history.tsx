"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import qs from "qs";
import { getCookie, setCookie } from "cookies-next";

let timer = null as any;
const History = ({ keyword, searching }: { keyword: any; searching: any }) => {
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      onFetch();
    }, 300);
  }, [keyword]);

  const onFetch = async () => {
    if (keyword) {
      const locationquery = qs.stringify({
        "where[or][0][and][1][location.title]": {
          like: keyword,
        },
      });

      const titlequery = qs.stringify({
        "where[or][1][and][1][title]": {
          like: keyword,
        },
      });

      setLoader(true);

      const q = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects?limit=5&${locationquery}&${titlequery}`
      );
      const r = await q.json();

      setCount(r.totalDocs);
      setLoader(false);
      setResults(r.docs);
    }
  };

  if (!searching) return null;

  return (
    <div
      className="absolute left-0 top-[100%] mt-[17px] w-full bg-white"
      style={{ boxShadow: "0px 4px 40px 2px rgba(0, 0, 0, 0.10)" }}
    >
      {!keyword &&
        getCookie("_searches") &&
        JSON.parse(getCookie("_searches") as any).length > 0 && (
          <div className="bg-white pb-[33px] pl-[34px] pr-[50px] pt-[42px] md:!p-[20px]">
            <label className="mb-[17px] block font-[500]">
              Recent Searches
            </label>
            {getCookie("_searches") &&
              JSON.parse(getCookie("_searches") as any)
                .reverse()
                .slice(0, 5)
                .map((s: any) => {
                  const params = s?.label.split(" in ");
                  return (
                    <a
                      href={`/projects?propertyType=${params[0]}&location=${params[1]}`}
                      className="mb-[10px] flex items-center text-[16px] font-[500]"
                    >
                      <svg
                        width="28"
                        height="27"
                        viewBox="0 0 28 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-[14px]"
                      >
                        <path
                          d="M13.8731 14.2664L19.1229 18.2038C19.5096 18.4938 20.0578 18.4155 20.3478 18.0288C20.6379 17.642 20.5596 17.0939 20.1728 16.8038L15.3124 13.1246V5.68746C15.3124 5.20404 14.9209 4.8125 14.4375 4.8125C13.954 4.8125 13.5625 5.20404 13.5625 5.68746V13.5621C13.5625 13.8526 13.6841 14.1142 13.8731 14.2664Z"
                          fill="#9C9C9C"
                        />
                        <path
                          d="M14.8756 0C8.47134 0 3.0024 4.62241 1.93495 10.937L1.60247 10.4426C1.33167 10.0415 0.787442 9.93561 0.386273 10.2064C-0.0148964 10.4772 -0.120766 11.0214 0.150034 11.4226L1.89995 14.0475C2.04388 14.2662 2.27837 14.4093 2.53867 14.4368H2.62617C2.85803 14.436 3.07984 14.3432 3.24302 14.1787L5.43042 11.9913C5.77209 11.6497 5.77209 11.0949 5.43042 10.7533C5.08874 10.4116 4.53402 10.4116 4.19235 10.7533L3.64987 11.3001C4.65739 5.09927 10.5008 0.889834 16.7012 1.89735C22.9016 2.90487 27.1119 8.74785 26.1044 14.9487C25.2098 20.4548 20.4539 24.4997 14.8756 24.4989C11.3574 24.5627 8.02992 22.9029 5.96414 20.0541C5.68372 19.6603 5.1373 19.568 4.74357 19.8485C4.34984 20.1289 4.25753 20.6753 4.53796 21.069C6.9301 24.3816 10.7904 26.3157 14.8756 26.2488C22.1242 26.2488 28 20.373 28 13.1244C28 5.87579 22.1242 0 14.8756 0Z"
                          fill="#9C9C9C"
                        />
                      </svg>
                      <span>{s.label}</span>
                    </a>
                  );
                })}
          </div>
        )}
      {keyword && (
        <div className="bg-white pb-[33px] pl-[34px] pr-[50px] pt-[42px] md:!p-[20px]">
          <div className="mb-[25px] flex items-center justify-between">
            <label className="block font-[500]">Suggested Searches</label>
            <label className="block font-[500]">{count} results</label>
          </div>
          <div className="max-h-[250px] overflow-auto">
            {!loader &&
              count > 0 &&
              results.map((fp: any) => (
                <div key={`project_${fp.id}`} className="mb-[8px]">
                  <Link
                    href={`/projects/${fp.slug}`}
                    className="flex items-center text-left text-[18px] font-[500]"
                  >
                    <div
                      className="mr-[30px] h-[78px] w-[89px] bg-black/30 bg-cover bg-center"
                      style={{ backgroundImage: `url(${fp.headerImage?.url})` }}
                    ></div>
                    <div>
                      <h4 className="pb-[15px] text-[20px] font-[500] leading-none underline underline-offset-4">
                        {fp.title}
                      </h4>
                      <div className="flex items-center text-[20px] leading-none">
                        <svg
                          className="mr-[9px]"
                          width="12"
                          height="18"
                          viewBox="0 0 12 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 0C2.69166 0 0 2.69167 0 6.00001C0 6.99318 0.248308 7.9779 0.72035 8.85132L5.67189 17.8066C5.73781 17.926 5.86342 18 6 18C6.13658 18 6.26219 17.926 6.32811 17.8066L11.2815 8.84837C11.7517 7.9779 12 6.99314 12 5.99998C12 2.69167 9.30834 0 6 0ZM6 9C4.34583 9 3.00002 7.65418 3.00002 6.00001C3.00002 4.34584 4.34583 3.00002 6 3.00002C7.65417 3.00002 8.99998 4.34584 8.99998 6.00001C8.99998 7.65418 7.65417 9 6 9Z"
                            fill="#9F4C03"
                          />
                        </svg>
                        <span>{fp.location.title}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
          {!loader && count === 0 && <span>No suggestions found.</span>}
          {loader && (
            <div>
              <p>Loading Properties...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
