import { Block } from "payload/types";

const CompanyPoliciesPolicy: Block = {
  slug: "company-policies-policy",
  fields: [
    {
      type: "array",
      name: "companyPolicies",
      required: true,
      maxRows: 4,
      fields: [
        {
          type: "text",
          name: "title",
        },
        {
          type: "text",
          name: "subtitle",
        },
        {
          type: "array",
          name: "policies",
          required: true,
          maxRows: 4,
          fields: [
            {
              type: "upload",
              name: "icon",
              relationTo: "files",
              required: true,
            },
            {
              type: "text",
              name: "title",
              required: true,
            },
            {
              type: "richText",
              name: "descriptionParagraph",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default CompanyPoliciesPolicy;
