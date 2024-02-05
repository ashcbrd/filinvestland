import Link from "next/link";
import React, { Fragment } from "react";
import serializeUpload from "./serializeUpload";

type Contents = {
  [k: string]: unknown;
}[];

const serializeChildren = (contents?: Contents) =>
  contents?.map((content: any, i: number) => {
    if (content && content?.children.length > 0) {
      const finalizedContent = mapChildren(content?.children, content?.type, 0);

      // Handle other leaf types here...
      return <Fragment key={i}>{finalizedContent}</Fragment>;
    }

    if (!content) {
      return null;
    }
  });

const mapChildren = (children: any, type: any, margin: number) => {
  const content = children.map((child: any, i: number) => {
    if (child.children) {
      return mapChildren(child.children, child.type, margin + 1);
    } else {
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

      return finalizeTags(child, className.trim(), i, margin, type);
    }
  });

  return <Fragment>{content}</Fragment>;
};

const finalizeTags = (
  content: any,
  className: string,
  i: number,
  margin: number,
  type?: string
) => {
  const finalType = type && !content?.type ? type : content?.type;

  switch (finalType) {
    case "h1":
      return (
        <h1 key={i} className={`text-jet text-6xl ${className}`}>
          {content?.text}
        </h1>
      );
    case "h2":
      return (
        <h2 key={i} className={`text-jet text-4xl ${className}`}>
          {content?.text}
        </h2>
      );
    case "h3":
      return (
        <h2 key={i} className={`text-jet text-2xl ${className}`}>
          {content?.text}
        </h2>
      );
    case "h4":
      return (
        <h2 key={i} className={`text-jet text-xl ${className}`}>
          {content?.text}
        </h2>
      );
    case "h5":
      return (
        <h6 key={i} className={`${className}`}>
          {content?.text}
        </h6>
      );
    case "h6":
      return (
        <h6 key={i} className={`${className}`}>
          {content?.text}
        </h6>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className={`border-blue-ryb text-sonic-silver border-l-4 pl-6 text-xl italic ${className}`}
        >
          {content?.text}
        </blockquote>
      );
    case "ul":
      return (
        <ul key={i} className={`${className}`}>
          {content?.text}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className={`${className}`}>
          {content?.text}
        </ol>
      );
    case "li":
      return (
        <li
          key={i}
          className={`${className}`}
          style={{ marginLeft: `${margin}rem` }}
        >
          {content?.text}
        </li>
      );
    case "link":
      return (
        <Link
          href={`${content?.url}`}
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
          {content?.text}
        </p>
      );
  }
};

export default serializeChildren;
