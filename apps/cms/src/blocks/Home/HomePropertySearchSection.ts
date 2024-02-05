import { Block } from "payload/types";

const HomePropertySearchSection: Block = {
  slug: "homePropertySearchSection",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
  ],
};

export default HomePropertySearchSection;
