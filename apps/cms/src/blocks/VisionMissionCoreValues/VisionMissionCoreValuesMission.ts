import { Block } from "payload/types";

const VisionMissionCoreValuesMission: Block = {
  slug: "vision-mission-core-values-mission",
  fields: [
    {
      type: "upload",
      name: "icon",
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
      type: "richText",
      required: true,
    },
  ],
};

export default VisionMissionCoreValuesMission;
