import { Block } from "payload/types";

const FinancialHighlightsTable: Block = {
  slug: "financial-highlights-table",
  fields: [
    {
      type: "text",
      name: "typeOfData",
      required: true,
    },
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      type: "textarea",
      name: "description",
      required: true,
    },
    {
      type: "array",
      name: "tableColumn",
      required: true,
      fields: [
        {
          type: "text",
          name: "header",
          required: true,
        },
        {
          type: "array",
          name: "columnData",
          required: true,
          fields: [
            {
              type: "text",
              name: "data",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default FinancialHighlightsTable;
