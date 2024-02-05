import { Block } from "payload/types";

const FinancialHighlightsChartImage: Block = {
  slug: "financial-highlights-chart-image",
  fields: [
    {
      name: "chartImage",
      type: "upload",
      relationTo: "files",
      required: true,
    },
  ],
};

export default FinancialHighlightsChartImage;
