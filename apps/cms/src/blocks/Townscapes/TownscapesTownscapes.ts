import { Block } from "payload/types";

const TownscapesTownscapes: Block = {
  slug: "townscapes-townscapes",
  fields: [
    {
      type: "array",
      name: "townscapes",
      label: "Townscapes",
      required: true,
      fields: [
        {
          type: "upload",
          name: "townscapeImage",
          relationTo: "files",
          required: true,
        },
        {
          name: "townscapeName",
          type: "text",
          required: true,
        },
        {
          name: "townscapeLink",
          type: "text",
          required: true,
        },
        {
          name: "townscapeLocation",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default TownscapesTownscapes;
