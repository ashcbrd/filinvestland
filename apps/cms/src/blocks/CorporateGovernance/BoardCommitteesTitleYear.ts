import { Block } from "payload/types";

const BoardCommitteesTitleYear: Block = {
  slug: "board-committees-title-and-year",
  fields: [
    {
      type: "array",
      name: "titleLine",
      required: true,
      fields: [
        {
          type: "text",
          name: "line",
          required: true,
        },
      ],
    },
    {
      type: "text",
      name: "year",
    },
  ],
};

export default BoardCommitteesTitleYear;
