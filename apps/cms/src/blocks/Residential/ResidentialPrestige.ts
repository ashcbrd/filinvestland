import { Block } from "payload/types";

const ResidentialPrestige: Block = {
  slug: "residential-prestige",
  fields: [
    {
      type: "upload",
      name: "prestigeImage",
      relationTo: "files",
      required: true,
    },
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
    {
      name: "readMoreLink",
      label: "Read More Link (i.e. https://www.google.com)",
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "prestigeHomes",
      minRows: 1,
      required: true,
      fields: [
        {
          type: "upload",
          name: "homeImage",
          relationTo: "files",
          required: true,
        },
        {
          name: "homeName",
          type: "text",
          required: true,
        },
        {
          name: "homeDescription",
          type: "textarea",
          required: true,
        },
        {
          name: "learnMoreLink",
          label: "Learn More Link (i.e. https://www.google.com)",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default ResidentialPrestige;
