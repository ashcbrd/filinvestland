import Link from "next/link";
import React, { Fragment } from "react";
import serializeUpload from "./serializeUpload";

type Contents = {
  [k: string]: unknown;
}[];

const serializeChildren = (contents?: Contents) => {
  let text = contents?.map((content: any, i: number) => {
    if (content && content?.children.length > 0) {
      const finalizedContent = content?.children.map((child: any) => {
        let className = "";

        if (child.bold) {
          className += "font-bold ";
        }

        if (child.italic) {
          className += "italic ";
        }

        if (child.underline) {
          className += "underline ";
        }

        return finalizeTags(child, className.trim(), i, content?.type);
      });

      // Handle other leaf types here...
      return <Fragment key={i}>{finalizedContent}</Fragment>;
    }

    if (!content) {
      return null;
    }
  });

  return text;
};

const finalizeTags = (
  content: any,
  className: string,
  i: number,
  type?: string
) => {
  const getFinalText = () => {
    if (content?.children) {
      let finalText = content?.children.map((child: any, index: number) => {
        let text = finalizeTags(child, "", index, content?.type);
        return text;
      });
      if (finalText) return <Fragment>{finalText}</Fragment>;
      else return null;
    } else {
      return null;
    }
  };

  const finalType = type && !content?.type ? type : content?.type;
  const finalText = content?.text ? content?.text : getFinalText();

  if (!finalText) return null;

  switch (finalType) {
    case "h1":
      return (
        <h1 key={i} className={`text-jet text-6xl ${className}`}>
          {finalText}
        </h1>
      );
    case "h2":
      return (
        <h2 key={i} className={`text-jet text-4xl ${className}`}>
          {finalText}
        </h2>
      );
    case "h3":
      return (
        <h2 key={i} className={`text-jet text-2xl ${className}`}>
          {finalText}
        </h2>
      );
    case "h4":
      return (
        <h2 key={i} className={`text-jet text-xl ${className}`}>
          {finalText}
        </h2>
      );
    case "h5":
      return (
        <h6 key={i} className={`${className}`}>
          {finalText}
        </h6>
      );
    case "h6":
      return (
        <h6 key={i} className={`${className}`}>
          {finalText}
        </h6>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className={`border-blue-ryb text-sonic-silver border-l-4 pl-6 text-xl italic ${className}`}
        >
          {finalText}
        </blockquote>
      );
    case "ul":
      return (
        <ul key={i} className={`${className}`}>
          {finalText}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className={`${className}`}>
          {finalText}
        </ol>
      );
    case "li":
      return (
        <li key={i} className={`${className}`}>
          {finalText}
        </li>
      );
    case "link":
      return (
        <Link
          href={content?.url}
          className={`text-blue-ryb hover:underline ${className}`}
          key={i}
        >
          {content?.children?.[0].text}
        </Link>
      );
    case "upload":
      return serializeUpload(content);
    default:
      return (
        <p key={i} className={`text-dim-gray ${className}`}>
          {finalText}
        </p>
      );
  }
};

export default serializeChildren;
