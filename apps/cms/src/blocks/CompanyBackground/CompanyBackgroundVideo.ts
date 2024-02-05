import { Block } from "payload/types";

const CompanyBackgroundVideo: Block = {
  slug: "company-background-video",
  fields: [
    {
      name: "videoBackground", // required
      type: "upload", // required
      relationTo: "files", // required
      filterOptions: {
        mimeType: { contains: "video" },
      },
      access: {
        read: () => true,
      },
    },
  ],
};

export default CompanyBackgroundVideo;
