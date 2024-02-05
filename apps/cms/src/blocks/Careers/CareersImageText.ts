import { Block } from "payload/types";

const CareersImageText: Block = {
  slug: "careers-image-text",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "item",
      label: "Items",
      minRows: 3,
      required: true,
      fields: [
        {
          type: "upload",
          name: "logo",
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
          label: "Description",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};

export default CareersImageText;
