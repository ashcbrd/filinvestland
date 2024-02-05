import { Block } from "payload/types";

const HomeAboutUsSection: Block = {
  slug: "homeAboutUsSection",
  fields: [
    {
      type: "upload",
      name: "coverImage",
      relationTo: "files",
      required: true,
    },
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
      type: "textarea",
      required: true,
    },
    {
      name: "learnMoreLink",
      type: "text",
      required: true,
    },
  ],
};

export default HomeAboutUsSection;
