import { Block } from "payload/types";

const Presentations: Block = {
  slug: "presentations",
  fields: [
    {
      type: "array",
      name: "presentation",
      required: true,
      fields: [
        {
          type: "upload",
          name: "image",
          relationTo: "files",
          required: true,
        },
        {
          type: "text",
          name: "title",
          required: true,
        },
        {
          type: "text",
          name: "presentationLink",
          required: true,
        },
      ],
    },
  ],
};

export default Presentations;
