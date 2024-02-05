import { GlobalConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import link from "../fields/link";
import { CollectionConfig } from "payload/types";
import { isAdminOrEditor, isVisible } from "../access/isAdminOrEditor";
import { Labels } from "payload/dist/fields/config/types";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  access: {
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: "Filinvest",
    hidden: ({ user }) => {
      return !isVisible("read", "menu", "63db1aca51fa9424f93f6591", user);
    },
  },
  fields: [
    {
      name: "headerLogo", // required
      label: "Header Logo",
      type: "upload", // required
      relationTo: "files", // required
      required: true,
      filterOptions: {
        mimeType: { contains: "image" },
      },
    },
    {
      name: "mainMenu",
      type: "array",
      maxRows: 8,
      minRows: 8,
      fields: [
        link({
          appearances: false,
          disableDescription: true
        }),
        {
          name: "browseByPropertyType",
          type: "relationship",
          relationTo: "property-categories",
          required: false,
          hasMany: true,
          admin: {
            condition: (_, data) =>
              data?.link?.label?.toLowerCase().includes('residen') || data?.link?.label?.toLowerCase().includes('business')
          },
        },
        {
          name: "browseByLocation",
          type: "relationship",
          relationTo: "location-group-categories",
          required: false,
          hasMany: true,
          admin: {
            condition: (_, data) =>
              data?.link?.label?.toLowerCase().includes('residen') || data?.link?.label?.toLowerCase().includes('business')
          },
        },
        {
          name: "browseByBrand",
          type: "relationship",
          relationTo: "sites",
          required: false,
          hasMany: true,
          admin: {
            condition: (_, data) =>
              data?.link?.label?.toLowerCase().includes('residen') || data?.link?.label?.toLowerCase().includes('business')
          },
        },
        {
          name: 'selectedFeatures',
          type: 'select',
          hasMany: false,
          options: [
            {
              label: 'News',
              value: 'news',
            },
            {
              label: 'Projects',
              value: 'projects',
            }
          ],
          admin: {
            condition: (_, data) => !data?.link?.label?.toLowerCase().includes('about') && !data?.link?.label?.toLowerCase().includes('business')
          },
        },
        {
          name: "projectFeaturedSlug",
          type: "relationship",
          relationTo: ["projects"],
          admin: {
            condition: (_, data) => data.selectedFeatures === "projects" && (!data?.link?.label?.toLowerCase().includes('about') && !data?.link?.label?.toLowerCase().includes('business'))
          },
        },
        {
          name: "newsFeaturedSlug",
          type: "relationship",
          relationTo: ["news"],
          admin: {
            condition: (_, data) => data.selectedFeatures === "news" && (!data?.link?.label?.toLowerCase().includes('about') && !data?.link?.label?.toLowerCase().includes('business'))
          },
        },
        {
          name: "subMenu",
          type: "array",
          fields: [
            link({
              appearances: false,
            }),
            {
              name: 'selectedFeatures',
              type: 'select',
              hasMany: false,
              options: [
                {
                  label: 'News',
                  value: 'news',
                },
                {
                  label: 'Projects',
                  value: 'projects',
                }
              ],
              admin: {
                condition: (_, data) => {
                  return (data?.link?.url?.toLowerCase().includes('business') || data?.link?.url?.toLowerCase().includes('about')) || data?.link?.url?.toLowerCase().includes('pusong')
                }
              },
            },
            {
              name: "projectFeaturedSlug",
              type: "relationship",
              relationTo: ["projects"],
              admin: {
                condition: (_, data) => {
                  return (data?.link?.url?.toLowerCase().includes('business') || data?.link?.url?.toLowerCase().includes('about') || data?.link?.url?.toLowerCase().includes('pusong')) && data.selectedFeatures === "projects"
                }
              },
            },
            {
              name: "newsFeaturedSlug",
              type: "relationship",
              relationTo: ["news"],
              admin: {
                condition: (_, data) => (data?.link?.url?.toLowerCase().includes('business') || data?.link?.url?.toLowerCase().includes('about') || data?.link?.url?.toLowerCase().includes('pusong')) && data.selectedFeatures === "news"
              },
            },
          ],
          admin: {
            condition: (_d, data) => {
              const arr = ["#PusongFilinvest"];
              return arr.indexOf(data?.link?.label) < 0;
            },
            components: {
              RowLabel: ({ data }) => {
                return data?.link?.label ?? 'No Label'
              },
            },
          },
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }) => {
            return data?.link?.label ?? 'No Label'
          },
        },
      },
    },
    {
      name: "callToActionText",
      type: "text",
      required: true,
    },
    {
      name: "callToActionLink",
      type: "text",
      required: true,
    },
  ],
  versions: {
    drafts: true,
  },
};

