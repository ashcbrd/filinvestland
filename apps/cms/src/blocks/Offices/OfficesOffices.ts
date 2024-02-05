import { Block } from "payload/types";

const OfficesOffices: Block = {
  slug: "offices-offices",
  fields: [
    {
      type: "array",
      name: "office",
      label: "Office",
      required: true,
      fields: [
        {
          type: "upload",
          name: "officeImage",
          relationTo: "files",
          required: true,
        },
        {
          name: "officeName",
          type: "text",
          required: true,
        },
        {
          name: "officeLink",
          type: "text",
          required: true,
        },
        {
          name: "officeLocation",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default OfficesOffices;
