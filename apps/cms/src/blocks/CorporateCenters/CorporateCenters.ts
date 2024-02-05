import { Block } from "payload/types";

const CorporateCenters: Block = {
  slug: "corporate-centers",
  fields: [
    {
      type: "array",
      name: "center",
      label: "Center",
      required: true,
      fields: [
        {
          type: "upload",
          name: "centerImage",
          relationTo: "files",
          required: true,
        },
        {
          name: "centerName",
          type: "text",
          required: true,
        },
        {
          name: "centerLink",
          type: "text",
          required: true,
        },
        {
          name: "centerLocation",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default CorporateCenters;
