"use client";
import Image from "next/image";
import React from "react";
import ArrowRight from "@/components/svg/ArrowRight";
import MainHeader from "@/components/header/MainHeader";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import Link from "next/link";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import Fade from "@/components/animation/Fade";

type PresentationCardProps = {
  imageSrc: string;
  imageAlt: string;
  cardTitle: string;
  presentationLink: string;
};

const PresentationCard = ({
  imageSrc,
  imageAlt,
  cardTitle,
  presentationLink,
}: PresentationCardProps) => {
  return (
    <Fade>
      <div className="border border-dark-cornflower-blue">
        <Image
          src={imageSrc}
          width={1014}
          height={794}
          alt={imageAlt}
          className="h-[20rem] object-fill"
        />
        <div className="flex h-[5rem] items-center gap-4 bg-dark-cornflower-blue pl-[30px] pr-6 hover:opacity-90">
          <Link
            href={`https://docs.google.com/viewerng/viewer?url=${presentationLink}`}
            target="_blank"
            title={cardTitle}
            className="line-clamp-3 flex-1 text-base font-bold text-white md:text-base lg:text-lg xl:text-xl"
          >
            {cardTitle}
          </Link>
          <ArrowRight />
        </div>
      </div>
    </Fade>
  );
};

const Content = ({ content }: any) => {
  const header = content?.content?.find(
    (item: any) => item.blockType === "header"
  );

  const presentations: any[] = content?.content?.find(
    (item: any) => item.blockType === "presentations"
  ).presentation;

  const breadcrumbsItems = header?.breadcrumbs.map(
    (tab: any, index: number) => {
      return {
        title: tab.link.label,
        ...(index + 1 < header?.breadcrumbs?.length && {
          link: tab.link.url,
        }),
      };
    }
  );

  const breadcrumbs = <Breadcrumbs items={breadcrumbsItems} />;
  return (
    <>
      <MainHeader
        title={header.title}
        breadcrumbs={breadcrumbs}
        bgUrl={header.coverImage.url}
      />
      <section className="mb-28 mt-16 flex flex-col gap-6">
        <div className="mx-3 grid gap-6 sm:grid-cols-2 lg:mx-9 lg:grid-cols-3 xl:mx-16 2xl:mx-44">
          {presentations.map((presentation) => {
            return (
              <PresentationCard
                key={presentation.id}
                imageSrc={presentation?.image?.url || ""}
                imageAlt={presentation?.image?.alt || ""}
                cardTitle={presentation.title}
                presentationLink={presentation.presentationLink}
              />
            );
          })}
        </div>
      </section>
      <div className="p-4 lg:p-16">
        <PageNextPrevButton content={content} />
      </div>
    </>
  );
};

export default Content;
