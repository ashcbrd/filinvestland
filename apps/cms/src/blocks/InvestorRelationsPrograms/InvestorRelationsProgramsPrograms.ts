import { Block } from "payload/types";

const InvestorRelationsProgramsPrograms: Block = {
  slug: "investor-relations-programs-programs",
  fields: [
    {
      type: "textarea",
      name: "description",
      required: true,
    },
    {
      type: "array",
      name: "programs",
      required: true,
      fields: [
        {
          type: "upload",
          name: "icon",
          relationTo: "files",
          required: true,
        },
        {
          type: "text",
          name: "title",
          required: true,
        },
        {
          type: "textarea",
          name: "description",
          required: true,
        },
      ],
    },
  ],
};

export default InvestorRelationsProgramsPrograms;
