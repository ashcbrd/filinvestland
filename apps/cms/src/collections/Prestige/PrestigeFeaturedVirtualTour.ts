import { CollectionConfig } from "payload/types";
import { GlobalConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import {
  beforeValidateForDuplicate,
  beforeReadHook,
} from "../../utilities/hooks";
import { getPermission, Permissions } from "../../access/Permission";
import { isAdminOrEditor } from "../../access/isAdminOrEditor";
import { isVisible } from "../../access/isAdminOrEditor";

export const PrestigeFeaturedProjects: GlobalConfig = {
  slug: "prestige-featured-tours",

  admin: {
    group: "Prestige",
    hidden: ({ user }) => {
      return !isVisible("read", "projects", "63970ca74f38bc4992f1295d", user);
    },
  },
  label: "Featured Virtual Projects",
  versions: {
    drafts: true,
  },
  hooks: {
    beforeRead: [beforeReadHook],
  },
  access: {
    // Only admins or editors with site access can update
    update: isAdminOrEditor("update", "projects", "63970ca74f38bc4992f1295d"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
    // Only admins can delete
  },
  fields: [
    {
      name: "featuredVirtualProject",
      type: "array",
      maxRows: 100,
      minRows: 1,
      fields: [
        {
          name: "location",
          type: "relationship",
          relationTo: "location-categories",
          required: true,
        },
        {
          name: "Project",
          label: "Projects from selected location",
          type: "relationship",
          required: true,
          relationTo: "prestige-projects",
          filterOptions(data: any) {
            return {
              location: {
                equals: data.siblingData.location,
              },
            };
          },
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "oferringText",
          type: "text",
        },

        {
          name: "viewVirtualTour",
          type: "text",
          required: false,
          defaultValue: "View Virutal Tour",
        },
      ],
    },
  ],
};
