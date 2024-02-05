import { Block } from "payload/types";

const BoardCommitteesSeniorManagementOfficers: Block = {
  slug: "board-committees-senior-management-officers",
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
          required: true,
        },
        {
          type: "text",
          name: "name",
          required: true,
        },
      ],
    },
  ],
};

export default BoardCommitteesSeniorManagementOfficers;
