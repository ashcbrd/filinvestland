import { Block } from "payload/types";

const Sitemap: Block = {
  slug: "sitemap",
  fields: [
    {
      type: "array",
      name: "menu",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          type: "text",
          name: "url",
          required: true,
        },
        {
          type: "array",
          name: "subMenu",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              type: "text",
              name: "url",
              required: true,
            },
            {
              type: "array",
              name: "subSubMenu",
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  type: "text",
                  name: "url",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default Sitemap;
