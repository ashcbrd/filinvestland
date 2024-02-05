import { Block } from "payload/types";

const DividendHistoryTable: Block = {
  slug: "dividend-history-table",
  fields: [
    {
      type: "group",
      name: "totalDividendsRow",
      fields: [
        {
          type: "text",
          name: "totalDividendsRowTitle",
          required: true,
        },
        {
          type: "array",
          name: "totalDividends",
          required: true,
          fields: [
            {
              type: "text",
              name: "totalDividend",
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "payoutRateRow",
      fields: [
        {
          type: "text",
          name: "payoutRateRowTitle",
          required: true,
        },
        {
          type: "array",
          name: "payoutRates",
          required: true,
          fields: [
            {
              type: "text",
              name: "payoutRate",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default DividendHistoryTable;
