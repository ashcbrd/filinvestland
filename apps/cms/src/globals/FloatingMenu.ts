import { GlobalConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";

export const FloatingMenu: GlobalConfig = {
  slug: "floating-menu",
  access: {
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: "Filinvest",
    hidden: ({ user }: any) => {
      return !user.roles.includes("admin");
    },
  },
  fields: [
    {
      name: 'ZohoBot',
      type: 'group',
      fields: [
        {
          name: "zohoIcon", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },
        },
      ]
    },
    {
      name: 'HomeFilpay',
      type: 'group',
      fields: [
        {
          name: "filpayIcon", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },

        },
        {
          name: "homeFilpayLink",
          type: 'text'
        }
      ]
    },
    {
      name: 'HomeCalculator',
      type: 'group',
      fields: [
        {
          name: "homeCalculatorIcon", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },
        },
        {
          name: "homeCalculatorLink",
          type: 'text'
        }
      ]
    }
  ]
};

export const AspireFloatingMenu: GlobalConfig = {
  slug: "aspire-floating-menu",
  access: {
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: "Aspire",
    hidden: ({ user }: any) => {
      return !user.roles.includes("admin");
    },
  },
  fields: [
    {
      name: 'ZohoBot',
      type: 'group',
      fields: [
        {
          name: "zohoIcon", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },
        },
      ]
    },
    {
      name: 'HomeFilpay',
      type: 'group',
      fields: [
        {
          name: "filpayIcon", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },
        },
        {
          name: "homeFilpayLink",
          type: 'text'
        }
      ]
    },
    {
      name: 'HomeCalculator',
      type: 'group',
      fields: [
        {
          name: "homeCalculatorIcon", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },
        },
        {
          name: "homeCalculatorLink",
          type: 'text'
        }
      ]
    }
  ]
};

export const PrestigeFloatingMenu: GlobalConfig = {
  slug: "prestige-floating-menu",
  access: {
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: "Prestige",
    hidden: ({ user }: any) => {
      return !user.roles.includes("admin");
    },
  },
  fields: [
    {
      name: 'ZohoBot',
      type: 'group',
      fields: [
        {
          name: "zohoIcon", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },
        },
      ]
    },
    {
      name: 'HomeFilpay',
      type: 'group',
      fields: [
        {
          name: "filpayIcon", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },
        },
        {
          name: "homeFilpayLink",
          type: 'text'
        }
      ]
    },
    {
      name: 'HomeCalculator',
      type: 'group',
      fields: [
        {
          name: "homeCalculatorIcon", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },
        },
        {
          name: "homeCalculatorLink",
          type: 'text'
        }
      ]
    }
  ]
};
export const FuturaFloatingMenu: GlobalConfig = {
  slug: "futura-floating-menu",
  access: {
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: "Futura",
    hidden: ({ user }: any) => {
      return !user.roles.includes("admin");
    },
  },
  fields: [
    {
      name: 'ZohoBot',
      type: 'group',
      fields: [
        {
          name: "zohoIcon", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },
        },
      ]
    },
    {
      name: 'HomeFilpay',
      type: 'group',
      fields: [
        {
          name: "filpayIcon", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },
        },
        {
          name: "homeFilpayLink",
          type: 'text'
        }
      ]
    },
    {
      name: 'HomeCalculator',
      type: 'group',
      fields: [
        {
          name: "homeCalculatorIcon", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },
        },
        {
          name: "homeCalculatorLink",
          type: 'text'
        }
      ]
    }
  ]
};