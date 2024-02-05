import React from "react";

const MediaSection = ({ content }: any) => {
  const video = content?.content?.find(
    (item: any) => item.blockType === "company-background-video"
  );

  if (!video?.videoBackground?.url) return null;
  return (
    <div className="relative m-0 h-[740px] w-full md:mx-auto lg:-mt-36 lg:w-[85%]">
      <video
        className="pointer-events-none bottom-0 right-0 block h-full w-full object-cover"
        autoPlay
        muted
        loop
      >
        <source src={`${video?.videoBackground?.url}`} />
      </video>
    </div>
  );
};

export default MediaSection;
