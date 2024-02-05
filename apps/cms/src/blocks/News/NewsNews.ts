import { Block } from "payload/types";

const NewsNews: Block = {
  slug: "news-news",
  fields: [
    {
      type: "array",
      name: "news",
      required: true,
      minRows: 2,
      fields: [
        {
          type: "upload",
          name: "image",
          relationTo: "files",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "header",
          type: "textarea",
          required: true,
        },
        {
          name: "readMoreLink",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default NewsNews;
