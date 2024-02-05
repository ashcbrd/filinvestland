import { Block } from "payload/types";

const NextLink: Block = {
  slug: "next-link",
  fields: [
    {
      type: "upload",
      name: "image",
      relationTo: "files",
      required: true,
    },
    {
      name: "nextPageTitle",
      type: "text",
      required: true,
    },
    {
      name: "nextLink",
      type: "text",
      required: true,
    },
  ],
};

export default NextLink;
