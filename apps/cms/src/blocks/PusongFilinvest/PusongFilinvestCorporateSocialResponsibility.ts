import { Block } from "payload/types";

const PusongFilinvestCorporateSocialResponsibility: Block = {
  slug: "pusong-filinvest-corporate-social-responsibility",
  fields: [
    {
      name: "corporateSocialResponsibility",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "subTitle",
          type: "text",
          required: true,
        },
        {
          type: "array",
          name: "descriptionParagraphs",
          required: true,
          minRows: 1,
          fields: [
            {
              name: "paragraph",
              type: "textarea",
              required: true,
            },
          ],
        },
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

export default PusongFilinvestCorporateSocialResponsibility;
