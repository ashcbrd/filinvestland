import React, { Fragment } from "react";
import escapeHTML from "escape-html";
import { Text } from "slate";
import Link from "next/link";
import Image from "next/image";

interface ISerializeOptions {
  isFromNewsPage: boolean;
}

export const serializeRichText = (
  children: any,
  userCodeAsHTML: boolean = false,
  options: ISerializeOptions = {
    isFromNewsPage: false,
  }
) =>
  children?.map((node: any, i: number) => {
    //  hides date content from News Page since it is moved to banner
    if (options.isFromNewsPage && node?.children[0]?.text?.includes("Date")) {
      return <></>;
    }
    if (Text.isText(node)) {
      let text = (
        <span
          dangerouslySetInnerHTML={{
            __html: escapeHTML(node.text).replace(/\n/g, "<br>"),
          }}
          key={i}
        />
      );
      // @ts-ignore
      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }
      // @ts-ignore
      if (node.code) {
        if (userCodeAsHTML) text = <div key={i} dangerouslySetInnerHTML={{ __html: node.text }} />;
        else text = <code key={i}>{text}</code>;
      }
      // @ts-ignore
      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      // @ts-ignore
      if (node.underline) {
        text = <u key={i}>{text}</u>;
      }

      // Handle other leaf types here...

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case "h1":
        return (
          <h1 key={i} className="font-quicksand text-center md:text-start font-bold text-[22px] md:text-[30px] leading-none">
            {serializeRichText(node.children, userCodeAsHTML)}
          </h1>
        );
      case "h2":
        return (
          <h2 key={i} className="font-quicksand text-center md:text-start font-bold text-[22px] md:text-[30px] leading-none">
            {serializeRichText(node.children, userCodeAsHTML)}
          </h2>
        );
      case "h3":
        return (
          <h3 key={i} className="font-quicksand text-center md:text-start font-bold text-[22px] md:text-[30px] leading-none">
            {serializeRichText(node.children, userCodeAsHTML)}
          </h3>
        );
      case "h4":
        return (
          <h4 key={i} className="font-quicksand text-center md:text-start font-bold text-[22px] md:text-[30px] leading-none">
            {serializeRichText(node.children, userCodeAsHTML)}
          </h4>
        );
      case "h5":
        return (
          <h5 key={i} className="font-quicksand text-center md:text-start font-bold text-[22px] md:text-[30px] leading-none">
            {serializeRichText(node.children, userCodeAsHTML)}
          </h5>
        );
      case "h6":
        return (
          <h6 key={i} className="font-quicksand text-center md:text-start font-bold text-[22px] md:text-[30px] leading-none">
            {serializeRichText(node.children, userCodeAsHTML)}
          </h6>
        );
      case "quote":
        return <blockquote key={i}>{serializeRichText(node.children, userCodeAsHTML)}</blockquote>;
      case "ul":
        return (
          <ul key={i} className="text-dim-gray ml-6">
            {serializeRichText(node.children, userCodeAsHTML)}
          </ul>
        );
      case "ol":
        return (
          <ol key={i} className="text-dim-gray ml-6">
            {serializeRichText(node.children, userCodeAsHTML)}
          </ol>
        );
      case "li":
        return (
          <li style={{ listStyleType: "disc" }} key={i}>
            {serializeRichText(node.children, userCodeAsHTML)}
          </li>
        );
      case "link":
        return (
          <Link
            href={`${escapeHTML(node.url)}`}
            target={node.newTab ? "_blank" : "_self"}
            key={i}
            className="text-blue-ryb underline"
            rel="noreferrer"
          >
            {serializeRichText(node.children, userCodeAsHTML)}
          </Link>
        );
      case "upload":
        return <img src={node.value.url} height={node.value.height} width={node.value.width} alt={node.value.alt} />;

      default:
        return (
          <p
            key={i}
            className="text-dim-gray"
            style={{
              wordBreak: "keep-all",
              textAlign: "justify",
            }}
          >
            {serializeRichText(node.children, userCodeAsHTML)}
          </p>
        );
    }
  });
