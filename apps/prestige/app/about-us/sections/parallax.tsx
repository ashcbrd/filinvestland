import React from "react";
import ImageBanner from "../../components/carousel/headerbanner";

export const Parallax = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div
      style={{
        position: "relative",
        clipPath: "inset(0 0 0 0)",
      }}
      className="relative h-[500px] w-full transition-all lg:h-[730px] 2xl:h-[920px]"
    >
      <div
        style={{
          position: "fixed",
          height: "100%",
          width: "100%",
          left: "0",
          top: "0",
        }}
      >
        <ImageBanner
          data={{ url: imageUrl }}
          noOverlay
          customClass="!h-[inherit]"
        />
      </div>
    </div>
  );
};
