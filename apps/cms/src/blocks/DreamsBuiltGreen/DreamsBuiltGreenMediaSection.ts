import { Block } from "payload/types";

const DreamsBuiltGreenMediaSection: Block = {
  slug: "dreams-built-green-media-section",
  fields: [
    {
      type: "text",
      name: "backgroundVideoLink",
      label:
        "Background Video Link (i.e. https://www.youtube.com/watch?v=lQ6Yrf_5EOw)",
      required: true,
    },
  ],
};

export default DreamsBuiltGreenMediaSection;
