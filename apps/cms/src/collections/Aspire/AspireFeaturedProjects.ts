import { CollectionConfig } from "payload/types";
import { GlobalConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import {
  beforeValidateForDuplicate,
  beforeReadHook,
} from "../../utilities/hooks";
import { getPermission, Permissions } from "../../access/Permission";
import { isAdminOrEditor, isVisible } from "../../access/isAdminOrEditor";

export const AspireFeaturedProjects: GlobalConfig = {
  slug: "aspire-featured-projects",

  admin: {
    group: "Aspire",
    hidden: ({ user }) => {
      return !isVisible("read", "projects", "63cb9d9a313bab61401c9b2a", user);
    },
  },
  label: "Featured Projects",
  versions: {
    drafts: true,
  },
  hooks: {
    beforeRead: [beforeReadHook],
  },
  access: {
    // Only admins or editors with site access can update
    update: isAdminOrEditor("update", "projects", "63cb9d9a313bab61401c9b2a"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
    // Only admins can delete
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: false,
    },
    {
      name: "FeaturedProjects",
      type: "array",
      maxRows: 100,
      minRows: 1,
      fields: [
        {
          name: "Project",
          type: "relationship",
          required: true,
          relationTo: "aspire-projects",
        },
      ],
    }
  ],
};
