import { Block } from "payload/types";

const CorporateSocialResponsibilityTitleText: Block = {
  slug: "corporate-social-responsibility-title-text",
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
  ],
};

export default CorporateSocialResponsibilityTitleText;
