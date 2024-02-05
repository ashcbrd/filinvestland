import { Block } from "payload/types";

const StructuresTitleText: Block = {
  slug: "structures-title-and-text",
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

export default StructuresTitleText;
