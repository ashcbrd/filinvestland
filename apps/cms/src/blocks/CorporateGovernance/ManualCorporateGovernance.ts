import { Block } from "payload/types";

const ManualCorporateGovernance: Block = {
  slug: "manual-corporate-governance",
  fields: [
    {
      type: "array",
      name: "codeOfBusinessEthics",
      required: true,
      fields: [
        {
          type: "upload",
          name: "icon",
          relationTo: "files",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "viewLink",
          label: "View Link (i.e. https://www.google.com)",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default ManualCorporateGovernance;
