import { Block } from "payload/types";

const PrestigeInvestorConcierge: Block = {
  slug: "PrestigeInvestorConcierge",
  fields: [
    { name: "sectionTitle", type: "text", required: false },
    {
      name: "name",
      type: "text",
      required: false,
    },
    {
      name: "profileImage",
      type: "upload",
      relationTo: "files",
      required: false,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    {
      name: "email",
      type: "text",
      required: false,
    },
    {
      name: "phoneNumber",
      type: "text",
      required: false,
    },
  ],
};

export default PrestigeInvestorConcierge;
