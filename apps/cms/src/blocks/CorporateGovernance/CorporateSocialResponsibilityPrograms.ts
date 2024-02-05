import { Block } from "payload/types";

const CorporateSocialResponsibilityPrograms: Block = {
  slug: "corporate-social-responsibility-programs",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      required: true,
    },
    {
      type: "array",
      name: "descriptionParagraphs",
      required: true,
      maxRows: 4,
      fields: [
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      type: "array",
      name: "gallery",
      required: true,
      maxRows: 4,
      fields: [
        {
          type: "upload",
          name: "image",
          relationTo: "files",
          required: true,
        },
      ],
    },
  ],
};

export default CorporateSocialResponsibilityPrograms;
