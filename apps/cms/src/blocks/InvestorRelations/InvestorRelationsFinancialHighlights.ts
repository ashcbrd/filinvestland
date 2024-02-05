import { Block } from "payload/types";

const InvestorRelationsFinancialHighlights: Block = {
  slug: "investor-relations-financial-highlights",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "highlights",
      minRows: 3,
      required: true,
      fields: [
        {
          type: "upload",
          name: "logo",
          relationTo: "files",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "cost",
          type: "text",
          required: true,
        },
        {
          name: "year",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "seeAllLink",
      type: "text",
      required: true,
    },
  ],
};

export default InvestorRelationsFinancialHighlights;
