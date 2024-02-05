import { Block } from "payload/types";

const HomeStockReportSection: Block = {
  slug: "homeStockReportSection",
  fields: [
    {
      name: "stockInfoTitle",
      type: "text",
      required: true,
    },
    {
      name: "annualReportTitle",
      type: "text",
      required: true,
    },
    {
      name: "viewReportLink",
      type: "text",
      required: true,
    },
    {
      type: "upload",
      name: "annualReportImage",
      relationTo: "files",
      required: true,
    },
    {
      type: "upload",
      name: "file",
      relationTo: "files",
      required: true,
    },
  ],
};

export default HomeStockReportSection;
