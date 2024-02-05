import { Block } from "payload/types";

const HomeOurServicesSection: Block = {
  slug: "homeOurServicesSection",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subTitle",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "serviceTypes",
      required: true,
      minRows: 4,
      maxRows: 4,
      fields: [
        {
          type: "upload",
          name: "image",
          relationTo: "files",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "link",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default HomeOurServicesSection;
