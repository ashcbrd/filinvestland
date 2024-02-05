import { Block } from "payload/types";
import link from "../../fields/link";

export const AspirePropertyTypes: Block = {
  slug: "BrandsPropertyTypesSection",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subTitle",
      type: "textarea",
      required: true,
    },
    {
      name: "PropertyTypes",
      type: "array",
      maxRows: 6,
      minRows: 3,

      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
          required: true,
        },
        {
          name: "propertyTypeName",
          type: "relationship",
          required: true,
          relationTo: "property-categories",
        },
        {
          type: "array",
          name: "projects",
          required: true,
          minRows: 1,
          maxRows: 10,
          fields: [
            {
              name: "project", // required
              label: "project",
              type: "relationship",
              relationTo: "aspire-projects",
              // filterOptions: (data) => {
              //   console.log(data?.data?.content?.[1].propertyTypes);
              //   return {
              //     propertyType: {
              //       id: {
              //         equals: "63fde24c0fc85b7cf7463314",
              //       },
              //     },
              //   } as any;
              // },
            },
          ],
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
export const FuturaPropertyTypes: Block = {
  slug: "FuturaPropertyTypesSection",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subTitle",
      type: "textarea",
      required: true,
    },
    {
      name: "PropertyTypes",
      type: "array",
      maxRows: 6,
      minRows: 2,

      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
          required: true,
        },
        {
          name: "propertyTypeName",
          type: "relationship",
          required: true,
          relationTo: "property-categories",
        },
        {
          type: "upload",
          name: "coverImage",
          relationTo: "files",
          required: true,
        },
      ],
    }
  ],
};
export const PrestigePropertyTypes: Block = {
  slug: "BrandsPropertyTypesSection",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subTitle",
      type: "text",
      required: true,
    },
    {
      name: "PropertyTypes",
      type: "array",
      maxRows: 6,
      minRows: 3,

      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
          required: true,
        },
        {
          name: "propertyTypeName",
          type: "relationship",
          required: true,
          relationTo: "property-categories",
        },
        {
          type: "array",
          name: "projects",
          required: true,
          minRows: 1,
          maxRows: 10,
          fields: [
            {
              name: "project", // required
              label: "project",
              type: "relationship",
              relationTo: "prestige-projects",
              // filterOptions: (data) => {
              //   console.log(data?.data?.content?.[1].propertyTypes);
              //   return {
              //     propertyType: {
              //       id: {
              //         equals: "63fde24c0fc85b7cf7463314",
              //       },
              //     },
              //   } as any;
              // },
            },
          ],
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
