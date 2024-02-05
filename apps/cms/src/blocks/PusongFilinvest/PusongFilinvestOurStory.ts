import { Block } from "payload/types";

const PusongFilinvestOurStory: Block = {
  slug: "pusong-filinvest-our-story",
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
      type: "upload",
      name: "coverImage",
      relationTo: "files",
      required: true,
    },
  ],
};

export default PusongFilinvestOurStory;
