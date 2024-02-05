import { Block } from "payload/types";

const MallsMalls: Block = {
  slug: "malls-malls",
  fields: [
    {
      type: "array",
      name: "malls",
      label: "Malls",
      required: true,
      fields: [
        {
          type: "upload",
          name: "mallImage",
          relationTo: "files",
          required: true,
        },
        {
          name: "mallName",
          type: "text",
          required: true,
        },
        {
          name: "mallLink",
          type: "text",
          required: true,
        },
        {
          name: "mallLocation",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default MallsMalls;
