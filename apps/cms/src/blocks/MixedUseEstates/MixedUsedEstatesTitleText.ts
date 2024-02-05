import { Block } from "payload/types";

const MixedUsedEstatesTitleText: Block = {
  slug: "mixed-used-and-estates-title-and-text",
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

export default MixedUsedEstatesTitleText;
