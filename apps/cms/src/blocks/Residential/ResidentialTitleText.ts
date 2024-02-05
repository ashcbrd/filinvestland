import { Block } from "payload/types";

const ResidentialTitleText: Block = {
  slug: "residential-title-and-text",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
  ],
};

export default ResidentialTitleText;
