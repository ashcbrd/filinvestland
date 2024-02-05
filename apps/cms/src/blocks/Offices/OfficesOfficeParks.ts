import { Block } from "payload/types";

const OfficesOfficeParks: Block = {
  slug: "offices-office-parks",
  fields: [
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
    {
      type: "array",
      name: "officeParks",
      required: true,
      minRows: 2,
      maxRows: 2,
      fields: [
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
        {
          name: "link",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default OfficesOfficeParks;
