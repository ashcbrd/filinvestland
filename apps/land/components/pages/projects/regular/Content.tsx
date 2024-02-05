"use client";

import React from "react";
import MainHeader from "@/components/header/MainHeader";
import Image from "next/image";
import RulerPencil from "@/components/svg/RulerPencil";
import MapPinOutline from "@/components/svg/MapPinOutline";
import HomeOutline from "@/components/svg/HomeOutline";
import BorderButton from "@/components/button/BorderButton";
import { serializeRichText } from "@/helpers/serializeRichText";
import { Project } from "shared-types";
import CONTACT_US_ROUTES from "@/helpers/routes/contactUs";
import Link from "next/link";
import DetailsTab from "./DetailsTab";
import ImageCarousel from "./ImageCarousel";

import "../../../../styles/project_regular.css";
import Peso from "@/components/svg/Peso";
import Fade from "@/components/animation/Fade";
import FadeDown from "@/components/animation/FadeDown";
import FadeRight from "@/components/animation/FadeRight";
import FadeLeft from "@/components/animation/FadeLeft";
import Bed from "@/components/svg/Bed";
import { defaultCoverImage } from "@/helpers/constants";
import { useParams } from "next/navigation";

const Content = ({ project }: { project: Project }) => {
  const params = useParams();
  const checkValue = (field: any) => {
    try {
      if (field.length !== 1) {
        return true;
      } else if (field[0].children[0].text) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="overflow-y-hidden">
      <MainHeader
        title={project.title}
        bgUrl={`${project?.headerImage?.url}`}
        isBgClipped={false}
      />
      <div className="flex items-center gap-3 bg-alice-blue px-2 py-4">
        <p className="text-dim-gray">Projects</p>
        <p className="text-dim-gray">/</p>
        <p className="text-dim-gray">{project.title}</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-12 bg-cultured px-9 py-6 lg:flex-row lg:gap-0 2xl:px-16">
        <div className="flex p-5">
          {project.logo?.url && (
            <Image
              className="h-40 w-auto items-start object-contain"
              src={project.logo.url || ""}
              width={project.logo.width ?? 100}
              height={170}
              alt={project.logo.alt}
            />
          )}
        </div>
        <div className="flex flex-1 flex-col justify-end gap-6 md:flex-row md:items-center">
          <div className="flex gap-4">
            <div className="max-h-[60px] rounded-full bg-royal-dark-blue p-3">
              <HomeOutline color="#ffffff" className="h-8 w-8" />
            </div>
            <div className="flex flex-col justify-center">
              <Fade>
                <p className="text-lg text-jet">PROJECT TYPE</p>
              </Fade>
              <FadeDown>
                <p className="text-lg font-bold text-dark-cornflower-blue">
                  {project?.projectType?.title}
                </p>
              </FadeDown>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="max-h-[60px] rounded-full bg-royal-dark-blue p-3">
              <MapPinOutline color="#ffffff" className="h-8 w-8" />
            </div>
            <div className="flex flex-col justify-center">
              <Fade>
                <p className="text-lg text-jet">LOCATION</p>
              </Fade>
              <FadeDown>
                <p className="text-lg font-bold text-dark-cornflower-blue">
                  {project?.location?.title}
                </p>
              </FadeDown>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="max-h-[60px] rounded-full bg-royal-dark-blue p-3">
              <Peso color="#ffffff" classes="h-8 w-8" />
            </div>
            <div className="flex flex-col justify-center">
              <Fade>
                <p className="text-lg text-jet">PRICE RANGE</p>
              </Fade>
              <FadeDown>
                <p className="text-lg font-bold text-dark-cornflower-blue">
                  PHP{" "}
                  {new Intl.NumberFormat("en-US").format(Number(project.price))}
                </p>
              </FadeDown>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="max-h-[60px] rounded-full bg-royal-dark-blue p-4">
              <RulerPencil color="#ffffff" className="h-7 w-7" />
            </div>
            <div className="flex flex-col justify-center">
              <Fade>
                <p className="text-lg text-jet">SIZE</p>
              </Fade>
              <FadeDown>
                <p className="text-lg font-bold text-dark-cornflower-blue">
                  {new Intl.NumberFormat("en-US").format(Number(project.size))}{" "}
                  sqm
                </p>
              </FadeDown>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="max-h-[60px] rounded-full bg-royal-dark-blue p-4">
              <Bed color="#ffffff" className="h-7 w-7" />
            </div>
            <div className="flex flex-col justify-center">
              <Fade>
                <p className="text-lg text-jet">NO. OF BEDROOMS</p>
              </Fade>
              <FadeDown>
                <p className="text-lg font-bold text-dark-cornflower-blue">
                  {new Intl.NumberFormat("en-US").format(
                    Number(project.numberOfBedrooms)
                  )}
                </p>
              </FadeDown>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 px-9 py-16 2xl:px-16">
        <div className="w-full">
          <Fade>
            <ImageCarousel project={project} />
          </Fade>
        </div>
        <div className="w-full  lg:w-[100%] ">
          <FadeRight>
            <h2 className="text-4xl font-bold text-dark-cornflower-blue">
              Overview
            </h2>
          </FadeRight>
          <FadeRight>
            <div className="mt-9">{serializeRichText(project.overview)}</div>
          </FadeRight>
          <Fade>
            <DetailsTab project={project} />
          </Fade>
          {params?.projectSlug && (
            <Link
              href={{
                pathname: "/contact-us",
                query: {
                  ...(params?.projectSlug && {
                    project: params?.projectSlug,
                  }),
                },
              }}
              className="mt-8 flex w-1/4 justify-center rounded bg-blue px-4 py-4 text-lg font-bold text-white"
            >
              Reserve Now
            </Link>
          )}
        </div>
      </div>

      {project?.coordinates?.latitude && project?.coordinates?.longitude && (
        <Fade>
          <div className="mt-16 flex w-full items-start justify-start bg-cover bg-center">
            <iframe
              className="h-[80vh] w-full"
              id="gmap_canvas"
              src={`https://maps.google.com/maps?q=${project.coordinates.latitude},${project.coordinates.longitude}&z=14&t=&output=embed&markers=color:red%7Clabel:%7C${project.coordinates.latitude},${project.coordinates.longitude}`}
            />
          </div>
        </Fade>
      )}

      {checkValue(project.floorPlan) && (
        // flex
        <div className="mt-16 flex w-full p-16">
          <div className="flex-1 px-16">
            <FadeLeft>
              <h2 className="text-4xl font-bold text-dark-cornflower-blue">
                Site Development Plan
              </h2>
            </FadeLeft>
            <FadeLeft>
              <div className="mt-8">{serializeRichText(project.floorPlan)}</div>
            </FadeLeft>
          </div>
          <div className="flex-1 border">
            <Fade>
              <Image
                src={project?.floorPlanImage?.url || defaultCoverImage}
                width={project?.floorPlanImage?.width ?? 350}
                height={project?.floorPlanImage?.height ?? 350}
                alt={project?.floorPlanImage?.alt || "alt"}
                className="w-full object-cover"
              />
            </Fade>
          </div>
        </div>
      )}

      {checkValue(project.landmarks) && (
        <div className="mt-16 flex w-full p-16">
          <div className="flex-1 px-16">
            <FadeLeft>
              <h2 className="text-4xl font-bold text-dark-cornflower-blue">
                Landmarks
              </h2>
            </FadeLeft>
            <FadeLeft>
              <div className="mt-8">{serializeRichText(project.landmarks)}</div>
            </FadeLeft>
          </div>
        </div>
      )}

      <Fade>
        <div className="flex flex-col items-center gap-12 bg-[url('/projects-bottom-bg.png')] px-16 py-12 lg:flex-row lg:gap-0 lg:px-28 2xl:px-44">
          <div className="flex-1">
            <h3 className="text-center text-3xl text-white lg:text-left">
              Looking To Buy A New Property?
            </h3>
            <p className="mt-2 text-center text-white lg:text-left">{`Have any questions? We'd love to hear from you.`}</p>
          </div>
          <div>
            <Link href={`${CONTACT_US_ROUTES.url}`}>
              <BorderButton buttonText="Contact Us" />
            </Link>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Content;
