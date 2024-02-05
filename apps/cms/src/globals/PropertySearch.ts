import { GlobalConfig } from "payload/types";
import propertyType from "../fields/propertyType";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrEditor, isVisible } from "../access/isAdminOrEditor";

export const PropertySearch: GlobalConfig = {
  slug: "property-search",
  access: {
    read: () => true,
    update: isAdmin,
  },
  admin: {
    group: "Filinvest",
    hidden: ({ user }) => {
      return !isVisible(
        "read",
        "property-search",
        "63db1aca51fa9424f93f6591",
        user
      );
    },
  },
  fields: [
    {
      name: "pricePoints",
      type: "array",
      fields: [
        {
          name: "point",
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "unitSizes",
      type: "array",
      fields: [
        {
          name: "sizeFrom",
          type: "number",
          required: true,
        },
        {
          name: "sizeTo",
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "propertyTypes",
      type: "array",
      fields: [propertyType()],
    },
    {
      name: "bedroomRange",
      type: "array",
      fields: [
        {
          name: "bedroomFrom",
          type: "number",
          required: true,
        },
        {
          name: "bedroomTo",
          type: "number",
          required: true,
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
};

export const AspirePropertySearch: GlobalConfig = {
  slug: "aspire-property-search",
  access: {
    update: isAdminOrEditor("update", "footer", "63cb9d9a313bab61401c9b2a"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
  },
  admin: {
    group: "Aspire",
    hidden: ({ user }) => {
      return !isVisible(
        "read",
        "property-search",
        "63cb9d9a313bab61401c9b2a",
        user
      );
    },
  },
  label: "Property Search",
  fields: [
    {
      name: "pricePoints",
      type: "array",
      fields: [
        {
          name: "point",
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "propertyTypes",
      type: "array",
      fields: [propertyType()],
    },
    {
      type: "relationship",
      name: "location",
      relationTo: ["location-categories"],
      required: true,
      hasMany: true,
    },
  ],
  versions: {
    drafts: true,
  },
};

export const PrestigePropertySearch: GlobalConfig = {
  slug: "prestige-property-search",
  access: {
    update: isAdminOrEditor("update", "news", "63970ca74f38bc4992f1295d"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
  },
  admin: {
    group: "Prestige",
    hidden: ({ user }) => {
      return !isVisible(
        "read",
        "property-search",
        "63970ca74f38bc4992f1295d",
        user
      );
    },
  },
  label: "Property Search",
  fields: [
    {
      name: "pricePoints",
      type: "array",
      fields: [
        {
          name: "point",
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "propertyTypes",
      type: "array",
      fields: [propertyType()],
    },
    {
      type: "relationship",
      name: "location",
      relationTo: ["location-categories"],
      required: true,
      hasMany: true,
    },
  ],
  versions: {
    drafts: true,
  },
};

export const FuturaPropertySearch: GlobalConfig = {
  slug: "futura-property-search",
  access: {
    update: isAdminOrEditor("update", "news", "6396fc1d4f38bc4992f127a9"),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: () => true,
  },
  admin: {
    group: "Futura",
    hidden: ({ user }) => {
      return !isVisible(
        "read",
        "property-search",
        "6396fc1d4f38bc4992f127a9",
        user
      );
    },
  },
  label: "Property Search",
  fields: [
    {
      name: "pricePoints",
      type: "array",
      fields: [
        {
          name: "point",
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "propertyTypes",
      type: "array",
      fields: [propertyType()],
    },
    {
      type: "relationship",
      name: "location",
      relationTo: ["location-categories"],
      required: true,
      hasMany: true,
    },
  ],
  versions: {
    drafts: true,
  },
};
