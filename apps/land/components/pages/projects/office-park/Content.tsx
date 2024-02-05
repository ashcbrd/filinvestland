"use client";
import React from "react";
import Image from "next/image";
import Room from "@/components/svg/Room";
import Baseball from "@/components/svg/Baseball";
import Flag from "@/components/svg/Flag";
import MainHeader from "@/components/header/MainHeader";
import useGetScreen from "../../../../hooks/useGetScreen";
import { Project } from "shared-types";
import Fade from "@/components/animation/Fade";
import FadeDown from "@/components/animation/FadeDown";
import { useParams } from "next/navigation";
import Link from "next/link";

const Content = ({ project }: { project: Project }) => {
  const { width } = useGetScreen();
  const params = useParams();
  return (
    <>
      <MainHeader
        bgUrl={
          width >= 767 || width == 0
            ? "/blue-header-bg-2.png"
            : "/northgate-banner-small.png"
        }
        isBgClipped={false}
      />
      <section className="-mt-72 mb-16 lg:mx-9 xl:mx-16 2xl:mx-44 2xl:-mt-[14rem]">
        <div className="relative flex justify-center">
          <Fade>
            <Image
              src={project.coverImage?.url ? project.coverImage?.url : ""}
              width={1574}
              height={882}
              alt={project.coverImage?.alt ? project.coverImage?.alt : ""}
              className="z-10 hidden md:block"
            />
          </Fade>
          <div className="absolute -bottom-[24rem] z-0 flex max-h-[200px] max-w-[200px] items-center justify-center rounded-full bg-white p-12 shadow-md  md:-bottom-[7rem] md:z-50 md:shadow-none">
            {project.logo?.url && (
              <Fade>
                <Image
                  className="h-40 w-auto items-start object-contain"
                  src={`${project.logo.url}`}
                  width={project.logo.width ?? 100}
                  height={170}
                  alt={project.logo.alt}
                />
              </Fade>
            )}
          </div>
        </div>
        <div className="mx-6 mt-[27rem] divide-y divide-gainsboro md:mx-16 md:mt-44">
          <div className="py-9">
            <Fade>
              <h2 className="text-4xl font-bold text-jet">{project.title}</h2>
            </Fade>
            <FadeDown>
              <p className="mt-6 text-dim-gray">{project.description}</p>
            </FadeDown>
          </div>
          <div className="flex flex-col gap-4 py-9">
            <div className="flex items-center gap-6">
              <Room />
              <FadeDown>
                <h3 className="text-2xl font-bold text-dark-cornflower-blue">
                  Sustainability Features
                </h3>
              </FadeDown>
            </div>
            <p className="font-bold text-jet">
              {project.sustainabilityFeatureTitle}
            </p>
            <p className="text-dim-gray">
              {project.sustainabilityFeatureDescription}
            </p>
            <ul className="ml-6 list-[square] text-dim-gray">
              {project.sustainabilityFeatureItemLists?.map((item) => {
                return (
                  <li className="text-2xl text-[#163E82]">
                    <p className="text-base text-dim-gray">{item.item}</p>
                  </li>
                );
              })}
            </ul>
            {project.sustainabilityFeatureTitleDescription?.map((item) => {
              return (
                <>
                  <p className="mt-4 font-bold text-jet">{item.title}</p>
                  <p className="text-dim-gray">{item.description}</p>
                </>
              );
            })}
          </div>
          <div className="flex flex-col gap-4 py-9">
            <div className="flex items-center gap-6">
              <Baseball />
              <FadeDown>
                <h3 className="text-2xl font-bold text-dark-cornflower-blue">
                  Amenities
                </h3>
              </FadeDown>
            </div>
            {project.amenitiesTitleDescription?.map((item) => {
              return (
                <>
                  <p className="mt-4 font-bold text-jet">{item.title}</p>
                  {item.description && (
                    <p className="text-dim-gray">{item.description}</p>
                  )}
                </>
              );
            })}
          </div>
          <div className="flex flex-col gap-4 py-9">
            <div className="flex items-center gap-6">
              <Flag />
              <FadeDown>
                <h3 className="text-2xl font-bold text-dark-cornflower-blue">
                  Location
                </h3>
              </FadeDown>
            </div>
            <p className="text-dim-gray">{project.locationDescription}</p>
            <ul className="ml-6 flex list-[square] flex-col gap-4 text-dim-gray">
              {project.locationItemLists.map((item) => {
                return (
                  <li className="text-2xl text-[#163E82]">
                    <p className="text-base text-dim-gray">{item.item}</p>
                  </li>
                );
              })}
            </ul>
          </div>
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
              className="mt-8 flex w-full justify-center rounded bg-blue px-4 py-4 text-lg font-bold text-white"
            >
              Reserve Now
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default Content;