export const AspireNavigation: GlobalConfig = {
  slug: "aspire-navigation",
  admin: {
    group: "Aspire",
    hidden: ({ user }) => {
      return !isVisible("read", "menu", "63cb9d9a313bab61401c9b2a", user);
    },
  },
  access: {
    update: isAdminOrEditor("update", "footer", "63cb9d9a313bab61401c9b2a"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
  },
  label: "Menu",
  fields: [
    {
      name: "AspireFilinvestLogo",
      type: "upload",
      relationTo: "files",
      required: true,
    },
    {
      name: "mainMenu",
      type: "array",
      maxRows: 8,
      minRows: 5,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: "projectsMegaMenu",
      type: "group",
      fields: [
        {
          name: "browseByPropertyType",
          type: "relationship",
          relationTo: "property-categories",
          required: false,
          hasMany: true,
        },
        {
          name: "browseByProvince",
          type: "relationship",
          relationTo: "location-categories",
          required: false,
          hasMany: true,
          filterOptions() {
            return {
              locationType: {
                contains: "province",
              },
            };
          },
        },
        {
          name: "browseByCity",
          type: "relationship",
          relationTo: "location-categories",
          required: false,
          hasMany: true,
          filterOptions() {
            return {
              locationType: {
                contains: "city",
              },
            };
          },
        },
      ],
    },
    {
      name: "callToActionText",
      type: "text",
      required: true,
    },
    {
      name: "callToActionLink",
      type: "text",
      required: true,
    },
  ],
  versions: {
    drafts: true,
  },
};

export const PrestigeNavigation: GlobalConfig = {
  slug: "prestige-navigation",
  admin: {
    group: "Prestige",
    hidden: ({ user }) => {
      return !isVisible("read", "menu", "63970ca74f38bc4992f1295d", user);
    },
  },
  access: {
    update: isAdminOrEditor("update", "news", "63970ca74f38bc4992f1295d"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
  },
  label: "Menu",
  fields: [
    {
      name: "PrestigeFilinvestLogo",
      type: "upload",
      relationTo: "files",
      required: true,
    },
    {
      name: "mainMenu",
      type: "array",
      maxRows: 8,
      minRows: 5,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: "projectsMegaMenu",
      type: "group",
      fields: [
        {
          name: "browseByPropertyType",
          type: "relationship",
          relationTo: "property-categories",
          required: false,
          hasMany: true,
        },
        {
          name: "browseByProvince",
          type: "relationship",
          relationTo: "location-categories",
          required: false,
          hasMany: true,
          filterOptions() {
            return {
              locationType: {
                contains: "province",
              },
            };
          },
        },
        {
          name: "browseByCity",
          type: "relationship",
          relationTo: "location-categories",
          required: false,
          hasMany: true,
          filterOptions() {
            return {
              locationType: {
                contains: "city",
              },
            };
          },
        },
      ],
    },
    {
      name: "callToActionText",
      type: "text",
      required: true,
    },
    {
      name: "callToActionLink",
      type: "text",
      required: true,
    },
  ],
  versions: {
    drafts: true,
  },
};

export const FuturaNavigation: GlobalConfig = {
  slug: "futura-navigation",
  admin: {
    group: "Futura",
    hidden: ({ user }) => {
      return !isVisible("read", "menu", "6396fc1d4f38bc4992f127a9", user);
    },
  },
  access: {
    update: isAdminOrEditor("update", "news", "6396fc1d4f38bc4992f127a9"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
  },
  label: "Menu",
  fields: [
    {
      name: "FuturaFilinvestLogo",
      type: "upload",
      relationTo: "files",
      required: true,
    },
    {
      name: "mainMenu",
      type: "array",
      maxRows: 8,
      minRows: 5,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: "projectsMegaMenu",
      type: "group",
      fields: [
        {
          name: "browseByPropertyType",
          type: "relationship",
          relationTo: "property-categories",
          required: false,
          hasMany: true,
        },
        {
          name: "browseByProvince",
          type: "relationship",
          relationTo: "location-categories",
          required: false,
          hasMany: true,
          filterOptions() {
            return {
              locationType: {
                contains: "province",
              },
            };
          },
        },
        {
          name: "browseByCity",
          type: "relationship",
          relationTo: "location-categories",
          required: false,
          hasMany: true,
          filterOptions() {
            return {
              locationType: {
                contains: "city",
              },
            };
          },
        },
      ],
    },
    {
      name: "callToActionText",
      type: "text",
      required: true,
    },
    {
      name: "callToActionLink",
      type: "text",
      required: true,
    },
  ],
  versions: {
    drafts: true,
  },
};
