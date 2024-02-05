import { Block } from "payload/types";

const BoardCommitteesBoardCommittees: Block = {
  slug: "board-committees-board-committees",
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
          name: "committees",
        },
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

export default BoardCommitteesBoardCommittees;
