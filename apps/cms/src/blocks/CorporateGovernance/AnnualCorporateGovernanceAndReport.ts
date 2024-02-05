import { Block } from "payload/types";

const AnnualCorporateGovernanceAndReport: Block = {
  slug: "annual-corporate-governance-and-report",
  fields: [
    {
      type: "array",
      name: "reportList",
      required: true,
      fields: [
        {
          type: "upload",
          name: "icon",
          relationTo: "files",
          required: true,
        },
        {
          name: "year",
          type: "text",
          required: true,
        },
        {
          type: "array",
          name: "reportBullets",
          required: true,
          fields: [
            {
              type: "textarea",
              name: "report",
              required: true,
            },
            {
              type: "text",
              name: "report_link",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default AnnualCorporateGovernanceAndReport;
