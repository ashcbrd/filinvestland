import { Block } from "payload/types";

const CareersCallHr: Block = {
  slug: "careers-call-hr",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "contacts",
      label: "Contacts",
      minRows: 3,
      required: true,
      fields: [
        {
          name: "address",
          type: "text",
          required: true,
        },
        {
          name: "phone",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "email",
      type: "text",
      required: true,
    },
  ],
};

export default CareersCallHr;
