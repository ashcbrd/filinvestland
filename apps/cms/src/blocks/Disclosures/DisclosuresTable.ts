import { Block } from "payload/types";

const DisclosuresTable: Block = {
  slug: "disclosures-table",
  fields: [
    {
      type: "array",
      name: "rowData",
      required: true,
      fields: [
        {
          type: "date",
          name: "date",
          required: true,
        },
        {
          type: "text",
          name: "name",
          required: true,
        },
        {
          type: "text",
          name: "category",
          required: true,
        },
        {
          type: "upload",
          name: "file",
          relationTo: "files",
          required: true,
        },
      ],
    },
  ],
};

export default DisclosuresTable;
