import { Block } from "payload/types";

const DividendHistory: Block = {
  slug: "dividend-history",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "mainTitle",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      type: "upload",
      name: "file",
      relationTo: "files",
      required: true,
    },
  ],
};

export default DividendHistory;
