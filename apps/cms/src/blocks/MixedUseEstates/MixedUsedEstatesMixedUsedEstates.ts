import { Block } from "payload/types";

const MixedUsedAndEstatesMixedUsedAndEstates: Block = {
  slug: "mixed-used-and-estates-mixed-used-and-estates",
  fields: [
    {
      type: "array",
      name: "mixedUsedAndEstates",
      label: "MixedUsedAndEstates",
      required: true,
      fields: [
        {
          type: "upload",
          name: "mixedUsedAndEstatesImage",
          relationTo: "files",
          required: true,
        },
        {
          name: "mixedUsedAndEstatesName",
          type: "text",
          required: true,
        },
        {
          name: "mixedUsedAndEstatesLink",
          type: "text",
          required: true,
        },
        {
          name: "mixedUsedAndEstatesLocation",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default MixedUsedAndEstatesMixedUsedAndEstates;
