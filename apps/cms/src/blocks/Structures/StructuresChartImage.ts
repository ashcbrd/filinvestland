import { Block } from "payload/types";

const StructuresChartImage: Block = {
  slug: "structures-chart-image",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "chartImage",
      type: "upload",
      relationTo: "files",
      required: true,
    },
  ],
};

export default StructuresChartImage;
