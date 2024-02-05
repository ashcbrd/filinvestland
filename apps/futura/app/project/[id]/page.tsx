import React from "react";
import Content from "@/app/components/cards/content";
import Banner from "@/app/components/carousel/banner";
import numbro from "numbro";
import qs from "qs";
import ScheduleForm from "../../projects/client/scheduleform";
import Locator from "@/app/components/map/Locator";
import { serializeRichText } from "@/app/utils/serializeRichText";
import ImageCarousel from "@/app/components/slider";
import SinglePropertyBanner from "@/app/components/properties/single-banner";
import Detail from "@/app/components/properties/detail";
import { Typography } from "@mui/material";

async function getData(id: any) {
  const query = qs.stringify(
    {
      where: { slug: { equals: id } },
    },
    {
      addQueryPrefix: true,
    }
  );

  const projectQuery = await fetch(
    `${process.env.CMS_URL}/api/futura-projects/${query}`,
    { cache: "no-cache" }
  );
  const project = await projectQuery.json();

  return {
    content: project,
  };
}

const Home = async ({ params }: any) => {
  const req = await getData(params.id);
  const page = req.content.docs[0];

  return (
    <div className="w-full px-4 md:px-0">
      <SinglePropertyBanner images={page?.PropertyImages} />
      <p className="mt-20 block w-full text-center text-[20px] font-[500] leading-normal md:hidden">
        {page?.atitle}
      </p>
      <Detail page={page} />
      {page?.featuresAndAmenities && (
        <section className="container mx-auto py-8">
          <div className="mb-5">
            <h5 className="mb-5 text-center font-quicksand text-[22px] font-bold leading-none md:text-start md:text-[30px]">
              Amenities
            </h5>
            <div className="mt-20 flex flex-1 flex-col justify-center gap-4 text-center font-quicksand text-[14px] leading-7 text-[#343434] md:mt-4 md:text-start md:text-[18px]">
              {serializeRichText(page?.featuresAndAmenities?.context, true)}{" "}
            </div>
          </div>

          <div className="mt-20 flex flex-wrap gap-10">
            {page?.featuresAndAmenities &&
              page?.featuresAndAmenities.amenities.map((x: any) => (
                <div className="flex items-center text-[14px] font-[500] md:text-base">
                  <svg
                    className="mr-[19px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                  >
                    <path
                      d="M1 6.5L6.33333 12L17 1"
                      stroke="#D1D1D1"
                      stroke-width="2"
                    />
                  </svg>
                  <Typography>{x.Amenity?.title}</Typography>
                </div>
              ))}
          </div>
        </section>
      )}
      {page?.productOffering?.title && (
        <div className="mt-10 w-full bg-white py-24 pt-10">
          <section className="container mx-auto">
            <h5 className="mb-5 text-center font-quicksand text-[22px] font-bold leading-none md:text-start md:text-[30px]">
              {page?.productOffering?.title}
            </h5>
            {page?.productOffering?.description ||
              (page?.productOffering?.title && (
                <Content title={""}>
                  <div className="flex items-center justify-center">
                    <p className="mb-2 w-full text-[18px] leading-7 text-[#5F5F5F]">
                      {page?.productOffering?.description}
                    </p>
                  </div>
                </Content>
              ))}
            {page?.productOffering.gallery && (
              <div className="mt-10 flex flex-col justify-center gap-x-10 gap-y-10 text-center md:flex-row">
                {page?.productOffering &&
                  page?.productOffering?.gallery?.map((x: any, index: any) => (
                    <div
                      key={index}
                      className="mr-4 flex flex-col items-center"
                    >
                      <img
                        src={x.image.url}
                        alt={`Image ${index + 1}`}
                        className="rounded-3xl object-cover md:h-[400px]"
                      />
                      <p className="mx-auto mt-10">{x.description}</p>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </div>
      )}
      {page?.virtualTourEmbedUrls?.length > 0 && (
        <div className="mx-auto mb-5 mt-12  min-h-screen">
          <section>
            <div className="mb-24 flex items-center justify-center">
              <div className="text-custom-black-2 w-full leading-[30px]">
                <div className="flex items-center justify-center">
                  <h2 className="mb-10 pb-[11px] text-[35px] font-bold leading-[43px] text-black">
                    Virtual Tour
                  </h2>
                </div>
                <p className="mb-5 w-[60%] text-center text-[18px] leading-7 text-[#5F5F5F] md:w-full">
                  {page?.virtualTour?.description}
                </p>
                {page.virtualTourEmbedUrls.map((obj: any) => {
                  if (
                    obj.virtualTourEmbedUrl?.indexOf(".matterport.com") > -1
                  ) {
                    return (
                      <iframe
                        src={`${obj.virtualTourEmbedUrl}&play=1&brand=0&dh=0&mls=1&mt=0`}
                        height={522}
                        width="100%"
                        className="mb-12 mt-12"
                      />
                    );
                  }

                  return (
                    <iframe
                      src={`${obj.virtualTourEmbedUrl}`}
                      height={522}
                      width="100%"
                      className="mb-12 mt-12"
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}
      {page?.siteDevelopmentPlan.title && (
        <div className="mx-auto mb-5 mt-5 min-h-screen">
          <section>
            <Content title={page?.siteDevelopmentPlan?.title}>
              <div className="flex items-center justify-center">
                <p className="mb-2 w-full whitespace-pre-wrap leading-7 text-[#5F5F5F] md:text-[18px]">
                  {page?.siteDevelopmentPlan?.description}
                </p>
              </div>
            </Content>
            <div className="mb-20 mt-20 flex items-center justify-center">
              <img
                src={
                  page?.siteDevelopmentPlan?.floorPlanImages[0]?.floorPlanImage
                    ?.url
                }
              />
            </div>
          </section>
        </div>
      )}
      <div className="container mx-auto mb-10 w-full">
        <Locator
          className="w-full"
          projects={[page]}
          disableSearch={true}
          type="detail"
          activeLocation={page}
        />
      </div>
      {page?.whatIsNearby?.title && (
        <section className="container !my-20 mx-auto">
          <div className="flex w-full flex-col items-center justify-between gap-y-6 md:flex-row">
            <div className="text-custom-black-2 text-[20px] leading-[30px] md:w-[600px]">
              <h2 className="pb-[9px] text-center text-[22px] font-[700] leading-[43px] text-black md:text-start md:text-[35px]">
                {page?.whatIsNearby.title || "What’s Nearby"}
              </h2>
              <p className="mx-auto w-[80%] whitespace-pre-wrap text-center font-quicksand text-[14px] leading-7 text-[#5F5F5F] md:mx-0 md:text-start md:text-[18px]">
                {page?.whatIsNearby.description}
              </p>
            </div>
            <div className="mb-[-14px] grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-4">
              {page?.whatIsNearby.nearbyLocation &&
                page?.whatIsNearby.nearbyLocation.map((prop: any) => (
                  <div className="h-max w-[220px] px-[12px]">
                    <div className="flex items-center rounded-[10px] bg-white p-[14px] shadow-md shadow-gray-500/10">
                      <svg
                        className="mr-[15px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="23"
                        viewBox="0 0 15 23"
                        fill="none"
                      >
                        <path
                          d="M7.33377 0.658447C3.59101 0.658447 0.545898 3.99358 0.545898 8.0928C0.545898 9.32339 0.826812 10.5435 1.36084 11.6257L6.96258 22.7219C7.03715 22.8698 7.17926 22.9615 7.33377 22.9615C7.48829 22.9615 7.6304 22.8698 7.70497 22.7219L13.3088 11.6221C13.8407 10.5435 14.1216 9.32335 14.1216 8.09276C14.1216 3.99358 11.0765 0.658447 7.33377 0.658447ZM7.33377 11.81C5.46239 11.81 3.93986 10.1424 3.93986 8.0928C3.93986 6.04319 5.46239 4.37565 7.33377 4.37565C9.20516 4.37565 10.7277 6.04319 10.7277 8.0928C10.7277 10.1424 9.20516 11.81 7.33377 11.81Z"
                          fill="#7C0101"
                        />
                      </svg>
                      <div className="font-[500] leading-[20px]">
                        <p className="text-[14px] font-[500]">
                          {prop.placeName.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
