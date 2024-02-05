import { CollectionConfig } from "payload/types";
import { isAdmin, readOnly } from "../access/isAdmin";

export const Sites: CollectionConfig = {
  slug: "sites",
  admin: {
    useAsTitle: "title",
    group: "Admin",
    hidden: ({ user }: any) => {
      return !Boolean(user?.roles?.includes("admin"));
    },
  },
  access: {
    // Only admins can create
    create: readOnly,
    // Only admins or editors with site access can read
    read: () => true,
    // Only admins can update
    update: isAdmin,
    // Only admins can delete
    delete: readOnly,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "url",
      type: "text",
      required: true,
    },
  ],
};
