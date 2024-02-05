import { Block } from "payload/types";

const BoardCommitteesCharter: Block = {
  slug: "board-committees-charter",
  fields: [
    {
      type: "array",
      name: "charter",
      required: true,
      fields: [
        {
          type: "text",
          name: "year",
        },
        {
          type: "array",
          name: "charterItem",
          required: true,
          fields: [
            {
              type: "upload",
              name: "icon",
              relationTo: "files",
              required: true,
            },
            {
              type: "text",
              name: "title",
              required: true,
            },
            {
              name: "downloadLink",
              label: "file",
              type: "upload",
              relationTo: "files",
              required: false,
            },
          ],
        },
      ],
    },
  ],
};

export default BoardCommitteesCharter;
