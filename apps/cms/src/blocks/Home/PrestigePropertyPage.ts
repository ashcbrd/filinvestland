import { Block } from "payload/types";

const PrestigePropertyPage: Block = {
  slug: "PrestigePropertyPage",
  fields: [
    {
      name: "coverImage",
      type: "upload",
      relationTo: "files",
      required: false,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    { name: "title", label: "Title", type: "text", required: false },
    { name: "subTitle", label: "Sub Title", type: "text", required: false },
    { name: "sliderTitle", type: "text", required: false },
  ],
};

export default PrestigePropertyPage;
