import { Block } from "payload/types";

const PrivacyPolicyText: Block = {
  slug: "privacy-policy-text",
  fields: [
    {
      type: "richText",
      name: "privacyPolicy",
      required: true,
    },
    {
      type: "richText",
      name: "tableTop",
      required: true,
    },
    {
      type: "array",
      name: "tableRowData",
      required: true,
      fields: [
        {
          type: "text",
          name: "businessUnits",
        },
        {
          type: "text",
          name: "emailAddress",
        },
        {
          name: "isTitleRow",
          label: "Is this a title row?",
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
    {
      type: "richText",
      name: "tableBottom",
      required: true,
    },
  ],
};

export default PrivacyPolicyText;
