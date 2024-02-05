import React from "react";
import numbro from "numbro";
import Link from "next/link";

const FeaturedBanner = ({ slide }: { slide: any }) => {
  const project = slide.project;

  if (!project.title) return null;

  return (
    <div
      className="relative flex h-[756px] w-full flex-shrink-0 items-center bg-cover bg-center md:h-[550px]"
      style={{ backgroundImage: `url(${project.headerImage.url})` }}
    >
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 bg-black opacity-[0.3]"></div>
      <div className="container relative">
        <div className="relative inline-block w-full max-w-[595px] bg-[#002E50]/80 pb-[27px] pl-[35px] pr-[28px] pt-[24px] text-white md:px-[25px]">
          <div className="absolute bottom-[100%] left-0 flex h-[31px] w-[104px] items-center justify-center bg-baby-blue text-[18px] leading-none">
            Featured
          </div>
          <div className="flex items-end justify-between pb-[13px] text-[20px] font-[400] md:block">
            <Link href={`/project/${project?.slug}`}>
              <h4 className="text-[28px] font-[400] leading-none md:pb-[5px]">
                {project.title}
              </h4>
            </Link>
            <strong className="font-[400] uppercase">
              ₱ {numbro(project.minPrice).format("0.0a")} -{" "}
              {numbro(project.maxPrice).format("0.0a")}
            </strong>
          </div>
          <p className="flex items-center">
            <svg
              className="mr-[10px]"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="17"
              viewBox="0 0 10 17"
              fill="none"
            >
              <path
                d="M5 0C2.24305 0 0 2.54213 0 5.66668C0 6.60467 0.206923 7.53469 0.600292 8.35958L4.72657 16.8174C4.78151 16.9301 4.88618 17 5 17C5.11382 17 5.2185 16.9301 5.27343 16.8174L9.40123 8.35679C9.79308 7.53469 10 6.60463 10 5.66664C10 2.54213 7.75695 0 5 0ZM5 8.5C3.62153 8.5 2.50002 7.22895 2.50002 5.66668C2.50002 4.1044 3.62153 2.83336 5 2.83336C6.37847 2.83336 7.49999 4.1044 7.49999 5.66668C7.49999 7.22895 6.37847 8.5 5 8.5Z"
                fill="#B6B6B6"
              />
            </svg>
            {project.subLocationTwo?.title
              ? `${project.subLocationTwo?.title}, `
              : ""}
            {project.location.title}
          </p>
          <div className="flex md:pb-[30px]">
            <div className="pr-[44px] text-[20px] md:pr-[20px]">
              <label className="text-[16px] text-[#C7C7C7]">Unit Type</label>
              <p className="leading-none">
                {project.propertyDetails.numberOfBedrooms}BR
              </p>
            </div>
            <div className="pr-[0] text-[20px]">
              <label className="text-[16px] text-[#C7C7C7]">Project Type</label>
              <p className="leading-none">{project.propertyType.title}</p>
            </div>
          </div>
          <Link
            href={`/project/${project.slug}`}
            className="absolute bottom-0 right-0 flex h-[31px] w-[104px] items-center justify-center bg-aqua-blue text-[18px] leading-none transition-all duration-[0.3s] ease-in-out hover:!bg-[#28D8FF]"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBanner;
