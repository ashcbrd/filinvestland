import { Block } from "payload/types";

const FinancialHighlightsFinancialStatements: Block = {
  slug: "financial-highlights-financial-statements",
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      type: "array",
      name: "financialStatements",
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
          name: "financialStatementTitle",
          required: true,
        },
        {
          type: "upload",
          name: "document",
          relationTo: "files",
          required: true,
        },
      ],
    },
  ],
};

export default FinancialHighlightsFinancialStatements;
