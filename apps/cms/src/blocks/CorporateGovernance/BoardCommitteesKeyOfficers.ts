import { Block } from "payload/types";

const BoardCommitteesKeyOfficers: Block = {
  slug: "board-committees-key-officers",
  fields: [
    {
      type: "text",
      name: "tableTitle",
    },
    {
      type: "array",
      name: "rowData",
      required: true,
      fields: [
        {
          type: "text",
          name: "name",
          required: true,
        },
        {
          type: "text",
          name: "position",
          required: true,
        },
      ],
    },
  ],
};

export default BoardCommitteesKeyOfficers;
