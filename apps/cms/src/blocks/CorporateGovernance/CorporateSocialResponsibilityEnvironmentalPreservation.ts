import { Block } from "payload/types";

const CorporateSocialResponsibilityEnvironmentalPreservation: Block = {
  slug: "corporate-social-responsibility-environmental-preservation",
  fields: [
    {
      name: "title",
      type: "text",
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
      name: "readMoreLink",
      label: "Read More Link (i.e. https://www.google.com",
      type: "text",
      required: true,
    },
    {
      type: "upload",
      name: "image",
      relationTo: "files",
      required: true,
    },
  ],
};

export default CorporateSocialResponsibilityEnvironmentalPreservation;
