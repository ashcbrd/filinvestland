import { CollectionConfig } from "payload/types";
import { GlobalConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import {
  beforeValidateForDuplicate,
  beforeReadHook,
} from "../../utilities/hooks";
import { getPermission, Permissions } from "../../access/Permission";
import { isAdminOrEditor, isVisible } from "../../access/isAdminOrEditor";

export const FuturaFeaturedProjects: GlobalConfig = {
  slug: "futura-featured-projects",
  admin: {
    group: "Futura",
    hidden: ({ user }) => {
      return !isVisible("read", "projects", "6396fc1d4f38bc4992f127a9", user);
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
    update: isAdminOrEditor("update", "projects", "6396fc1d4f38bc4992f127a9"),
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
      required: true,
    },
    {
      name: "CoverImage",
      type: "upload", 
      relationTo: "files", 
      access: {
        read: () => true,
      },
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
          relationTo: "futura-projects",
        },
      ],
    }
  ],
};
