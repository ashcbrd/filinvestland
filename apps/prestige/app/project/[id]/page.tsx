import React from "react";
// import Subtitle from "@/app/components/typography/subtitle";
import Link from "next/link";
import { Typography } from "@/app/components/typography/typography";
import Button from "@/app/components/general/button";
import qs from "qs";
import { VirtualTour } from "./sections/virtualtour";
import { InvestorsConcerge } from "@/app/components/general/investorsconcerge";
import ClientButtonNavigator from "./components/ClientButton";
import Banner from "@/app/components/carousel/banner";
import { notFound } from "next/navigation";
import { serializeRichText } from "@/app/utils/serializeRichText";

export const generateMetadata = async ({ params }: any) => {
  const query = qs.stringify(
    {
      where: { slug: { equals: params.id } },
    },
    {
      addQueryPrefix: true,
    }
  );

  const project = await fetch(
    `${process.env.CMS_URL}/api/prestige-projects/${query}`
  );
  const projectData = await project.json();

  return {
    title: `${projectData.docs[0]?.meta?.title}`,
    description: `${projectData.docs[0]?.meta?.description}`,
  };
};

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
    `${process.env.CMS_URL}/api/prestige-projects/${query}`
  );
  const investor = fetch(
    `${process.env.CMS_URL}/api/prestige-pages/64d34fc0281bd2de8791c8b4`,
    { cache: "no-store" }
  );

  const project = await projectQuery.json();

  if (project?.totalDocs === 0) {
    notFound();
  }
  const req = await Promise.all([investor]);

  return {
    content: project,
    investor: (await req[0].json()) as any,
  };
}

