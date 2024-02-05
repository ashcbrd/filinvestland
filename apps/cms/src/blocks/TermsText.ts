import { Block } from "payload/types";

const TermsText: Block = {
  slug: "terms-text",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "richText",
      name: "Terms",
      required: true,
    },
  ],
};

export default TermsText;
