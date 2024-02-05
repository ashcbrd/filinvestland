import { Block } from "payload/types";

const HomeProjectsSection: Block = {
  slug: "homeProjectsSection",
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
      name: "imageSlides",
      required: true,
      minRows: 3,
      fields: [
        {
          type: "upload",
          name: "slideBackgroundImage",
          relationTo: "files",
          required: true,
        },
        {
          type: "checkbox",
          name: "hasBlock",
          label: "Show white block information?",
        },
        {
          name: "blockTitle",
          type: "text",
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.hasBlock,
          },
        },
        {
          name: "blockDescription",
          type: "text",
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.hasBlock,
          },
        },
        {
          type: "upload",
          name: "blockLogo",
          relationTo: "files",
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.hasBlock,
          },
        },
        {
          name: "blockLearnMoreLink",
          type: "text",
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.hasBlock,
          },
        },
      ],
    },
  ],
};

export default HomeProjectsSection;
