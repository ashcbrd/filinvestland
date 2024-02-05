import { Block } from "payload/types";

const AnnualReports: Block = {
  slug: "annual-reports",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "contacts",
      label: "Contacts",
      minRows: 3,
      required: true,
      fields: [
        {
          name: "year",
          type: "text",
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

export default AnnualReports;
