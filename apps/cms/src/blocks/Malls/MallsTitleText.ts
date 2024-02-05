import { Block } from "payload/types";

const MallsTitleText: Block = {
  slug: "malls-title-and-text",
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

export default MallsTitleText;
