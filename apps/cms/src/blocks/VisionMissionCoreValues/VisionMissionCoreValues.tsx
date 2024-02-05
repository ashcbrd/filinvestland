import { Block } from "payload/types";

const VisionMissionCoreValues: Block = {
  slug: "vision-mission-and-core-values",
  fields: [
    {
      type: "upload",
      name: "visionIcon",
      relationTo: "files",
      required: true,
    },
    {
      name: "visionDescription",
      type: "textarea",
      required: true,
    },
    {
      type: "upload",
      name: "missionIcon",
      relationTo: "files",
      required: true,
    },
    {
      type: "array",
      name: "missionBulletDescription",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "description",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "upload",
      name: "coreValuesIcon",
      relationTo: "files",
      required: true,
    },
    {
      name: "coreValuesDescription",
      type: "textarea",
      required: true,
    },
  ],
};

export default VisionMissionCoreValues;
