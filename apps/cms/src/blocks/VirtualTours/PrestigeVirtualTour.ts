import { Block } from "payload/types";

const PrestigeVirtualTour: Block = {
  slug: "PrestigeVirtualTourHeader",
  fields: [
    {
      type: "upload",
      name: "image",
      relationTo: "files",
      required: false,
    },
    {
      type: "text",
      name: "Title",
      required: false,
    },
    {
      type: "text",
      name: "SubTitle",
      required: false,
    },
  ],
};

export default PrestigeVirtualTour;
