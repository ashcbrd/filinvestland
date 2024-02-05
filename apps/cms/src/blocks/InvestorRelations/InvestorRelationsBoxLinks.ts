import { Block } from "payload/types";

const InvestorRelationsBoxLinks: Block = {
  slug: "investor-relations-box-links",
  fields: [
    {
      type: "array",
      name: "investorRelationsBoxLinks",
      minRows: 3,
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
          required: true,
        },
        {
          name: "buttonLink",
          type: "text",
          required: true,
        },
        {
          name: "buttonText",
          type: "text",
          required: true,
        },
        {
          name: "isButtonBlue",
          type: "radio",
          options: [
            {
              label: "Yes",
              value: "yes",
            },
            {
              label: "No",
              value: "no",
            },
          ],
          defaultValue: "no",
        },
        {
          name: "isButtonDownload",
          type: "radio",
          options: [
            {
              label: "Yes",
              value: "yes",
            },
            {
              label: "No",
              value: "no",
            },
          ],
          defaultValue: "no",
        },
      ],
    },
  ],
};

export default InvestorRelationsBoxLinks;
