"use client";

import React from "react";
import PressReleaseBlock from "./PressReleaseBlock";
import MainHeader from "@/components/header/MainHeader";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import Tabs from "@/components/header/Tabs";
import { getHeaderCover } from "@/helpers/getRequest";

const Content = async ({ content }: any) => {
  const header = await getHeaderCover(`/api/pages/654e514c33d5b0bdd2f2c753`);
  return (
    <>
      <MainHeader
        header={header.content[0]}
        title="Press Release"
        bgUrl={header?.content[0]?.coverImage?.url}
      />
      <PressReleaseBlock content={content} />
      <div className="p-4 lg:p-16">
        <PageNextPrevButton content={content} />
      </div>
    </>
  );
};

export default Content;
