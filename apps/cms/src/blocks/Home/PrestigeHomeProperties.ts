import { Block } from "payload/types";

const PrestigeHomeProperties: Block = {
  slug: "PrestigeHomeProperties",
  fields: [
    {
      type: "array",
      name: "prestigeHomeProperties",
      fields: [
        {
          type: "relationship",
          relationTo: "prestige-projects",
          required: false,
          name: "prestigeProject",
        },
        {
          type: "text",
          name: "callToActionText",
          label: "Call To Action Text",
          required: false,
          defaultValue: "Book a visit today",
        },
        {
          type: "text",
          name: "callToActionLink",
          label: "Call To Action Link (optional)",
          required: false,
        },
      ],
      required: false,
    },
  ],
};

export default PrestigeHomeProperties;
