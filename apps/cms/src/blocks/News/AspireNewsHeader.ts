import { Block } from "payload/types";

const AspireNewsHeader: Block = {
  slug: "AspireNewsHeader",
  fields: [
    {
      type: "upload",
      name: "image",
      relationTo: "files",
      required: true,
    },
    {
      type: "relationship",
      name: "FeaturedNews",
      relationTo: "aspire-news",
      required: true,
    },
  ],
};

export default AspireNewsHeader;
