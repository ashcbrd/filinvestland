import { Block } from "payload/types";

const ResidentialSlider: Block = {
  slug: "residential-slider",
  fields: [
    {
      type: "array",
      name: "imageSlides",
      required: true,
      minRows: 2,
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
      ],
    },
  ],
};

export default ResidentialSlider;
