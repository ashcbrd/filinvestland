import React from "react";
import MapPin from "@/components/svg/MapPin";
import PhoneBlue from "@/components/svg/PhoneBlue";
import ApplicationContent from "@/components/modal/CareersModal/ApplicationContent";
export default function CareersCallHr({ content }: any) {
  const careersCallHrBlock = content?.content?.find(
    (item: any) => item.blockType === "careers-call-hr"
  );

  const contacts = careersCallHrBlock?.contacts;

  return (
    <div className="mt-9 pb-24 pt-14">
      <h2 className="text-4xl font-bold text-dark-cornflower-blue">
        {careersCallHrBlock?.title}
      </h2>
      <div className="mt-14 grid grid-cols-1 gap-4 md:mx-9 md:grid-cols-2 lg:grid-cols-3 2xl:mx-14">
        {contacts?.map((contact: any, index: number) => (
          <div key={index} className="flex flex-col gap-3 bg-cultured p-8">
            <div className="flex items-center gap-3">
              <div className="flex-none">
                <MapPin />
              </div>
              <p className="font-bold">{contact?.address}</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-none">
                <PhoneBlue />
              </div>
              <p>{contact?.phone}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="md: mt-14 grid shadow-md md:mx-9 md:p-4 2xl:mx-14">
        <ApplicationContent
          isEmbeddedForm
          withCoverLetter
          fileTitle="UPLOAD FILE"
        />
      </div>
    </div>
  );
}
