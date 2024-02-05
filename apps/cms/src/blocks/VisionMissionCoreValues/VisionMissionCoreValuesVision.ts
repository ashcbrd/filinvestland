import { Block } from "payload/types";

const VisionMissionCoreValuesVision: Block = {
  slug: "vision-mission-core-values-vision",
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
      type: "textarea",
      required: true,
    },
  ],
};

export default VisionMissionCoreValuesVision;
