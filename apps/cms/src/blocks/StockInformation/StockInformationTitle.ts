import { Block } from "payload/types";

const StockInformationTitle: Block = {
  slug: "stock-information-title",
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
    },
  ],
};

export default StockInformationTitle;
