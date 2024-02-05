import { Block } from "payload/types";

const DividendPolicy: Block = {
  slug: "dividend-policy",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};

export default DividendPolicy;
