import { Block } from "payload/types";

const StructuresChartTable: Block = {
  slug: "structures-chart-table",
  fields: [
    {
      type: "text",
      name: "tableTitle",
    },
    {
      type: "text",
      name: "tableFooter",
    },
    {
      type: "text",
      name: "tableSubFooter",
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
          name: "tableData",
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

export default StructuresChartTable;
