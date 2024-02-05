import { Block } from "payload/types";

const PreviousLink: Block = {
  slug: "previous-link",
  fields: [
    {
      type: "upload",
      name: "image",
      relationTo: "files",
      required: true,
    },
    {
      name: "previousPageTitle",
      type: "text",
      required: true,
    },
    {
      name: "previousLink",
      type: "text",
      required: true,
    },
  ],
};

export default PreviousLink;
