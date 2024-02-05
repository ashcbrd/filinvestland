"use client";
import React, { LinkHTMLAttributes } from "react";

interface DownloadProps extends LinkHTMLAttributes<HTMLAnchorElement> {}

const DownloadLink = (props: DownloadProps) => {
  // if (typeof props?.href != "string") props.href = "";
  const onClickdownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = e.currentTarget.href;
    fetch(url)
      .then(async (response) => {
        if (response.ok) {
          try {
            const blob = await response.blob();
            const a = document.createElement("a");
            const filename = url.substring(url.lastIndexOf("/") + 1);
            a.href = URL.createObjectURL(blob);
            a.target = "_blank";
            a.download = decodeURIComponent(filename);
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } catch (error) {
            alert(error);
          }
        } else alert(response.statusText);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <a
      {...props}
      href={typeof props?.href == "string" ? props?.href : ""}
      onClick={onClickdownload}
      rel="noreferrer"
      target="_blank"
    >
      {props.children}
    </a>
  );
};

export default DownloadLink;
