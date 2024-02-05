"use client";
import Fade from "@/components/animation/Fade";
import MainHeader from "@/components/header/MainHeader";
import Projects from "@/components/list/Projects";
import Bath from "@/components/svg/Bath";
import Bed from "@/components/svg/Bed";
import Elevator from "@/components/svg/Elevator";
import Facebook from "@/components/svg/Facebook";
import Flag from "@/components/svg/Flag";
import InputPower from "@/components/svg/InputPower";
import Lightning from "@/components/svg/Lightning";
import LinkedIn from "@/components/svg/LinkedIn";
import PersonOutline from "@/components/svg/PersonOutline";
import PhoneHandset from "@/components/svg/PhoneHandset";
import RulerPencil from "@/components/svg/RulerPencil";
import { defaultCoverImage } from "@/helpers/constants";
import CONTACT_US_ROUTES from "@/helpers/routes/contactUs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Project } from "shared-types";
import ImageCarousel from "../regular/ImageCarousel";
import { useParams } from "next/navigation";

const Content = ({ project }: { project: Project }) => {
  const params = useParams();
  const relatedOffices = [] as Project[];
  if (project?.relatedOffice1) relatedOffices.push(project.relatedOffice1);
  if (project?.relatedOffice2) relatedOffices.push(project.relatedOffice2);
  if (project?.relatedOffice3) relatedOffices.push(project.relatedOffice3);

  return (
    <section>
      <MainHeader
        bgUrl={project?.headerImage?.url || defaultCoverImage}
        isBgClipped={false}
      />
      <div className="border-b-[1px] border-gainsboro">
        <div className="mx-9 my-4 flex flex-col gap-9 lg:flex-row xl:mx-16 2xl:mx-44">
          <div className="flex flex-1 items-center gap-4">
            {project.logo?.url && (
              <Image
                src={project.logo?.url ? project.logo?.url : ""}
                width={128}
                height={25}
                alt={project.logo?.alt}
              />
            )}
            <h3 className="text-2xl font-bold text-jet">{project?.title}</h3>
          </div>
          <div className="flex flex-1 flex-col items-center divide-gainsboro md:flex-row md:divide-x">
            <div className="flex items-center gap-6 px-5 py-4">
              <RulerPencil />
              <h3 className="whitespace-nowrap text-xl text-jet">
                {project?.size} sq ft
              </h3>
            </div>
            <div className="flex items-center gap-6 px-5 py-4">
              <Bed />
              <h3 className="whitespace-nowrap text-xl text-jet">
                {project?.numberOfStaffRoom} Staff Rooms
              </h3>
            </div>
            <div className="flex items-center gap-6 px-5 py-4">
              <Bath />
              <h3 className="whitespace-nowrap text-xl text-jet">
                {project?.numberOfBathrooms} Bathrooms
              </h3>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center md:items-start md:justify-start lg:items-center lg:justify-center">
            <Link href={CONTACT_US_ROUTES?.url}>
              <button className="delay-50 bg-blue px-9 py-5 text-white transition hover:opacity-90 focus:bg-blue-ryb">
                REQUEST A SHOWING
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-gainsboro pb-24 pt-16">
        <div className="mx-9 flex flex-col gap-16 lg:flex-row xl:mx-16 2xl:mx-44">
          <div className="flex flex-1 flex-col gap-6 divide-y divide-gainsboro">
            <div className="flex flex-col gap-14 lg:flex-row ">
              <div>
                <div className="flex flex-col gap-12 pb-9 md:flex-row md:items-center md:gap-0">
                  <div className="flex flex-1 flex-col gap-3">
                    <Flag classes="w-5 h-5" />
                    <h3 className="mr-3 mt-2 text-2xl font-bold text-jet">
                      {project?.address1}
                    </h3>
                    <p className="text-sm text-jet">{project?.address2}</p>
                  </div>
                  <div className="flex-none">
                    <div className="delay-50 relative bg-blue px-3 py-3 text-white transition focus:bg-blue-ryb">
                      {project?.status?.title ?? "undefined"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-24 py-9 md:flex-row">
                  <div className="flex-none">
                    <h3 className="text-xl font-bold text-jet">
                      Leasable Area
                    </h3>
                  </div>
                  <div className="flex flex-1 gap-12">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-52 flex-none">
                          <p className="whitespace-nowrap text-lg text-dim-gray">
                            Floor:
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg text-jet">{project?.floor}</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row">
                        <div className="w-52 flex-none">
                          <p className="whitespace-nowrap text-lg text-dim-gray">
                            Wall:
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg text-jet">{project?.wall}</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row">
                        <div className="w-52 flex-none">
                          <p className="whitespace-nowrap text-lg text-dim-gray">
                            Ceiling:
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg text-jet">{project?.ceiling}</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row">
                        <div className="w-52 flex-none">
                          <p className="whitespace-nowrap text-lg text-dim-gray">
                            Height Clearance:
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg text-jet">
                            {project?.heightClearance}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row">
                        <div className="w-52 flex-none">
                          <p className="whitespace-nowrap text-lg text-dim-gray">
                            VRF:
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg text-jet">{project?.VRF}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-row items-center justify-center lg:w-1/3 lg:flex-none lg:items-start 2xl:w-1/3">
                <div className="w-full max-w-xl bg-white px-9 pb-8 pt-9 shadow-xl lg:min-w-[400px] ">
                  <div className="flex items-center gap-6">
                    <Image
                      src={
                        project.managerPhoto?.url
                          ? project.managerPhoto?.url
                          : ""
                      }
                      width={74}
                      height={74}
                      alt={project?.managerPhoto?.alt || "alt"}
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-jet">
                        {project?.managerName}
                      </h3>
                      <p className="font-bold text-jet">Manager</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-6">
                    <p>Phone:</p>
                    <p className="text-xl font-bold text-blue-ryb">
                      {project?.managerPhone}
                    </p>
                  </div>
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                    <p>Email:</p>
                    <p className="break-words text-xl font-bold">
                      {project?.managerEmail}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col gap-4">
                    <p className=" font-bold lg:text-xl">Connect with us:</p>
                    <div className="flex gap-4">
                      <Link href={`${project?.managerFacebookLink}`}>
                        <Facebook color="#DBDBDB" />
                      </Link>
                      <Link href={`${project?.managerLinkedinLink}`}>
                        <LinkedIn color="#DBDBDB" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-24 py-9 md:flex-row">
                <div className="flex-none">
                  <h3 className="text-xl font-bold text-jet">Base Building</h3>
                </div>
                <div className="flex flex-1 gap-12">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-52 flex-none">
                        <Elevator />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg text-jet">{project?.elevator}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                      <div className="w-52 flex-none">
                        <PhoneHandset />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg text-jet">{project?.telephone}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                      <div className="w-52 flex-none">
                        <InputPower />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg text-jet">
                          {project?.powerInput}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                      <div className="w-52 flex-none">
                        <Lightning />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg text-jet">
                          {project?.powerOutput}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                      <div className="w-52 flex-none">
                        <PersonOutline />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg text-jet">{project?.people}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-8 md:flex-col lg:flex-row">
                <div className="w-full">
                  <Fade>
                    <ImageCarousel project={project} />
                  </Fade>
                </div>
                <div className="mt-6 w-full lg:mt-0 lg:w-2/5">
                  <div className="flex-none">
                    <h3 className="text-xl font-bold text-jet">Description</h3>
                  </div>
                  <div className="flex flex-1 flex-col gap-8">
                    <p className="text-lg text-dim-gray">
                      {project?.description}
                    </p>
                  </div>
                </div>
              </div>
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
            <div className="flex flex-col gap-6 pt-9">
              <div className="flex-none">
                <h3 className="text-xl font-bold text-jet">Location</h3>
              </div>
              <div className="flex flex-1 flex-col gap-8">
                <p className="text-sm text-jet">
                  {project?.address1} {project?.address2}
                </p>
                {project?.coordinates?.latitude &&
                  project.coordinates.longitude && (
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-9 py-24 xl:mx-16 2xl:mx-44">
        <h3 className="text-center text-4xl font-bold text-jet">
          Other Offices
        </h3>
        <Projects projects={relatedOffices} />
      </div>
    </section>
  );
};

export default Content;
