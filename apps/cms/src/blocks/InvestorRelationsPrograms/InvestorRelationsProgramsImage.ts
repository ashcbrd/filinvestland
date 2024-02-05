import { Block } from "payload/types";

const InvestorRelationsProgramsImage: Block = {
  slug: "investor-relations-programs-image",
  fields: [
    {
      type: "upload",
      name: "image",
      relationTo: "files",
      required: true,
    },
  ],
};

export default InvestorRelationsProgramsImage;
