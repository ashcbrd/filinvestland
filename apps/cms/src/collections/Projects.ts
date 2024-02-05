import { CollectionConfig } from "payload/types";
import { slugField } from "../fields/slug";
import { beforeValidateForDuplicate } from "../utilities/hooks";
import { getPermission, Permissions } from "../access/Permission";
import { isVisible } from "../access/isAdminOrEditor";

export const Projects: CollectionConfig = {
  slug: "projects",
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [beforeValidateForDuplicate("projects")],
  },
  access: {
    // Anyone logged in can create
    create: getPermission(Permissions.admin | Permissions.editor),
    // Only admins or editors with site access can update
    update: getPermission(
      Permissions.admin | Permissions.editor | Permissions.siteAccess
    ),
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
    delete: getPermission(Permissions.admin | Permissions.siteAccess),
  },
  fields: [
    {
      name: "dataType",
      type: "select",
      defaultValue: "regular",
      hasMany: false,
      options: [
        {
          label: "Regular",
          value: "regular",
        },
        {
          label: "Office",
          value: "office",
        },
        {
          label: "Office Park",
          value: "office park",
        },
        {
          label: "Corporate Center",
          value: "corporate center",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "title",
      type: "text",
      required: false,
    },
    slugField(),
    {
      name: "headerImage",
      label: "Header Image (Size: 1922x656)",
      type: "upload",
      relationTo: "files",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType !== "office park",
      },
    },
    {
      name: "logo",
      label: "Logo (Height: 100px)",
      type: "upload",
      relationTo: "files",
    },
    {
      name: "price",
      type: "number",
      // required: true,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType !== "office park",
      },
      defaultValue: -1,
    },
    {
      type: "row",
      fields: [
        {
          name: "numberOfStaffRoom",
          type: "number",
          required: false,
          admin: {
            condition: (_, siblingsData) => siblingsData.dataType === "office",
          },
        },
        {
          name: "numberOfBathrooms",
          type: "number",
          required: false,
          admin: {
            condition: (_, siblingsData) => siblingsData.dataType === "office",
          },
        },
      ],
    },
    {
      name: "numberOfBedrooms",
      type: "number",
      admin: {
        condition: (_, siblingsData) =>
          siblingsData.dataType === "regular" ||
          siblingsData.dataType === "corporate center",
      },
      defaultValue: -1,
    },
    {
      name: "address1",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office",
      },
    },
    {
      name: "address2",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office",
      },
    },
    {
      name: "floor",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office",
      },
    },
    {
      name: "wall",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office",
      },
    },
    {
      name: "ceiling",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office",
      },
    },
    {
      name: "heightClearance",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office",
      },
    },
    {
      name: "VRF",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office",
      },
    },
    {
      name: "elevator",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office",
      },
    },
    {
      name: "telephone",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office",
      },
    },
    {
      name: "powerInput",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office",
      },
    },
    {
      name: "powerOutput",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office",
      },
    },
    {
      name: "people",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: false,
      admin: {
        condition: (_, siblingsData) =>
          siblingsData.dataType === "office" ||
          siblingsData.dataType === "office park",
      },
    },
    {
      name: "projectType",
      type: "relationship",
      relationTo: "project-categories",
      required: false,
    },
    {
      name: "propertyType",
      type: "relationship",
      relationTo: "property-categories",
      required: false
    },
    {
      name: "size",
      label: "Size (sqm)",
      type: "number",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType !== "office park",
      },
      defaultValue: -1,
    },
    {
      name: "coverImage",
      label: "Cover Image (Size: 1920x833)",
      type: "upload",
      relationTo: "files",
      required: false,
    },
    {
      type: "array",
      name: "imageGallery",
      label: "Image Gallery",
      fields: [
        {
          name: "image",
          label: "Image (Size: 1920x833)",
          type: "upload",
          relationTo: "files",
        },
      ],
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType !== "office park",
      },
    },
    {
      name: "shortDescription",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType !== "office park",
      },
    },
    {
      name: "sustainabilityFeatureTitle",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office park",
      },
    },
    {
      name: "sustainabilityFeatureDescription",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office park",
      },
    },
    {
      type: "array",
      name: "sustainabilityFeatureItemLists",
      minRows: 1,
      required: false,
      fields: [
        {
          name: "item",
          type: "text",
          required: false,
        },
      ],
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office park",
      },
    },
    {
      type: "array",
      name: "sustainabilityFeatureTitleDescription",
      minRows: 1,
      required: false,
      fields: [
        {
          name: "title",
          type: "text",
          required: false,
        },
        {
          name: "description",
          type: "text",
          required: false,
        },
      ],
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office park",
      },
    },
    {
      type: "array",
      name: "amenitiesTitleDescription",
      minRows: 1,
      required: false,
      fields: [
        {
          name: "title",
          type: "text",
          required: false,
        },
        {
          name: "description",
          type: "text",
        },
      ],
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office park",
      },
    },
    {
      name: "locationDescription",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office park",
      },
    },
    {
      type: "array",
      name: "locationItemLists",
      minRows: 1,
      required: false,
      fields: [
        {
          name: "item",
          type: "text",
          required: false,
        },
      ],
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType === "office park",
      },
    },
    {
      name: "overview",
      type: "richText",
      required: false,
      admin: {
        condition: (_, siblingsData) =>
          siblingsData.dataType === "regular" ||
          siblingsData.dataType === "corporate center",
      },
    },
    {
      name: "featuresTab",
      type: "richText",
      admin: {
        condition: (_, siblingsData) =>
          siblingsData.dataType === "regular" ||
          siblingsData.dataType === "corporate center",
      },
    },
    {
      name: "specificationTab",
      type: "richText",
      admin: {
        condition: (_, siblingsData) =>
          siblingsData.dataType === "regular" ||
          siblingsData.dataType === "corporate center",
      },
    },
    {
      name: "locationTab",
      type: "richText",
      required: false,
      admin: {
        condition: (_, siblingsData) =>
          siblingsData.dataType === "regular" ||
          siblingsData.dataType === "corporate center",
      },
    },
    {
      name: "locationGroup",
      type: "relationship",
      relationTo: "location-group-categories",
      required: false,
    },
    {
      name: "location",
      type: "relationship",
      relationTo: "location-categories",
      required: false,
      filterOptions({ data }) {
        return {
          locationGroup: {
            equals: data.locationGroup,
          },
        };
      },
    },
    {
      name: "subLocationTwo",
      label: "Sub Location",
      type: "relationship",
      relationTo: "sub-location-categories",
      filterOptions({ data }) {
        if (typeof window == "undefined") {
          return {};
        } else
          return {
            location: {
              equals: data.location,
            },
          };
      },
    },
    {
      name: "status",
      type: "relationship",
      relationTo: "project-status-categories",
    },
    // {
    //   name: "mapImage",
    //   type: "upload",
    //   relationTo: "files",
    //   required: true,
    //   admin: {
    //     condition: (_, siblingsData) => siblingsData.dataType !== "office park",
    //   },
    // },
    {
      type: "group",
      name: "coordinates",
      label: "Map Location",
      fields: [
        {
          name: "latitude",
          type: "number",
          required: false,
        },
        {
          name: "longitude",
          type: "number",
          required: false,
        },
      ],
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType !== "office park",
      },
    },
    {
      name: "landmarks",
      type: "richText",
      admin: {
        condition: (_, siblingsData) =>
          siblingsData.dataType === "regular" ||
          siblingsData.dataType === "corporate center",
      },
    },
    {
      name: "floorPlan",
      type: "richText",
      admin: {
        condition: (_, siblingsData) =>
          siblingsData.dataType === "regular" ||
          siblingsData.dataType === "corporate center",
      },
    },
    {
      name: "floorPlanImage",
      type: "upload",
      relationTo: "files",
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType !== "office park",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "managerName",
          type: "text",
          required: false,
          admin: {
            condition: (_, siblingsData) => siblingsData.dataType === "office",
          },
        },
        {
          name: "managerPhoto",
          type: "upload",
          relationTo: "files",
          required: false,
          admin: {
            condition: (_, siblingsData) => siblingsData.dataType === "office",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "managerPhone",
          type: "text",
          required: false,
          admin: {
            condition: (_, siblingsData) => siblingsData.dataType === "office",
          },
        },
        {
          name: "managerEmail",
          type: "text",
          required: false,
          admin: {
            condition: (_, siblingsData) => siblingsData.dataType === "office",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "managerFacebookLink",
          type: "text",
          required: false,
          admin: {
            condition: (_, siblingsData) => siblingsData.dataType === "office",
          },
        },
        {
          name: "managerLinkedinLink",
          type: "text",
          required: false,
          admin: {
            condition: (_, siblingsData) => siblingsData.dataType === "office",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "relatedOffice1",
          label: "Related Office 1",
          type: "relationship",
          relationTo: "projects",
          required: false,
          admin: {
            condition: (_, siblingsData) => siblingsData.dataType === "office",
          },
        },
        {
          name: "relatedOffice2",
          label: "Related Office 2",
          type: "relationship",
          relationTo: "projects",
          required: false,
          admin: {
            condition: (_, siblingsData) => siblingsData.dataType === "office",
          },
        },
        {
          name: "relatedOffice3",
          label: "Related Office 3",
          type: "relationship",
          relationTo: "projects",
          required: false,
          admin: {
            condition: (_, siblingsData) => siblingsData.dataType === "office",
          },
        },
      ],
    },
    {
      name: "site",
      type: "relationship",
      relationTo: "sites",
      required: false,
      admin: {
        position: "sidebar",
      },
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
    {
      name: "updatedAt",
      label: "Last Modified",
      type: "date",
      admin: {
        hidden: true,
      },
    },
    // {
    //   name: "featuredLabel",
    //   type: "relationship",
    //   relationTo: "aspire-featured-projects",
    //   required: true,
    //   admin: {
    //     position: "sidebar",
    //     readOnly: true,
    //   },

    // },
  ],
  admin: {
    useAsTitle: "title",
    group: "Filinvest",
    preview: (doc) => {
      if (doc?.slug) {
        return `${process.env.PAYLOAD_PUBLIC_LAND_URL}/projects/${doc.slug}`;
      }

      return null;
    },
    hidden: ({ user }) => {
      return !isVisible("read", "projects", "63db1aca51fa9424f93f6591", user);
    },
  },
};
