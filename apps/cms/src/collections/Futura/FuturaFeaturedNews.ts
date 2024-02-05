import { CollectionConfig } from "payload/types";
import { GlobalConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import {
  beforeValidateForDuplicate,
  beforeReadHook,
} from "../../utilities/hooks";
import { getPermission, Permissions } from "../../access/Permission";
import { isAdminOrEditor, isVisible } from "../../access/isAdminOrEditor";

export const FuturaFeaturedNews: GlobalConfig = {
  slug: "futura-featured-news",

  admin: {
    group: "Futura",
    hidden: ({ user }) => {
      return !isVisible("read", "news", "6396fc1d4f38bc4992f127a9", user);
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
    // Only admins or editors with site access can update
    update: isAdminOrEditor("update", "news", "6396fc1d4f38bc4992f127a9"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
    // Only admins can delete
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: false,
    },
    {
      name: "description",
      type: "textarea",
      required: false,
    },
    {
      name: "FeaturedNews",
      type: "array",
      maxRows: 100,
      minRows: 1,
      required:false,
      fields: [
        {
          name: "Project",
          type: "relationship",
          required: false,
          relationTo: "futura-news",
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
      required:false,
      fields: [
        {
          name: "Project",
          type: "relationship",
          required: false,
          relationTo: "futura-news",
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
    {
      name: "callToActionText",
      type: "text",
      required: false,
    },
    {
      name: "callToActionLink",
      type: "text",
      required: false,
    },
  ],
};
