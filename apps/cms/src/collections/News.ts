import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrHasSiteAccess } from "../access/isAdminOrHasSiteAccess";
import { isLoggedIn } from "../access/isLoggedIn";
import { slugField } from "../fields/slug";
import { beforeValidateForDuplicate } from "../utilities/hooks";
import { Permissions, getPermission } from "../access/Permission";
import { isAdminOrEditor, isVisible } from "../access/isAdminOrEditor";

export const News: CollectionConfig = {
  slug: "news",
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [beforeValidateForDuplicate("news")],
  },
  access: {
    // Anyone logged in can create
    create: isAdminOrEditor("create", "news", "63db1aca51fa9424f93f6591"),
    // Only admins or editors with site access can update
    update: isAdminOrEditor("update", "news", "63db1aca51fa9424f93f6591"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: ({ req }) => {
      // If there is a user logged in,
      // let them retrieve all documents
      if (req.user) return true

      // If there is no user,
      // restrict the documents that are returned
      // to only those where `_status` is equal to `published`
      return {
        _status: {
          equals: 'published',
        },
      }
    },
    // Only admins can delete
    delete: isAdminOrEditor("delete", "news", "63db1aca51fa9424f93f6591"),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "shortDescription",
      type: "text",
      required: true,
    },
    {
      name: "coverImage", // required
      label: "Cover Image (Size: 1364x663)",
      type: "upload", // required
      relationTo: "files", // required
      access: {
        read: () => true,
      },
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      // If user is not admin, set the site by default
      // to the first site that they have access to
      access: {
        create: ({ req: { user } }) => {
          return user.roles[0] === "admin";
        },
        update: ({ req: { user } }) => {
          return user.roles[0] === "admin";
        },
      },
      defaultValue: ({ user }) => {
        return user.id;
      },
    },
    slugField(),
    {
      name: "publishedDate",
      type: "date",
      required: true,
    },
    {
      name: "newsTypeTag",
      type: "relationship",
      relationTo: "news-categories",
      required: false,
    },
    {
      name: "propertyTypeTag",
      type: "relationship",
      relationTo: "property-categories",
      required: false,
    },
    {
      name: "locationTag",
      type: "relationship",
      relationTo: "location-categories",
      required: false,
    },
    {
      name: "site",
      type: "relationship",
      relationTo: "sites",
      required: true,
      // If user is not admin, set the site by default
      // to the first site that they have access to
      // defaultValue: ({ user }) => {
      //   if (!user.roles.includes("admin") && user.sites?.[0]) {
      //     return user.sites[0];
      //   }
      // },
      // filterOptions({ user }) {
      //   // @ts-ignore
      //   if (user?.roles?.includes("admin")) {
      //     return {};
      //   }
      //   // @ts-ignore
      //   if (user?.roles?.includes("editor")) {
      //     return {
      //       and: [
      //         {
      //           ["id"]: {
      //             // @ts-ignore
      //             in: user?.sites,
      //           },
      //         },
      //       ],
      //     };
      //   }
      //   return {};
      // },
    },
  ],
  admin: {
    useAsTitle: "title",
    group: "Filinvest",
    preview: (doc) => {
      if (doc?.slug) {
        return `${process.env.PAYLOAD_PUBLIC_LAND_URL}/article/${doc.slug}`;
      }

      return null;
    },
    hidden: ({ user }) => {
      return !isVisible("read", "news", "63db1aca51fa9424f93f6591", user);
    },
  },
};
