"use client";

import React from "react";
import Link from "next/link";
import moment from "moment";
import Card from "@/app/components/cards/card";
import { Typography } from "@/app/components/typography/typography";

type Props = {
  data: any;
};

export const FeaturedNew: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {data.map((item: any) => {
        return (
          <Card key={item.id} style="bg-[#F9F9F9] space-y-6">
            <img
              src={item.coverImage?.url}
              alt={item.title}
              className="h-[317px] w-full object-cover"
            />
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.39522 16.2648C8.17288 16.4871 8.17288 16.8551 8.39522 17.0775C8.61372 17.296 8.98938 17.296 9.20788 17.0775L15.7169 10.5685C16.265 10.0203 16.564 9.29198 16.564 8.51764C16.564 7.74331 16.2612 7.01114 15.7169 6.46681C14.5861 5.33598 12.746 5.33598 11.6114 6.46681L3.83355 14.2485C3.05538 15.0266 2.62988 16.0578 2.62988 17.158C2.62988 18.2581 3.05922 19.2893 3.83355 20.0675C4.61172 20.8456 5.64288 21.275 6.74305 21.275C7.84322 21.275 8.87438 20.8456 9.65255 20.0675L18.795 10.925C19.8147 9.90531 20.3744 8.55214 20.3744 7.11464C20.3744 5.67714 19.8147 4.32014 18.795 3.30431C17.7754 2.28464 16.4222 1.72498 14.9847 1.72498C13.5472 1.72498 12.1902 2.28464 11.1744 3.30431L2.98638 11.4885C2.76405 11.7108 2.76405 12.0788 2.98638 12.3011C3.20488 12.5196 3.58055 12.5196 3.79905 12.3011L11.9832 4.11698C12.7844 3.31581 13.8501 2.87498 14.9809 2.87498C16.1156 2.87498 17.1774 3.31581 17.9786 4.11698C18.7797 4.91814 19.2206 5.98381 19.2206 7.11464C19.2206 8.24548 18.7836 9.31498 17.9824 10.1123L8.83988 19.2548C8.28022 19.8145 7.53272 20.125 6.74305 20.125C5.95338 20.125 5.20588 19.8183 4.64622 19.2548C4.08655 18.6951 3.77605 17.9515 3.77605 17.158C3.77605 16.3645 4.08272 15.6208 4.64622 15.0611L12.4279 7.27948C13.1102 6.59714 14.2219 6.59714 14.9042 7.27948C15.5866 7.96181 15.5866 9.07348 14.9042 9.75581L8.39522 16.2648Z"
                    fill="black"
                  />
                </svg>
                <Typography
                  color="dark"
                  text={moment(item.Date).format("MMMM DD, YYYY")}
                  font="nunito"
                  size="18"
                />
              </div>
              <Typography
                text={item.title}
                color="dark"
                font="nunito"
                size="24"
                className="leading-snug"
              />
              <Typography
                size="20"
                color="dark"
                font="nunito"
                text={item.shortDescription ?? ""}
              />
              <Link
                href={`/news/${item.slug}`}
                className="!mb-2 inline-block text-[15px] lg:text-[20px] font-medium text-[#9F4C03] hover:underline"
              >
                Continue Reading
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
