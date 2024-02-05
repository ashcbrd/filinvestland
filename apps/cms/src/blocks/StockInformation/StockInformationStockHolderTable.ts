import { Block } from "payload/types";

const StockInformationStockHolderTable: Block = {
  slug: "stock-information-stock-holder-table",
  fields: [
    {
      type: "text",
      name: "tableTitle",
      required: true,
    },
    {
      type: "text",
      name: "tableSubTitle",
      required: true,
    },
    {
      type: "text",
      name: "tableDescription",
      required: true,
    },
    {
      type: "text",
      name: "tableFooter",
      required: true,
    },
    {
      type: "array",
      name: "tableRowData",
      required: true,
      fields: [
        {
          type: "text",
          name: "shareholder",
          required: true,
        },
        {
          type: "text",
          name: "numberOfSharesHeld",
          required: true,
        },
        {
          type: "text",
          name: "toTotalOutstanding",
          required: true,
        },
        {
          name: "numberOfColumns",
          label: "Is this a title row?",
          type: "radio",
          options: [
            {
              label: "Yes",
              value: "yes",
            },
            {
              label: "No",
              value: "no",
            },
          ],
          defaultValue: "no",
        },
      ],
    },
  ],
};

export default StockInformationStockHolderTable;
