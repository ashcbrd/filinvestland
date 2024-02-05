import { GlobalConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import link from "../fields/link";
import { isAdminOrEditor, isVisible } from "../access/isAdminOrEditor";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: "Filinvest",
    hidden: ({ user }) => {
      return !isVisible("read", "footer", "63db1aca51fa9424f93f6591", user);
    },
  },
  fields: [
    {
      name: "filinvestLogo",
      type: "upload",
      relationTo: "files",
      required: true,
    },
    {
      name: "emailDescription",
      type: "text",
      required: true,
    },
    {
      name: "quickLinks",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: "filinvestLand",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: "firstPhone",
      type: "text",
      required: true,
    },
    {
      name: "secondPhone",
      type: "text",
      required: true,
    },
    {
      name: "emailAddress",
      type: "text",
      required: true,
    },
    {
      name: "address",
      type: "text",
      required: true,
    },
    {
      name: "copyrightText",
      type: "text",
      required: true,
    },
    {
      name: "bottomRightLinks",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: "facebookLink",
      type: "text",
      required: false,
    },
    {
      name: "linkedInLink",
      type: "text",
      required: false,
    },
    {
      name: "twitterLink",
      type: "text",
      required: false,
    }
  ],
  versions: {
    drafts: true,
  },
};

export const AspireFooter: GlobalConfig = {
  slug: "aspire-footer",
  access: {
    update: isAdminOrEditor("update", "footer", "63cb9d9a313bab61401c9b2a"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
  },
  admin: {
    group: "Aspire",
    hidden: ({ user }) => {
      return !isVisible("read", "footer", "63cb9d9a313bab61401c9b2a", user);
    },
  },
  label: "Footer",
  fields: [
    {
      name: "AspireFilinvestLogo",
      type: "upload",
      relationTo: "files",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "LearnMore",
      label: "Learn more",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: "ContactUs",
      type: "group",
      label: "Contact us",
      fields: [
        {
          name: "firstPhone",
          type: "text",
          required: true,
        },
        {
          name: "secondPhone",
          type: "text",
          required: true,
        },
        {
          name: "emailAddress",
          type: "text",
          required: true,
        },
        {
          name: "address",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "ConnectWithUs",
      label: "Connect with us",
      type: "group",
      fields: [
        {
          name: "facebookLink",
          type: "text",
          required: false,
        },
        {
          name: "linkedInLink",
          type: "text",
          required: false,
        },
        {
          name: "twitterLink",
          type: "text",
          required: false,
        },
        {
          name: "youtubeLink",
          type: "text",
          required: false,
        },
        {
          name: "instagramLink",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "copyrightText",
      type: "text",
      required: true,
    },
    {
      name: "RightSection",
      type: "array",
      label: "Right Section",
      fields: [
        {
          name: "description1",
          type: "text",
          required: true,
        },
        {
          name: "description2",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
};

export const FuturaFooter: GlobalConfig = {
  slug: "futura-footer",
  access: {
    update: isAdminOrEditor("update", "news", "6396fc1d4f38bc4992f127a9"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
  },
  admin: {
    group: "Futura",
    hidden: ({ user }) => {
      return !isVisible("read", "footer", "6396fc1d4f38bc4992f127a9", user);
    },
  },
  label: "Footer",
  fields: [
    {
      name: "FuturaFilinvestLogo",
      type: "upload",
      relationTo: "files",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "UsefulLinks",
      label: "Useful links",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: "ContactUs",
      type: "group",
      label: "Contact us",

      fields: [
        {
          name: "firstPhone",
          type: "text",
          required: true,
        },
        {
          name: "secondPhone",
          type: "text",
          required: true,
        },
        {
          name: "emailAddress",
          type: "text",
          required: true,
        },
        {
          name: "address",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "ConnectWithUs",
      label: "Connect with us",
      type: "group",
      fields: [
        {
          name: "facebookLink",
          type: "text",
          required: false,
        },
        {
          name: "linkedInLink",
          type: "text",
          required: false,
        },
        {
          name: "twitterLink",
          type: "text",
          required: false,
        },
        {
          name: "youtubeLink",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "copyrightText",
      type: "text",
      required: true,
    },
    {
      name: "RightSection",
      type: "array",
      label: "Right Section",
      fields: [
        {
          name: "description1",
          type: "text",
          required: true,
        },
        {
          name: "description2",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
};

export const PrestigeFooter: GlobalConfig = {
  slug: "prestige-footer",
  access: {
    update: isAdminOrEditor("update", "news", "63970ca74f38bc4992f1295d"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
  },
  admin: {
    group: "Prestige",
    hidden: ({ user }) => {
      return !isVisible("read", "footer", "63970ca74f38bc4992f1295d", user);
    },
  },
  label: "Footer",
  fields: [
    {
      name: "PrestigeFilinvestLogo",
      type: "upload",
      relationTo: "files",
      required: true,
    },
    {
      name: 'usefulLinks',
      type: 'array',
      fields: [
        {
          name: "UsefulLink",
          label: "Links Block",
          type: "array",
          fields: [
            {
              name: "newTab",
              label: "Open in new tab",
              type: "checkbox",
              admin: {
                width: "50%",
                style: {
                  alignSelf: "flex-end",
                },
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "url",
                  label: "Custom URL",
                  type: "text",
                  required: true,
                },
                {
                  name: "label",
                  label: "Label",
                  type: "text",
                  required: true
                },
              ],
            },

          ],
        }
      ]
    },
    {
      name: "copyrightText",
      type: "text",
      required: true,
    },
  ],
  versions: {
    drafts: true,
  },
};
