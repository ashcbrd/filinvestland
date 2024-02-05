import { Block } from "payload/types";

const StockInformationOutstandingNumberOfShares: Block = {
  slug: "stock-information-outstanding-number-of-shares-table",
  fields: [
    {
      type: "array",
      name: "rowData",
      required: true,
      fields: [
        {
          type: "text",
          name: "outstandingNumberOfShares",
          required: true,
        },
        {
          type: "text",
          name: "epsAttributableToParentEquityHolders",
          required: true,
        },
        {
          type: "text",
          name: "dividendDeclared",
          required: true,
        },
      ],
    },
    {
      type: "textarea",
      name: "description",
    },
    {
      name: "dividends",
      label: "Dividends",
      type: "upload",
      relationTo: "files",
      access: {
        read: () => true,
      },
    },
  ],
};

export default StockInformationOutstandingNumberOfShares;
