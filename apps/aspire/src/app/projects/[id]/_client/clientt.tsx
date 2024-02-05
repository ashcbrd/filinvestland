"use client";

import Section from "@/components/Section/Section";
import React, { useEffect, useState, memo } from "react";
import VideoModal from "@/components/Video/Modal/Modal";
import Locator from "@/components/Projects/Locator/Locator";
import numbro from "numbro";
import { setters } from "@/context/Projects";
// import Share from "./Share/Share";
import Page from "@/components/Page/Page";
import Banner from "./Banner/Banner";
import { ClickAwayListener, Grid } from "@mui/material";
import ReactSlider from "react-slick";
import { serializeRichText } from "@/utils/serializeRichText";
import { getDomainRedirection } from "@/utils";

const Project = ({ req }: any) => {
  const content = req.content.docs[0];
  const methods = setters();
  const [isSticky, setIsStick] = useState(false);
  const [zoomedImg, setZoomedImg] = useState([] as any);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 738 + 273) {
        setIsStick(true);
      } else {
        setIsStick(false);
      }
    });
  }, []);

  function get_distance_in_miles(d1: any, d2: any) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = d1.latitude * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = d2.latitude * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (d2.longitude - d1.longitude) * (Math.PI / 180); // Radian difference (longitudes)
    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );

    return d.toFixed(2);
  }

  const Header = () => {
    return (
      <div
        className={`${
          isSticky ? "!pb-[31px]" : ""
        } flex w-full border-b border-b-custom-gray-3 pb-[34px] lg:flex-col`}
      >
        {content && content.logo && (
          <div className="flex min-h-[157px] max-w-[309px] flex-shrink-0 items-center justify-center bg-white px-[25px] md:max-w-full lg:mb-[30px] lg:w-full lg:px-[0px]">
            <img
              src={content.logo?.url}
              alt={content.logo?.alt}
              className="max-h-[80%]"
            />
          </div>
        )}
        <div className="flex w-full items-end justify-between pl-[30px] lg:w-full lg:pl-[0px] smd:block">
          <div>
            <div className="mb-[30px] inline-flex h-[33px] w-auto items-center justify-center bg-aqua-blue px-[15px] text-[14px] font-[500] uppercase leading-[33px] tracking-[2.8px] text-white">
              <svg
                className="mr-[14px]"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <g clip-path="url(#clip0_341_1966)">
                  <path
                    d="M6.63417 13.1944L4.74848 15.0801C3.9667 15.8618 2.70068 15.8618 1.91957 15.0802C1.13829 14.2989 1.13829 13.0328 1.91941 12.2517L5.69147 8.47962C6.47258 7.69847 7.73873 7.69847 8.51984 8.47962C8.78024 8.74001 9.20244 8.74001 9.46283 8.47962C9.72323 8.21923 9.72323 7.79702 9.46283 7.53663C8.1609 6.2347 6.05041 6.2347 4.74848 7.53663L0.97645 11.3087C-0.325483 12.6106 -0.325483 14.7211 0.97645 16.023C2.27823 17.3256 4.38888 17.3256 5.6915 16.023L7.5772 14.1373C7.83759 13.8769 7.83759 13.4547 7.5772 13.1943C7.3168 12.9339 6.89457 12.934 6.63417 13.1944Z"
                    fill="#4CA4D8"
                  />
                  <path
                    d="M15.0262 1.97352C13.7243 0.671587 11.6131 0.671587 10.3112 1.97352L8.04874 4.23595C7.78834 4.49634 7.78834 4.91855 8.04874 5.17894C8.30913 5.43933 8.73133 5.43933 8.99173 5.17894L11.2542 2.91651C12.0353 2.13536 13.3021 2.13536 14.0832 2.91651C14.8643 3.69763 14.8643 4.96377 14.0832 5.74489L9.93444 9.8937C9.15329 10.6749 7.88717 10.6749 7.10606 9.8937C6.84567 9.63331 6.42346 9.63331 6.16307 9.8937C5.90268 10.1541 5.90268 10.5763 6.16307 10.8367C7.465 12.1386 9.57549 12.1386 10.8774 10.8367L15.0262 6.68791C16.3281 5.38598 16.3281 3.27545 15.0262 1.97352Z"
                    fill="#4CA4D8"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_341_1966">
                    <rect
                      width="16.0029"
                      height="16.0029"
                      fill="white"
                      transform="translate(0 0.99707)"
                    />
                  </clipPath>
                </defs>
              </svg>
              {content.propertyType.title}
            </div>
            <div className="flex sm:flex-wrap">
              <div className="pr-[23px] text-[23px] font-[500] sm:!w-1/2 sm:pb-[20px] sm:pr-[0px] lg:w-1/4">
                <label className="mb-[5px] text-[18px] font-[400] leading-[21px] text-custom-gray-2">
                  Price Range
                </label>
                <p className="uppercase xs:text-[18px]">
                  ₱ {numbro(content.minPrice).format("0.0a")} -{" "}
                  {numbro(content.maxPrice).format("0.0a")}
                </p>
              </div>
              <div className="px-[23px] text-[23px] font-[500] sm:!w-1/2 sm:px-[0px] sm:pb-[20px] lg:w-1/4">
                <label className="mb-[5px] text-[18px] font-[400] leading-[21px] text-custom-gray-2">
                  Address
                </label>
                <p className="xs:text-[18px]">
                  {content.subLocationTwo?.title
                    ? `${content.subLocationTwo?.title}, `
                    : ""}
                  {content.location.title}
                </p>
              </div>
              <div className="px-[23px] text-[23px] font-[500] sm:!w-1/2 sm:px-[0px] lg:w-1/4">
                <label className="mb-[5px] text-[18px] font-[400] leading-[21px] text-custom-gray-2">
                  Product Offering
                </label>
                <p className="xs:text-[18px]">{content.propertyType?.title}</p>
              </div>
              {content.propertyDetails?.status && (
                <div className="pl-[23px] text-[23px] font-[500] sm:!w-1/2 sm:pl-[0px] lg:w-1/4">
                  <label className="mb-[5px] text-[19px] font-[400] leading-[21px] text-custom-gray-2">
                    Status
                  </label>
                  <p className="xs:text-[18px]">
                    {content.propertyDetails?.status?.title}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mb-[10px] flex items-center md:!flex-col-reverse md:items-start smd:mb-0 smd:mt-[30px] smd:flex-row-reverse smd:justify-end">
            <div className="mr-[27px] transition-all duration-[0.3s] ease-in-out hover:!opacity-70 md:!ml-0 md:mt-[20px] smd:ml-[27px]">
              {/* <Share url={`/projects/${ content.slug }`} /> */}
            </div>
            <button
              onClick={() => methods.setInquireTo(content)}
              className="h-[67px] border border-[#004C79] bg-[#004C79] px-[30px] text-[16px] uppercase tracking-[1.6px] text-white transition-all duration-[0.3s] ease-in-out hover:!bg-transparent hover:!text-[#004C79] smd:mb-[0]"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Page id="project" disableHeader={isSticky}>
      <Banner project={content} />
      <Section id="bar" className={`bg-candy-blue pt-[66px]`}>
        <Header />
      </Section>
      {isSticky && (
        <Section
          id="bar2"
          style={{ boxShadow: "0px 4px 40px 2px #0000001A" }}
          className={`${
            isSticky
              ? "fixed left-0 right-0 top-[0] z-[11] !bg-white !pt-[0] tablet:!hidden"
              : ""
          } bg-candy-blue pt-[66px]`}
        >
          <Header />
        </Section>
      )}
      <Section
        id="details"
        className="bg-candy-blue pb-[54px] text-custom-black-2 tablet:pb-[60px] tablet:pt-[30px]"
      >
        <div className="flex flex-1 flex-col justify-center gap-3 pb-[43px] pt-[30px] text-[20px] leading-[30px] tablet:pb-[60px] tablet:pt-[0]">
          {serializeRichText(content.description, true)}
        </div>
        <div className="pb-[43px] text-[20px] leading-[30px] last:!pb-[0] tablet:pb-[30px]">
          <h2 className="pb-[0px] text-[35px] font-[500] leading-normal">
            Features & Amenities
          </h2>
          <div className="flex flex-1 flex-col justify-center gap-3">
            {serializeRichText(
              content.featuresAndAmenities?.amenities?.descriptionRichText,
              true
            )}
          </div>
        </div>
        {content.featuresAndAmenities?.amenities?.amenities.map((a: any) => (
          <div>
            <h4 className="pb-[10px] text-[25px]">{a.title}</h4>
            <div className="flex w-full flex-wrap items-center justify-start pb-[30px] lg:flex-wrap">
              {a.features.map((f: any) => (
                <div className="mb-[15px] flex items-center pr-[35px] font-[500] leading-none sm:!w-1/2 lg:mb-[20px] lg:w-1/3">
                  <img src={f.icon?.url} width={22} className="mr-[19px]" />
                  {f.Count > 1 ? f.Count : ""} {f.Amenity?.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>
      <Section id="locator" fw>
        <Locator
          specific={true}
          className="h-[675px]"
          projects={[
            content,
            ...content.whatIsNearby?.nearbyLocation
              ?.filter((n: any) => n.placeName)
              .map((n: any) => ({
                nonClickable: true,
                title: n.placeName.title,
                coordinates: { latitude: n.Latitude, longitude: n.longitude },
                isLandmark: true,
              })),
          ]}
          disableSearch={true}
          type="detail"
          activeLocation={content}
        />
      </Section>
      {content.whatIsNearby?.nearbyLocation?.length > 0 && (
        <Section
          id="nearby"
          className="bg-candy-blue pb-[73px] pt-[73px] tablet:pb-[60px] tablet:pt-[60px]"
        >
          <div className="flex w-full smd:flex-col">
            <div className="mr-[78px] max-w-[464px] text-[20px] leading-[30px] text-custom-black-2 smd:mr-[0] smd:w-full smd:max-w-full smd:pb-[30px]">
              <h2 className="pb-[9px] text-[35px] font-[400] leading-[43px] text-black">
                {content.whatIsNearby?.title || "What's Nearby"}
              </h2>
              <p>
                {content.whatIsNearby?.description ||
                  "Situated within San Rafael Estates, Alta Vida enjoys an accessible location along Pan-Philippine Highway (formerly Cagayan Valley Road) in San Rafael, Bulacan."}
              </p>
            </div>
            <div className="mx-[-12px] mb-[-14px] flex w-full flex-wrap">
              {content.whatIsNearby?.nearbyLocation.map((prop: any) => (
                <div className="w-4/12 px-[12px] pb-[14px] md:!w-full lg:w-1/2">
                  <div className="flex items-center rounded-[10px] bg-white p-[14px] shadow-location-box">
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
                        fill="#0377CB"
                      />
                    </svg>
                    <div className="font-[500] leading-none">
                      <p className="pb-0 font-[500]">{prop.placeName?.title}</p>
                      <small className="text-[16px]">
                        {get_distance_in_miles(content.coordinates, {
                          latitude: prop.Latitude,
                          longitude: prop.longitude,
                        })}{" "}
                        mi
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}
      {content.productOffering?.oferrings?.length > 0 && (
        <Section
          id="offerings"
          className="pb-[116px] pt-[87px] tablet:pb-[60px] tablet:pt-[60px]"
        >
          <div className="w-full pb-[50px] leading-[30px] text-[#5F5F5F] tablet:pb-[30px]">
            <h2 className="pb-[18px] text-[35px] font-[400] leading-[50px] text-custom-black-1">
              Product Offerings
            </h2>
            <p className="whitespace-pre-wrap">
              {content.productOffering?.description}
            </p>
          </div>
          {content.productOffering?.oferrings?.length > 0 && (
            <Grid
              container
              spacing={4}
              columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
            >
              {
                // Render individual Propcards if there are 3 or fewer items
                content.productOffering?.oferrings?.map(
                  (o: any, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <div>
                        <div>
                          <div className="pb-[50px] tablet:pb-[30px]">
                            <button
                              onClick={() => setZoomedImg([o.image])}
                              className="w-full"
                            >
                              <img
                                className="w-full"
                                src={o.image?.url}
                                alt={o.image?.alt}
                                style={{
                                  aspectRatio: "1/1",
                                  objectFit: "contain",
                                  mixBlendMode: "color-burn",
                                }}
                              />
                            </button>
                          </div>
                          <div className="flex gap-4">
                            {o.title && (
                              <h4 className="text-lg font-bold">{o.title}</h4>
                            )}
                            {o.Specification.map((s: any) => (
                              <p className="text-lg">
                                <span>{s.name}:</span> {s.value}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Grid>
                  )
                )
              }
            </Grid>
          )}
        </Section>
      )}
      {(content.siteDevelopmentPlan?.developmentPlanRichText ||
        content.siteDevelopmentPlan?.floorPlanImages?.length > 0) && (
        <Section
          id="dev-plan"
          className={`${
            content.productOffering.oferrings.length === 0 ? "bg-white" : ""
          } bg-candy-blue pb-[96px] pt-[96px] tablet:pb-[60px] tablet:pt-[60px]`}
        >
          <div className="flex items-center tablet:flex-col">
            <div className="w-full tablet:pb-[30px]">
              <div className="flex max-w-[560px] flex-1 flex-col justify-center gap-3 leading-[30px] text-[#5F5F5F] tablet:max-w-full">
                {serializeRichText(
                  content.siteDevelopmentPlan?.developmentPlanRichText,
                  true
                )}
              </div>
            </div>
            {content.siteDevelopmentPlan?.floorPlanImages?.length > 0 && (
              <div className="w-full max-w-[580px] flex-shrink-0 tablet:max-w-full">
                {content.siteDevelopmentPlan?.floorPlanImages?.map(
                  (img: any) => (
                    <button onClick={() => setZoomedImg([img.floorPlanImage])}>
                      <img
                        data-attr={JSON.stringify(img.floorPlanImage)}
                        className="tablet:mx-auto"
                        src={img.floorPlanImage?.url}
                        alt={img.floorPlanImage?.alt}
                      />
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </Section>
      )}
      {content.featuresAndAmenities?.featuredVideo && (
        <Section id="video" fw className="flex justify-center align-middle">
          <VideoModal
            className="center aspect-video h-[706px]"
            video={content.featuresAndAmenities?.featuredVideo}
          />
        </Section>
      )}
      {content.virtualTourEmbedUrls?.filter((v: any) => v.virtualTourEmbedUrl)
        .length > 0 && (
        <Section
          id="virtual-tour"
          className="bg-candy-blue pb-[149px] pt-[102px] tablet:pb-[60px] tablet:pt-[60px]"
        >
          <div className="w-full leading-[30px] text-custom-black-2">
            <h2 className="pb-[11px] text-[35px] font-[400] leading-[43px] text-black">
              Virtual Tour
            </h2>
            <p>{content.virtualTour?.description}</p>
            <div className="mb-[-30px]">
              {content.virtualTourEmbedUrls?.map((v: any) => (
                <iframe
                  src={
                    v.virtualTourEmbedUrl?.includes("exsight360")
                      ? v.virtualTourEmbedUrl
                      : `${v.virtualTourEmbedUrl}&play=1&brand=0&dh=0&mls=1&mt=0`
                  }
                  height={522}
                  width="100%"
                  className="mb-[50px]"
                />
              ))}
            </div>
          </div>
        </Section>
      )}
      {content.onlineBrochure.length > 0 && (
        <Section id="brochure" className="py-[110px] tablet:py-[60px]">
          <div className="mb-[50px] w-full leading-[30px] text-custom-black-2 tablet:mb-[30px]">
            <h2 className="text-[35px] font-[400] leading-[43px] text-black">
              Online Brochure
            </h2>
          </div>
          <div className="mx-[-30px] flex justify-between sm:mx-[0px] lg:w-full lg:flex-col">
            <div className="mx-[30px] w-3/6 sm:mx-[0px] lg:w-full lg:pb-[50px]">
              <div className="mx-[-20px] flex items-center sm:mx-[0px] sm:flex-col">
                <div className="mx-[20px] w-3/6 sm:w-full sm:pb-[30px]">
                  <img
                    className="h-full w-full"
                    src="/images/digital-brochure.png"
                    alt="Family"
                  />
                </div>
                <div className="mx-[20px] w-3/6 sm:w-full">
                  <div className="mb-[50px] sm:mb-[30px]">
                    <h4 className="mb-[10px] text-[25px] font-[400] leading-[30px]">
                      Duis aute irure dolor in reprehenderit in culpa quic
                    </h4>
                    <p>Excepteur sint occaecat cupidatat non proident</p>
                  </div>
                  <button className="h-[67px] w-[222px] border-[1px] border-aqua-blue bg-aqua-blue py-[17px] text-[16px] text-white sm:h-[50px] sm:w-[150px] sm:py-[0px]">
                    DOWNLOAD
                  </button>
                </div>
              </div>
            </div>
            <div className="mx-[30px] w-3/6 sm:mx-[0px] lg:w-full">
              <div className="mx-[-20px] flex items-center sm:mx-[0px] sm:flex-col">
                <div className="mx-[20px] w-3/6 sm:w-full sm:pb-[30px]">
                  <img
                    className="h-full w-full"
                    src="/images/design-brochure.png"
                    alt="Family"
                  />
                </div>
                <div className="mx-[20px] w-3/6 sm:w-full">
                  <div className="mb-[50px] sm:mb-[30px]">
                    <h4 className="mb-[10px] text-[25px] font-[400] leading-[30px]">
                      Massa eget egestas purus viverra accum
                    </h4>
                    <p>Excepteur sint occaecat cupidatat non proident</p>
                  </div>
                  <button className="h-[67px] w-[222px] border-[1px] border-aqua-blue bg-aqua-blue text-[16px] text-white sm:h-[50px] sm:w-[150px] sm:py-[0px]">
                    DOWNLOAD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
      <Section
        id="property-tour"
        className={`${content.onlineBrochure?.length === 0 ? "bg-white" : ""} ${
          content.productOffering.oferrings?.length > 0 ? "!bg-candy-blue" : ""
        } bg-candy-blue pb-[102px] pt-[102px] tablet:pb-[60px] tablet:pt-[60px]`}
      >
        <div className="flex w-full items-center lg:flex-col">
          <div className="mr-[30px] w-1/3 text-custom-black-2 tablet:!pb-[30px] lg:mr-[0px] lg:w-full lg:pb-[50px]">
            <div>
              <h2 className="pb-[11px] text-[35px] font-[400] leading-[43px] text-black">
                {content.SeeAndTour?.title || "See and tour our property"}
              </h2>
              <p>
                {content.SeeAndTour?.description ||
                  "Discover the beauty of our homes and experience the Aspire lifestyle first-hand. Your journey to upgraded and vibrant living starts here!"}
              </p>
            </div>
            <button
              onClick={() => methods.setInquireTo(content)}
              className="mt-[50px] flex h-[67px] w-[222px] items-center justify-center border-[1px] border-aqua-blue bg-aqua-blue text-[16px] tracking-[1.6px] text-white transition-all duration-[0.3s] ease-in-out hover:!bg-transparent hover:!text-aqua-blue sm:h-[50px] sm:w-[180px] sm:py-[0px]"
            >
              SCHEDULE A TRIP
            </button>
          </div>
          <div className="ml-[30px] flex w-2/3 items-end justify-end lg:ml-[0px] lg:w-full lg:justify-center">
            {content.SeeAndTour?.Images?.length > 0 && (
              <button
                onClick={() =>
                  setZoomedImg(
                    content.SeeAndTour?.Images?.map((img: any) => img.image)
                  )
                }
              >
                <img
                  className="z-10"
                  src={content.SeeAndTour?.Images[0]?.image?.url}
                  alt={content.SeeAndTour?.Images[0]?.image?.alt}
                  width={830}
                />
              </button>
            )}
            {content.SeeAndTour?.Images?.length === 0 && (
              <img
                className="z-10"
                src="/images/property-img.png"
                alt="Family"
                width={830}
              />
            )}
          </div>
        </div>
      </Section>
      <Section
        id="preference"
        className="preference-section relative mb-[-1px] flex h-[637px] items-center justify-center bg-[url('/images/preference-bg.png')] bg-cover bg-center tablet:h-[600px]"
      >
        <div className="relative z-10 mx-auto w-full max-w-[635px]">
          <div className="text-center">
            <div className="mb-[50px] leading-[30px] text-white tablet:!mb-[50px]">
              <h2 className="pb-[21px] text-[35px] font-[400] leading-[43px] text-white">
                {content.projectFooter?.title ||
                  "Does this home fit your preference?"}
              </h2>
              <p>
                {content.projectFooter?.description ||
                  "Skip the guesswork! Explore our home loan calculator to see if your income meets the requirement or to know the amount of loan you need. Compute it here."}
              </p>
            </div>
            <a
              href={
                content.projectFooter?.callToActionLink ??
                "https://beta.filinvestland.com/buyers/home-loan-calculator"
              }
              target="_blank"
              className="mx-auto flex h-[67px] w-[222px] cursor-pointer items-center justify-center border-[1px] border-aqua-blue bg-aqua-blue text-[16px] uppercase tracking-[1.6px] text-white transition-all duration-[0.3s] ease-in-out hover:!border-white hover:!bg-transparent"
            >
              {content.projectFooter?.callToActionText}
            </a>
          </div>
        </div>
      </Section>
      {zoomedImg.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[25] flex items-center justify-center bg-black/80">
          <ClickAwayListener onClickAway={() => setZoomedImg([])}>
            <div className="flex w-full max-w-[1200px] items-center justify-center overflow-hidden">
              <ReactSlider
                {...{
                  dots: false,
                  infinite: true,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  fade: true,
                }}
                className="w-full"
              >
                {zoomedImg.map((img: any) => (
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="h-[90vh] object-contain"
                    onClick={() => setZoomedImg([])}
                  />
                ))}
              </ReactSlider>
            </div>
          </ClickAwayListener>
        </div>
      )}
    </Page>
  );
};

export default Project;
