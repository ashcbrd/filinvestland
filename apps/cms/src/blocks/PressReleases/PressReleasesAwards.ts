import { Block } from "payload/types";

const PressReleasesAwards: Block = {
  slug: "press-releases-awards",
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      type: "array",
      name: "awards",
      required: true,
      fields: [
        {
          type: "upload",
          name: "awardImage",
          relationTo: "files",
          required: true,
        },
        {
          type: "text",
          name: "date",
          required: true,
        },
        {
          type: "richText",
          name: "awardTitle",
          required: true,
        },
        {
          type: "textarea",
          name: "awardDescription",
          required: true,
        },
      ],
    },
  ],
};

export default PressReleasesAwards;
