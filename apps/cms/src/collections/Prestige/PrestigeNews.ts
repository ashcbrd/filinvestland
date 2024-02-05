import { CollectionConfig } from "payload/types";
import { isAdmin } from "../../access/isAdmin";
import { isAdminOrHasSiteAccess } from "../../access/isAdminOrHasSiteAccess";
import { isLoggedIn } from "../../access/isLoggedIn";
import { slugField } from "../../fields/slug";
import { beforeValidateForDuplicate } from "../../utilities/hooks";
import { Permissions, getPermission } from "../../access/Permission";
import { isAdminOrEditor } from "../../access/isAdminOrEditor";
import { isVisible } from "../../access/isAdminOrEditor";

export const PrestigeNews: CollectionConfig = {
  slug: "prestige-news",
  labels: { singular: "News", plural: "News" },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [beforeValidateForDuplicate("prestige-news")],
  },
  access: {
    // Anyone logged in can create
    create: isAdminOrEditor("create", "news", "63970ca74f38bc4992f1295d"),
    // Only admins or editors with site access can update
    update: isAdminOrEditor("update", "news", "63970ca74f38bc4992f1295d"),
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
    delete: isAdminOrEditor("delete", "news", "63970ca74f38bc4992f1295d"),
  },
  fields: [
    {
      name: "title",
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
      name: "shortDescription",
      type: "text",
      label:'Card Display Text',
      admin:{
        description:'This text serves as a description visible when news is shown in a card format.'
      },
      required: true,
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
      name: "newsTypeTag",
      type: "relationship",
      relationTo: "news-categories",
      required: false,
    },
    {
      name: "propertyTypeTag",
      label: "Property Type Tag (optional)",
      type: "relationship",
      relationTo: "property-categories",
      required: false,
    },
    {
      name: "locationTag",
      label: "Location Tag (optional)",
      type: "relationship",
      relationTo: "location-categories",
      required: false,
    },
    {
      name: "Date",
      type: "date",
      required: true,
    },
    {
      name: "ProjectRecommendation",
      type: "group",
      fields: [
        {
          name: "recommendation1",
          label: "First Recommendation",
          type: "relationship",
          required: true,
          relationTo: "prestige-projects",
        },
        {
          name: "recommendation2",
          label: "Second Recommendation",
          type: "relationship",
          required: true,
          relationTo: "prestige-projects",
        },
      ],
    },
    // {
    //   name: "site",
    //   type: "relationship",
    //   relationTo: "sites",
    //   required: true,
    //   // If user is not admin, set the site by default
    //   // to the first site that they have access to
    //   // defaultValue: ({ user }) => {
    //   //   if (!user.roles.includes("admin") && user.sites?.[0]) {
    //   //     return user.sites[0];
    //   //   }
    //   // },
    //   // filterOptions({ user }) {
    //   //   // @ts-ignore
    //   //   if (user?.roles?.includes("admin")) {
    //   //     return {};
    //   //   }
    //   //   // @ts-ignore
    //   //   if (user?.roles?.includes("editor")) {
    //   //     return {
    //   //       and: [
    //   //         {
    //   //           ["id"]: {
    //   //             // @ts-ignore
    //   //             in: user?.sites,
    //   //           },
    //   //         },
    //   //       ],
    //   //     };
    //   //   }
    //   //   return {};
    //   // },
    // },
  ],
  admin: {
    useAsTitle: "title",
    group: "Prestige",

    preview: (doc:any) => {
      if (doc?.slug) {
        return `${process.env.PAYLOAD_PUBLIC_PRESTIGE_URL}/${doc?.newsTypeTag?.title.toLowerCase().includes("blog") ? "blog" : "news"}/${doc.slug}`;
      }

      return null;
    },
    hidden: ({ user }) => {
      return !isVisible("read", "news", "63970ca74f38bc4992f1295d", user);
    },
  },
};
