import React from "react";
import Slider from "@/components/Slider/Slider";
import Link from "next/link";

const Card = (props: any) => {
  return (
    <div className={`card-item px-[12px] ${props.className}`}>
      <div className={`card-container w-full`}>
        <div className="card-img relative w-full bg-black/30">
          <Slider
            slideClassName="h-[327px] lg:h-[270px]"
            slides={props.images}
            href={props.url}
          />
          <span className="absolute bottom-[16px]  left-[15px] text-[16px] font-[500] text-white">
            Artist Illustration
          </span>
        </div>
        <div className="card-content text-center">
          <div className="card-header pt-[23px]">
            <h4 className="f-[30px] pb-[6px] leading-[50px]">
              <Link
                href={props.url}
                className="transition-all duration-[0.3s] ease-in-out hover:text-aqua-blue"
              >
                {props.header}
              </Link>
            </h4>
          </div>
          <div className="card-desc text-[22px] font-[500] leading-[30px]">
            {props.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
