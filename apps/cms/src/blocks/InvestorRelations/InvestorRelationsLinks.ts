import { Block } from "payload/types";

const InvestorRelationsLinks: Block = {
  slug: "investor-relations-links",
  fields: [
    {
      type: "array",
      name: "investorRelationsLinks",
      minRows: 3,
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
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

export default InvestorRelationsLinks;
