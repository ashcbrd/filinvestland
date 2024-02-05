import { GlobalConfig } from "payload/types";
import { isAdmin } from "../../access/isAdmin";
import link from "../../fields/link";
import { CollectionConfig } from "payload/types";

export const PrestigeNavigation: CollectionConfig = {
  slug: "prestige-navigation",
  admin: {
    useAsTitle: "title",
    group: "Prestige",
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  labels: { singular: "Menu", plural: "Menus" },
  fields: [
    {
      name: "mainMenu",
      type: "array",
      maxRows: 8,
      minRows: 5,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: "callToActionText",
      type: "text",
      required: true,
    },
    {
      name: "callToActionLink",
      type: "text",
      required: true,
    },
  ],
  versions: {
    drafts: true,
  },
};
