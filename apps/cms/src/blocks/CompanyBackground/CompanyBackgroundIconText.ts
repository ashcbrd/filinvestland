import { Block } from "payload/types";

const CompanyBackgroundIconText: Block = {
  slug: "company-background-icon-text",
  fields: [
    {
      type: "array",
      name: "iconText",
      label: "Icon and Text",
      minRows: 4,
      maxRows: 4,
      required: true,
      fields: [
        {
          type: "upload",
          name: "iconImage",
          relationTo: "files",
          required: true,
        },
        {
          type: "array",
          name: "description",
          required: true,
          fields: [
            {
              name: "textLine",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default CompanyBackgroundIconText;
