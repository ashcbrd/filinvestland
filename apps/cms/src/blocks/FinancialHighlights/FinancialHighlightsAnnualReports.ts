import { Block } from "payload/types";

const FinancialHighlightsAnnualReports: Block = {
  slug: "financial-highlights-annual-reports",
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      type: "array",
      name: "annualFinancialReports",
      required: true,
      fields: [
        {
          type: "text",
          name: "year",
          required: true,
        },
        {
          type: "array",
          name: "annualFinancialReport",
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
              name: "annualFinancialReportTitle",
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

export default FinancialHighlightsAnnualReports;
