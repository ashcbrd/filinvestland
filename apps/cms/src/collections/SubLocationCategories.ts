import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { beforeOperationForProjectSubLocation } from "../utilities/hooks";

export const SubLocationCategories: CollectionConfig = {
  slug: "sub-location-categories",
  admin: {
    useAsTitle: "title",
    group: "Category",
    disableDuplicate: true,
  },
  hooks: {
    beforeOperation: [beforeOperationForProjectSubLocation],
  },
  access: {
    // Only admins can create
    create: isAdmin,
    // Only admins or editors with site access can read
    read: () => true,
    // Only admins can update
    update: isAdmin,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
  ],
};