async function SingleProject({ params }: any) {
  const req = await getData(params.id);
  const content = req.content.docs[0];

  const investor = {
    page: req.investor.content,
  };

  return (
    <>
      <Banner opacity="bg-[#130A01]/80" sliderBanner project={content} />

      <section className="min-h-fit w-full bg-[#F4EBD0] px-8 py-16 sm:py-20 md:px-12 md:py-[100px]">
        <div className="mx-auto grid h-auto w-full max-w-[1650px] grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="flex flex-col items-center space-y-8 text-center lg:items-start lg:text-left">
            <div className="flex h-[162px] w-full max-w-[396px] items-center justify-center bg-white shadow-lg">
              <img
                alt="Banner"
                src={content?.logo.url || ""}
                className="h-auto w-full max-w-[240px] object-contain"
              />
            </div>
            <div className="flex w-full max-w-[550px]">
              <div className="grow border-r border-[#543416] px-2">
                <Typography
                  size="16"
                  color="dark"
                  text={"Address"}
                  className="!text-sm !text-[#878787] sm:!text-base"
                />
                <Typography
                  size="16"
                  color="dark"
                  className="!text-sm sm:!text-base"
                  text={
                    content?.location.locationGroup.title +
                    ", " +
                    content?.location.title
                  }
                />
              </div>
              <div className="grow border-r border-[#543416] px-2 lg:pl-6">
                <Typography
                  size="16"
                  color="dark"
                  text={"Unit Type"}
                  className="!text-sm !text-[#878787] sm:!text-base"
                />
                <Typography
                  size="16"
                  color="dark"
                  className="!text-sm sm:!text-base"
                  text={content?.propertyDetails.numberOfBedrooms + "BR"}
                />
              </div>
              <div className="grow px-2 lg:pl-6">
                <Typography
                  size="16"
                  color="dark"
                  text={"Status"}
                  className="!text-sm !text-[#878787] sm:!text-base"
                />
                <Typography
                  size="16"
                  color="dark"
                  text={"Pre-Selling"}
                  className="!text-sm sm:!text-base"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex max-h-9 w-[160px] items-center rounded-full border border-[#261119] px-6 py-2 text-center">
                <img
                  src={"/assets/images/link.png"}
                  alt="Banner"
                  className="mr-2 h-[16px] w-[16px]"
                />
                <p className="text-[12px] font-[500] uppercase">
                  {content?.propertyType.title}
                </p>
              </div>
              <ClientButtonNavigator
                path={`/inquire?project=${content?.title}`}
                label="Reserve Now"
              />
            </div>
            <Typography
              size="heading2"
              color="dark"
              font="cormorant"
              text={content?.title}
              className="font-medium uppercase leading-none"
            />
            <div className="flex flex-1 flex-col justify-center gap-4">
              {serializeRichText(content?.descriptiveOverview, true)}
            </div>
          </div>
        </div>
      </section>

      {content?.parralaxGallery?.[0]?.image?.url && (
        <section
          className="relative h-auto min-h-screen  w-full bg-cover bg-fixed bg-center bg-no-repeat transition-all after:absolute after:inset-0 after:bg-[#130A01]/10 after:content-[''] sm:h-auto lg:h-[764px] lg:min-h-fit xl:h-[923px]"
          style={{
            backgroundImage: `url("${content?.parralaxGallery?.[0]?.image?.url}")`,
          }}
        >
          {/* <img
          src={"/assets/images/property/singleproj2.png"}
          alt="Banner"
          className="h-full w-full object-cover"
        /> */}
        </section>
      )}
      {content?.siteDevelopmentPlan?.title && (
        <section className="min-h-fit w-full bg-[#F4EBD0] px-8 py-16 sm:py-20 md:px-12 md:py-[100px]">
          <div className="mx-auto grid h-auto w-full max-w-[1650px] grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="flex items-center justify-center">
              <img
                src={
                  content?.siteDevelopmentPlan?.floorPlanImages[0]
                    ?.floorPlanImage.url || ""
                }
                alt="Banner"
                className="h-[400px]"
              />
            </div>
            <div className="space-y-4 sm:space-y-8">
              <Typography
                size="heading2"
                color="dark"
                font="cormorant"
                className="font-medium"
                text={content?.siteDevelopmentPlan.title}
              />
              <Typography
                size="20"
                color="dark"
                className="whitespace-pre-wrap"
                text={content?.siteDevelopmentPlan.description}
              />
              <div className="!mt-20 flex w-full max-w-[350px]">
                <div className="grow border-r border-[#878787] px-2">
                  <Typography
                    size="16"
                    color="dark"
                    text={"Unit Size"}
                    className="!text-sm !text-[#878787] sm:!text-base"
                  />
                  <Typography
                    size="16"
                    color="dark"
                    text={"1,437 sqm"}
                    className="!text-sm sm:!text-base"
                  />
                </div>

                <div className="grow px-2 pl-6">
                  <Typography
                    size="16"
                    color="dark"
                    text={"Address"}
                    className="!text-sm !text-[#878787] sm:!text-base"
                  />
                  <Typography
                    size="16"
                    color="dark"
                    className="!text-sm sm:!text-base"
                    text={
                      content?.subLocationTwo?.title +
                      ", " +
                      content?.location.title
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {content?.parralaxGallery?.[1]?.image?.url && (
        <section
          className="relative h-auto min-h-screen  w-full bg-cover bg-fixed bg-center bg-no-repeat transition-all after:absolute after:inset-0 after:bg-[#130A01]/10 after:content-[''] sm:h-auto lg:h-[764px] lg:min-h-fit xl:h-[830px]"
          style={{
            backgroundImage: `url("${content?.parralaxGallery?.[1]?.image?.url}")`,
          }}
        >
          {/* <img
          alt="Banner"
          src={"/assets/images/singleproj1.png"}
          className="h-full w-full object-cover"
        /> */}
        </section>
      )}

      <VirtualTour data={content} />

      <InvestorsConcerge data={investor} />

      {/* <section className="min-h-fit w-full bg-[#F4EBD0] px-8 py-16 sm:py-20 md:px-12 md:py-[100px]">
        <div className="mx-auto h-auto w-full max-w-[1650px] space-y-20">
          <div className="grid grid-cols-1 gap-y-4 md:gap-y-8">
            <Typography
              size="heading2"
              color="dark"
              font="cormorant"
              text={"Virtual Tour"}
              className="font-medium"
            />
            <Typography
              size="20"
              color="dark"
              text={content?.virtualTour.description}
            />
            <img
              src={"/assets/images/property/virtualbg.png"}
              className="h-full w-full object-cover"
              alt="Banner"
            />
            <a href="/" className="inline-flex">
              <Typography
                size="20"
                color="dark"
                text={"View Virtual Tour"}
                className="cursor-pointer font-bold underline md:!text-2xl"
              />
            </a>
          </div>
          {content?.ViewFloorplans.length > 0 && (
            <div className="grid grid-cols-1 gap-y-4 md:gap-y-8">
              <Typography
                size="heading2"
                color="dark"
                font="cormorant"
                text={"View Floor Plans"}
                className="font-medium"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-4 md:gap-8">
                {content?.ViewFloorplans &&
                  content?.ViewFloorplans.map((item: any, index: any) => (
                    <div key={index} className="p-4 sm:p-0">
                      <img
                        src={item.floorPlanImage.url}
                        alt={`Image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section> */}

      {/* <section
        className="relative flex min-h-[640px] w-full items-center justify-center bg-cover bg-top bg-no-repeat px-8 py-16 transition-all before:absolute before:inset-0 before:bg-[#130A01]/70 before:content-[''] sm:py-20 md:px-12 md:py-[100px]"
        style={{
          backgroundImage: `url(${content?.projectFooter?.FooterCover?.url})`,
        }}
      >
        <div className="relative w-full max-w-[700px] space-y-4 text-center">
          <Typography
            size="heading2"
            color="light"
            font="cormorant"
            className="text-3xl md:!text-[40px] font-medium"
            text={content?.projectFooter.title}
          />
          <Typography
            size="16"
            color="light"
            className="text-base font-thin opacity-80 md:!text-lg"
            text={content?.projectFooter.description}
          />
          <Link href={"/portfolio"} className="!mt-12 inline-block">
            <Button label={content?.projectFooter.callToActionText} />
          </Link>
        </div>
      </section> */}
    </>
  );
}

export default SingleProject;
