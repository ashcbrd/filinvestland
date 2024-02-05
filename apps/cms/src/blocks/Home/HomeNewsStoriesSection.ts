import { Block } from "payload/types";

const HomeNewsStoriesSection: Block = {
  slug: "homeNewsStoriesSection",
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
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "learnMoreLink",
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "newsStories",
      label: "News & Stories",
      required: true,
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: "news",
          type: "relationship",
          relationTo: "news",
          required: true,
        },
      ],
    },
  ],
};

export default HomeNewsStoriesSection;
