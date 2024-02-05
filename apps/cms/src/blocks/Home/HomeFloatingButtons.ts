import { Block } from "payload/types";

const HomeFloatingButtons: Block = {
  slug: "homeFloatingButtons",
  fields: [
    {
      name: "filPayLink",
      type: "text",
      required: true,
    },
    {
      name: "messageLink",
      type: "text",
      required: true,
    },
  ],
};

export default HomeFloatingButtons;
