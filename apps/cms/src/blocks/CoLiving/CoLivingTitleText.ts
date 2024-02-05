import { Block } from "payload/types";

const CoLivingTitleText: Block = {
  slug: "co-living-title-and-text",
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

export default CoLivingTitleText;
