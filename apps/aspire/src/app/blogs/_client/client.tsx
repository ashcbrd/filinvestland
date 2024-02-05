"use client";

import React, { useState } from "react";
import Section from "@/components/Section/Section";
import moment from "moment-timezone";
import NewsFilter from "@/components/News/Filter/Filter";
import Link from "next/link";
import Banner from "@/components/News/Banner/Banner";
import { getters, setters } from "@/context/News";
import { getCookie, setCookie } from "cookies-next";
import Button from "@/components/Button/Button";
import qs from "qs";
import Request from "@/config/API";
import { Typography } from "@mui/material";

const News = ({ featured, typeID }: { featured?: any; typeID?: any }) => {
  const get = getters();
  const set = setters();
  const news = get.news;
  const [page, setPage] = useState(1);
  const [view, setView] = useState(getCookie("nview") ? getCookie("nview") : "grid");

  const onSetView = (v: any) => {
    setCookie("nview", v);
    setView(v);
  };

  const onMore = () => {
    const titleQuery = qs.stringify({
      where: {
        title: { like: get.keyword },
        newsTypeTag: { equals: typeID },
      },
    });

    Request()
      .get(`${process.env.CMS_URL}/api/aspire-news?limit=4&sort=-Date&page=${page + 1}&${titleQuery}`)
      .then((response: any) => {
        setPage(page + 1);

        set.setNews((ps: any) => ({
          ...ps,
          docs: [...ps.docs, ...response.data.docs],
          hasNextPage: response.data.hasNextPage,
        }));
      });
  };
  return (
    <div>
      <Banner featured={featured.FeaturedBlogs} title="Blogs" />
      <Section className="bg-candy-blue pb-[172px] pt-[53px] tablet:pb-[60px] tablet:pt-[60px]">
        <NewsFilter type="blogs" />
        <p className="pb-0 pt-[20px] sm:pb-[25px] sm:pt-[10px]">
          Showing {news.docs.length} of {news!.totalDocs} Blogs
        </p>

        <div className="flex items-center justify-end pb-[51px] tablet:pb-[30px]">
          <button className="mr-[14px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="21" viewBox="0 0 23 21" fill="none" onClick={() => onSetView("grid")}>
              <path
                className={`${view === "grid" ? "fill-aqua-blue" : "fill-[#D7D7D7]"}`}
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.670713 0.077259C0.380695 0.193677 0.0781465 0.529515 0.0258612 0.793133C0.00274328 0.909683 -0.00661917 2.75653 0.00497579 4.89724C0.0257171 8.7105 0.0291736 8.79324 0.174651 8.97116C0.256319 9.071 0.4126 9.21373 0.521995 9.28832C0.717885 9.4219 0.788679 9.42394 5.17546 9.42394C9.56224 9.42394 9.63304 9.4219 9.82893 9.28832C9.93832 9.21373 10.0946 9.071 10.1763 8.97109C10.3225 8.79219 10.3248 8.72754 10.3248 4.72117C10.3248 0.714798 10.3225 0.650143 10.1763 0.47124C10.0946 0.371331 9.93832 0.228603 9.829 0.154016C9.63383 0.0208915 9.5487 0.0181293 5.26023 0.003725C1.73731 -0.00811415 0.847806 0.00615835 0.670713 0.077259ZM13.3459 0.077259C13.0559 0.193677 12.7534 0.529515 12.7011 0.793133C12.678 0.909683 12.6686 2.75653 12.6802 4.89724C12.7009 8.7105 12.7044 8.79324 12.8499 8.97116C12.9315 9.071 13.0878 9.21373 13.1972 9.28832C13.3931 9.4219 13.4639 9.42394 17.8507 9.42394C22.2375 9.42394 22.3083 9.4219 22.5042 9.28832C22.6135 9.21373 22.7698 9.071 22.8515 8.97109C22.9978 8.79219 23 8.72754 23 4.72117C23 0.714798 22.9978 0.650143 22.8515 0.47124C22.7698 0.371331 22.6136 0.228603 22.5042 0.154016C22.3091 0.0208915 22.2239 0.0181293 17.9355 0.003725C14.4125 -0.00811415 13.523 0.00615835 13.3459 0.077259ZM0.670713 11.6533C0.380695 11.7697 0.0781465 12.1056 0.0258612 12.3692C0.00274328 12.4857 -0.00661917 14.3326 0.00497579 16.4733C0.0257171 20.2866 0.0291736 20.3693 0.174651 20.5472C0.256319 20.6471 0.4126 20.7898 0.521995 20.8644C0.717885 20.998 0.788679 21 5.17546 21C9.56224 21 9.63304 20.998 9.82893 20.8644C9.93832 20.7898 10.0946 20.6471 10.1763 20.5472C10.3225 20.3682 10.3248 20.3036 10.3248 16.2972C10.3248 12.2909 10.3225 12.2262 10.1763 12.0473C10.0946 11.9474 9.93832 11.8047 9.829 11.7301C9.63383 11.597 9.5487 11.5942 5.26023 11.5798C1.73731 11.5679 0.847806 11.5822 0.670713 11.6533ZM13.3459 11.6533C13.0559 11.7697 12.7534 12.1056 12.7011 12.3692C12.678 12.4857 12.6686 14.3326 12.6802 16.4733C12.7009 20.2866 12.7044 20.3693 12.8499 20.5472C12.9315 20.6471 13.0878 20.7898 13.1972 20.8644C13.3931 20.998 13.4639 21 17.8507 21C22.2375 21 22.3083 20.998 22.5042 20.8644C22.6135 20.7898 22.7698 20.6471 22.8515 20.5472C22.9978 20.3682 23 20.3036 23 16.2972C23 12.2909 22.9978 12.2262 22.8515 12.0473C22.7698 11.9474 22.6136 11.8047 22.5042 11.7301C22.3091 11.597 22.2239 11.5942 17.9355 11.5798C14.4125 11.5679 13.523 11.5822 13.3459 11.6533Z"
              />
            </svg>
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="21" viewBox="0 0 27 21" fill="none" onClick={() => onSetView("list")}>
              <path
                className={`${view === "list" ? "fill-aqua-blue" : "fill-[#D7D7D7]"}`}
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 3.01066V6.02133H3.16406H6.32812V3.01066V0H3.16406H0V3.01066ZM7.96289 3.01066V6.02133H17.4814H27V3.01066V0H17.4814H7.96289V3.01066ZM0 10.5V13.4858H3.16406H6.32812V10.5V7.51422H3.16406H0V10.5ZM7.96289 10.5V13.4858H17.4814H27V10.5V7.51422H17.4814H7.96289V10.5ZM0 17.9893V21H3.16406H6.32812V17.9893V14.9787H3.16406H0V17.9893ZM7.96289 17.9893V21H17.4814H27V17.9893V14.9787H17.4814H7.96289V17.9893Z"
              />
            </svg>
          </button>
        </div>
        {news.docs.length > 0 ? (
          <div className="mx-[-27px] mb-[-56px] flex flex-wrap md:flex-col">
            {news.docs.map((n: any) => {
              if (view === "list") {
                return (
                  <>
                    <div className="flex w-full px-[27px] pb-[30px] md:w-full md:pb-[30px] tablet:hidden">
                      <div className="flex w-full items-center bg-white p-[14px]">
                        <Link
                          href={`/blog/${n.slug}`}
                          className="block h-[150px] w-[250px] flex-shrink-0 bg-black/10 bg-cover bg-center transition-all duration-[0.3s] ease-in-out hover:opacity-70 tablet:hidden"
                          style={{
                            backgroundImage: `url(${n.coverImage?.url})`,
                          }}
                        ></Link>
                        <div className="ml-[30px] text-[20px] leading-[28px] text-[#343434] md:ml-[0]">
                          <p className="flex items-center pb-[20px] text-[18px] leading-none text-[#262626]">
                            <svg className="mr-[11px]" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                              <path
                                d="M8.39522 16.2648C8.17288 16.4871 8.17288 16.8551 8.39522 17.0775C8.61372 17.296 8.98938 17.296 9.20788 17.0775L15.7169 10.5685C16.265 10.0203 16.564 9.29198 16.564 8.51764C16.564 7.74331 16.2612 7.01114 15.7169 6.46681C14.5861 5.33598 12.746 5.33598 11.6114 6.46681L3.83355 14.2485C3.05538 15.0266 2.62988 16.0578 2.62988 17.158C2.62988 18.2581 3.05922 19.2893 3.83355 20.0675C4.61172 20.8456 5.64288 21.275 6.74305 21.275C7.84322 21.275 8.87438 20.8456 9.65255 20.0675L18.795 10.925C19.8147 9.90531 20.3744 8.55214 20.3744 7.11464C20.3744 5.67714 19.8147 4.32014 18.795 3.30431C17.7754 2.28464 16.4222 1.72498 14.9847 1.72498C13.5472 1.72498 12.1902 2.28464 11.1744 3.30431L2.98638 11.4885C2.76405 11.7108 2.76405 12.0788 2.98638 12.3011C3.20488 12.5196 3.58055 12.5196 3.79905 12.3011L11.9832 4.11698C12.7844 3.31581 13.8501 2.87498 14.9809 2.87498C16.1156 2.87498 17.1774 3.31581 17.9786 4.11698C18.7797 4.91814 19.2206 5.98381 19.2206 7.11464C19.2206 8.24548 18.7836 9.31498 17.9824 10.1123L8.83988 19.2548C8.28022 19.8145 7.53272 20.125 6.74305 20.125C5.95338 20.125 5.20588 19.8183 4.64622 19.2548C4.08655 18.6951 3.77605 17.9515 3.77605 17.158C3.77605 16.3645 4.08272 15.6208 4.64622 15.0611L12.4279 7.27948C13.1102 6.59714 14.2219 6.59714 14.9042 7.27948C15.5866 7.96181 15.5866 9.07348 14.9042 9.75581L8.39522 16.2648Z"
                                fill="black"
                              />
                            </svg>
                            {moment.tz(n.Date, "Asia/Manila").format("MMMM DD, YYYY").toString()}
                          </p>
                          <h4 className="pb-[8px] text-[25px] font-[500] leading-[30px] text-black transition-all duration-[0.3s] ease-in-out hover:text-aqua-blue ">
                            <Link href={`/blog/${n.slug}`}>{n.title}</Link>
                          </h4>
                          <p>{n.shortDescription}</p>
                        </div>
                      </div>
                    </div>
                    <div className="hidden w-3/6 px-[27px] pb-[56px] md:w-full md:pb-[30px] tablet:flex">
                      <div className="w-full bg-white p-[14px]">
                        <Link
                          href={`/blog/${n.slug}`}
                          className="block h-[273px] w-full bg-black/10 bg-cover bg-center transition-all duration-[0.3s] ease-in-out hover:opacity-70"
                          style={{
                            backgroundImage: `url(${n.coverImage?.url})`,
                          }}
                        ></Link>
                        <div className="mt-[21px] text-[20px] leading-[28px] text-[#343434]">
                          <p className="flex items-center pb-[20px] text-[18px] leading-none text-[#262626]">
                            <svg className="mr-[11px]" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                              <path
                                d="M8.39522 16.2648C8.17288 16.4871 8.17288 16.8551 8.39522 17.0775C8.61372 17.296 8.98938 17.296 9.20788 17.0775L15.7169 10.5685C16.265 10.0203 16.564 9.29198 16.564 8.51764C16.564 7.74331 16.2612 7.01114 15.7169 6.46681C14.5861 5.33598 12.746 5.33598 11.6114 6.46681L3.83355 14.2485C3.05538 15.0266 2.62988 16.0578 2.62988 17.158C2.62988 18.2581 3.05922 19.2893 3.83355 20.0675C4.61172 20.8456 5.64288 21.275 6.74305 21.275C7.84322 21.275 8.87438 20.8456 9.65255 20.0675L18.795 10.925C19.8147 9.90531 20.3744 8.55214 20.3744 7.11464C20.3744 5.67714 19.8147 4.32014 18.795 3.30431C17.7754 2.28464 16.4222 1.72498 14.9847 1.72498C13.5472 1.72498 12.1902 2.28464 11.1744 3.30431L2.98638 11.4885C2.76405 11.7108 2.76405 12.0788 2.98638 12.3011C3.20488 12.5196 3.58055 12.5196 3.79905 12.3011L11.9832 4.11698C12.7844 3.31581 13.8501 2.87498 14.9809 2.87498C16.1156 2.87498 17.1774 3.31581 17.9786 4.11698C18.7797 4.91814 19.2206 5.98381 19.2206 7.11464C19.2206 8.24548 18.7836 9.31498 17.9824 10.1123L8.83988 19.2548C8.28022 19.8145 7.53272 20.125 6.74305 20.125C5.95338 20.125 5.20588 19.8183 4.64622 19.2548C4.08655 18.6951 3.77605 17.9515 3.77605 17.158C3.77605 16.3645 4.08272 15.6208 4.64622 15.0611L12.4279 7.27948C13.1102 6.59714 14.2219 6.59714 14.9042 7.27948C15.5866 7.96181 15.5866 9.07348 14.9042 9.75581L8.39522 16.2648Z"
                                fill="black"
                              />
                            </svg>
                            {moment.tz(n.Date, "Asia/Manila").format("MMMM DD, YYYY").toString()}
                          </p>
                          <h4 className="pb-[8px] text-[25px] font-[500] leading-[30px] text-black transition-all duration-[0.3s] ease-in-out hover:text-aqua-blue md:text-[22px]">
                            <Link href={`/blog/${n.slug}`}>{n.title}</Link>
                          </h4>
                          <p className="md:text-[16px]">{n.shortDescription}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }

              return (
                <div key={`news_${n.id}`} className="flex w-3/6 px-[27px] pb-[56px] md:w-full md:pb-[30px]">
                  <div className="w-full bg-white p-[14px]">
                    <Link
                      href={`/blog/${n.slug}`}
                      className="block h-[273px] w-full bg-black/10 bg-cover bg-center transition-all duration-[0.3s] ease-in-out hover:opacity-70"
                      style={{ backgroundImage: `url(${n.coverImage?.url})` }}
                    ></Link>
                    <div className="mt-[21px] text-[20px] leading-[28px] text-[#343434]">
                      <p className="flex items-center pb-[20px] text-[18px] leading-none text-[#262626]">
                        <svg className="mr-[11px]" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                          <path
                            d="M8.39522 16.2648C8.17288 16.4871 8.17288 16.8551 8.39522 17.0775C8.61372 17.296 8.98938 17.296 9.20788 17.0775L15.7169 10.5685C16.265 10.0203 16.564 9.29198 16.564 8.51764C16.564 7.74331 16.2612 7.01114 15.7169 6.46681C14.5861 5.33598 12.746 5.33598 11.6114 6.46681L3.83355 14.2485C3.05538 15.0266 2.62988 16.0578 2.62988 17.158C2.62988 18.2581 3.05922 19.2893 3.83355 20.0675C4.61172 20.8456 5.64288 21.275 6.74305 21.275C7.84322 21.275 8.87438 20.8456 9.65255 20.0675L18.795 10.925C19.8147 9.90531 20.3744 8.55214 20.3744 7.11464C20.3744 5.67714 19.8147 4.32014 18.795 3.30431C17.7754 2.28464 16.4222 1.72498 14.9847 1.72498C13.5472 1.72498 12.1902 2.28464 11.1744 3.30431L2.98638 11.4885C2.76405 11.7108 2.76405 12.0788 2.98638 12.3011C3.20488 12.5196 3.58055 12.5196 3.79905 12.3011L11.9832 4.11698C12.7844 3.31581 13.8501 2.87498 14.9809 2.87498C16.1156 2.87498 17.1774 3.31581 17.9786 4.11698C18.7797 4.91814 19.2206 5.98381 19.2206 7.11464C19.2206 8.24548 18.7836 9.31498 17.9824 10.1123L8.83988 19.2548C8.28022 19.8145 7.53272 20.125 6.74305 20.125C5.95338 20.125 5.20588 19.8183 4.64622 19.2548C4.08655 18.6951 3.77605 17.9515 3.77605 17.158C3.77605 16.3645 4.08272 15.6208 4.64622 15.0611L12.4279 7.27948C13.1102 6.59714 14.2219 6.59714 14.9042 7.27948C15.5866 7.96181 15.5866 9.07348 14.9042 9.75581L8.39522 16.2648Z"
                            fill="black"
                          />
                        </svg>
                        {moment.tz(n.Date, "Asia/Manila").format("MMMM DD, YYYY").toString()}
                      </p>
                      <h4 className="pb-[8px] text-[25px] font-[500] leading-[30px] text-black transition-all duration-[0.3s] ease-in-out hover:text-aqua-blue md:text-[22px]">
                        <Link href={`/blog/${n.slug}`}>{n.title}</Link>
                      </h4>
                      <p className="md:text-[16px]">{n.shortDescription}z</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Typography textAlign="center" color="gray">
            No blogs found
          </Typography>
        )}

        {news.hasNextPage && (
          <div className="pt-[80px] text-center md:pt-[50px] sm:md:pt-[30px]">
            <Button
              onClick={onMore}
              className="mx-auto flex h-[69px] w-full max-w-[195px] items-center justify-center !p-0 text-[17px] sm:h-[50px] sm:max-w-[150px]"
            >
              See More
            </Button>
          </div>
        )}
      </Section>
    </div>
  );
};

export default News;
