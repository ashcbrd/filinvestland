import React from "react";
import Image from "next/image";

const serializeUpload = (upload: any) => {
  if (upload.value) {
    const value = upload.value;
    if (
      value.mimeType === "image/png" ||
      value.mimeType === "image/jpg" ||
      value.mimeType === "image/jpeg"
    ) {
      return (
        <>
          <Image
            src={`${upload.value.url}`}
            width={upload.value.width}
            height={upload.value.height}
            alt={upload.value.alt}
          />
        </>
      );
    }
  }
};

export default serializeUpload;
