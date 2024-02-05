import { Block } from "payload/types";

const IndustrialIndustrial: Block = {
  slug: "industrial-industrial",
  fields: [
    {
      type: "array",
      name: "industrial",
      label: "Industrial",
      required: true,
      fields: [
        {
          type: "upload",
          name: "industrialImage",
          relationTo: "files",
          required: true,
        },
        {
          name: "industrialName",
          type: "text",
          required: true,
        },
        {
          name: "industrialLink",
          type: "text",
          required: true,
        },
        {
          name: "industrialLocation",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default IndustrialIndustrial;
