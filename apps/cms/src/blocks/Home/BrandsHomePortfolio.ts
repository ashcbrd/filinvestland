import { Block } from "payload/types";

const BrandsHomePortfolio: Block = {
  slug: "BrandsHomePortfolio",
  fields: [
    {
      type: "group",
      name: "headerLeftSection",
      fields: [
        {
          name: "title",
          type: "text",
          required: false,
        },
        {
          name: "description",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      type: "group",
      name: "headerRightSection",
      fields: [
        {
          name: "context1",
          label: "title",
          type: "text",
          required: false,
        },
        {
          name: "context2",
          label: "text body",
          type: "textarea",
          required: false,
        },
        { name: "callToActionText", type: "text", required: false },
        { name: "callToActionLink", type: "text", required: false },
      ],
    },
    {
      name: "homePropertiesSection",
      type: "array",
      fields: [
        {
          name: "prestigeProperty",
          type: "relationship",
          relationTo: "prestige-projects",
          required: false,
        },
        {
          name: "promotionalText",
          type: "text",
          required: false,
          label: "Promotional Text (optional)",
        },
        {
          name: "callToActionText",
          type: "text",
          required: false,
          label: "Call To Action Text (optional)",
        },
        {
          name: "callToActionLink",
          type: "text",
          required: false,
          label: "Call To Action Link (optional)",
        },
      ],
      required: false,
    },
  ],
};

export default BrandsHomePortfolio;
