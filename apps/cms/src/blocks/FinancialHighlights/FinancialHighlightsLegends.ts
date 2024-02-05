import { Block } from "payload/types";

const FinancialHighlightsLegends: Block = {
  slug: "financial-highlights-legends",
  fields: [
    {
      type: "array",
      name: "legends",
      required: true,
      fields: [
        {
          type: "text",
          name: "character",
          required: true,
        },
        {
          type: "text",
          name: "description",
          required: true,
        },
      ],
    },
  ],
};

export default FinancialHighlightsLegends;
