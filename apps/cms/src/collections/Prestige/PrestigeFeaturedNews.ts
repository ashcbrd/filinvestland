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

export const PrestigeFeaturedNews: GlobalConfig = {
  slug: "prestige-featured-news",

  admin: {
    group: "Prestige",
    hidden: ({ user }) => {
      return !isVisible("read", "news", "63970ca74f38bc4992f1295d", user);
    },
  },
  label: "Featured News",
  versions: {
    drafts: true,
  },
  hooks: {
    beforeRead: [beforeReadHook],
  },
  access: {
    update: isAdminOrEditor("update", "news", "63970ca74f38bc4992f1295d"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
  },
  fields: [
    {
      name: "FeaturedNews",
      type: "array",
      maxRows: 100,
      minRows: 1,
      fields: [
        {
          name: "Project",
          type: "relationship",
          required: true,
          relationTo: "prestige-news",
          filterOptions() {
            return {
              'newsTypeTag.title': {
                equals: 'News',
              },
            };
          },
        },
      ],
    },
    {
      name: "FeaturedBlogs",
      type: "array",
      maxRows: 100,
      minRows: 1,
      fields: [
        {
          name: "Project",
          type: "relationship",
          required: true,
          relationTo: "prestige-news",
          filterOptions() {
            return {
              'newsTypeTag.title': {
                equals: 'Blogs',
              },
            };
          },
        },
      ],
    },
  ],
};
