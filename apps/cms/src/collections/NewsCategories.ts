import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { slugField } from "../fields/slug";

export const NewsCategories: CollectionConfig = {
  slug: "news-categories",
  admin: {
    useAsTitle: "title",
    group: "Category",
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
    slugField(),
  ],
};
