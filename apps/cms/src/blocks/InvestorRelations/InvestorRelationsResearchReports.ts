import { Block } from "payload/types";

const InvestorRelationsResearchReports: Block = {
  slug: "investor-relations-research-reports",
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      type: "array",
      name: "investorRelationsResearchReports",
      required: true,
      fields: [
        {
          type: "text",
          name: "year",
          required: true,
        },
        {
          type: "array",
          name: "researchReports",
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
              name: "researchReportsTitle",
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
    },
  ],
};

export default InvestorRelationsResearchReports;
