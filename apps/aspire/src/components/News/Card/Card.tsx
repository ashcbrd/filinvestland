import Link from "next/link";
import React from "react";
import moment from "moment";

const Card = ({
  background = "",
  header,
  content,
  date,
  slug,
}: {
  background?: string;
  header: string;
  content: string;
  date: string;
  slug: string;
}) => {
  const classes = "relative ncard-container h-news-card tablet:h-[400px] flex items-end bg-cover bg-center";
  return (
    <div className="news-card group/news-card w-2/6 px-[12px] pb-[24px] text-white md:!w-full md:pb-[30px] lg:w-6/12">
      <Link href={`/news/${slug}`}>
        <div className={classes} style={{ backgroundImage: `url(${background})` }}>
          <div className="absolute bottom-0 left-0 right-0 rotate-[-90deg] bg-card-shadow pb-[100%] transition-all duration-[0.3s] ease-in-out group-hover/news-card:opacity-0 md:hidden"></div>
          <div className="ncard-content relative w-full pb-[26px] pl-[25px] pr-[36px] leading-normal">
            <h5 className="pb-[8px] text-[25px] font-[500] leading-[1.2] md:text-[20px]">{header}</h5>
            <p className="pb-0 leading-[21px]">{content.split(" ").slice(0, 15).join(" ")}...</p>
            <span className="inline-block pt-[15px] text-[16px] text-custom-gray-5 md:text-[12px]">{moment(date).format("MMMM DD, YYYY")}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
