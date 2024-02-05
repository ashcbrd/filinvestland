import React from "react";
import MainHeader from "@/components/header/MainHeader";
import { serializeRichText } from "@/helpers/serializeRichText";

const Content = ({ content }: any) => {
  const header = content?.content?.find(
    (item: any) => item.blockType === "header"
  );
  const richText = content?.content?.find(
    (item: any) => item.blockType === "terms-text"
  );
  return (
    <>
      <MainHeader title={header.title} bgUrl={header.coverImage.url} />
      <section className="mx-3 mb-28 mt-16 flex flex-col gap-6 px-6 lg:mx-9 xl:mx-16 2xl:mx-44">
        <h2 className="text-jet text-4xl font-bold">{richText.title}</h2>
        {serializeRichText(richText.Terms)}
      </section>
    </>
  );
};

export default Content;
