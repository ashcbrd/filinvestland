import { Block } from "payload/types";

const OfficesOfficeParks: Block = {
  slug: "offices-parks-office-parks",
  fields: [
    {
      type: "array",
      name: "officeParks",
      required: true,
      minRows: 2,
      maxRows: 2,
      fields: [
        {
          name: "link",
          type: "text",
          required: true,
        },
        {
          type: "upload",
          name: "image",
          relationTo: "files",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};

export default OfficesOfficeParks;
