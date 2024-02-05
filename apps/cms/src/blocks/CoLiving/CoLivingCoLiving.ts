import { Block } from "payload/types";

const CoLivingCoLiving: Block = {
  slug: "co-living-co-living",
  fields: [
    {
      type: "array",
      name: "coLiving",
      label: "Co-Living",
      required: true,
      fields: [
        {
          type: "upload",
          name: "coLivingImage",
          relationTo: "files",
          required: true,
        },
        {
          name: "coLivingName",
          type: "text",
          required: true,
        },
        {
          name: "coLivingLink",
          type: "text",
          required: true,
        },
        {
          name: "coLivingLocation",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default CoLivingCoLiving;
