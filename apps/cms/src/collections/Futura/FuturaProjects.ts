import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import {
  beforeValidateForDuplicate,
  beforeReadHook,
} from "../../utilities/hooks";
import { getPermission, Permissions } from "../../access/Permission";
import payload from "payload";
import qs from "qs";
import { isAdminOrEditor, isVisible } from "../../access/isAdminOrEditor";

export const FuturaProjects: CollectionConfig = {
  slug: "futura-projects",
  labels: { singular: "Project", plural: "Projects" },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeRead: [beforeReadHook],
  },
  access: {
    // Anyone logged in can create
    create: isAdminOrEditor("create", "projects", "6396fc1d4f38bc4992f127a9"),
    // Only admins or editors with site access can update
    update: isAdminOrEditor("update", "projects", "6396fc1d4f38bc4992f127a9"),
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
    delete: isAdminOrEditor("delete", "projects", "6396fc1d4f38bc4992f127a9"),
  },
  fields: [

    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "descriptiveOverview",
      type: "richText",
      required: false,
    },
    slugField(),
    {
      name: "headerImage",
      label: "Header Image (Size: 1922x656)",
      type: "upload",
      relationTo: "files",
      required: false,
    },
    {
      name: "logo",
      label: "Logo (Height: 100px)",
      type: "upload",
      relationTo: "files",
    },
    {
      name: "minPrice",
      label: "Min Price",
      type: "number",
      // required: true,
      admin: {
        condition: (_, siblingsData) => siblingsData.dataType !== "office park",
      },
      defaultValue: -1,
    },
    {
      name: "maxPrice",
      type: "number",
      label: "Max Price",
      // required: true,
      defaultValue: -1,
    },
    {
      name: "locationGroup",
      type: "relationship",
      relationTo: "location-group-categories",
      required: true,
    },
    {
      name: "location",
      type: "relationship",
      relationTo: "location-categories",
      required: true,
      filterOptions({ data }) {
        console.log(data);
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
      name: "propertyType",
      type: "relationship",
      relationTo: "property-categories",
      required: false,
    },
    {
      name: "propertyDetails",
      label: "Property Details",
      type: "group",

      fields: [
        {
          name: "projectType",
          type: "relationship",
          relationTo: "project-categories",
          required: true,
        },
        {
          name: "numberOfBedrooms",
          type: "number",
          defaultValue: -1,
        },
        {
          name: "minSize",
          label: "Min size (sqm)",
          type: "number",
          required: true,
          defaultValue: -1,
        },
        {
          name: "maxSize",
          label: "Max size (sqm)",
          type: "number",
          required: true,
          defaultValue: -1,
        },
        {
          name: "status",
          type: "relationship",
          relationTo: "project-status-categories",
        },
      ],
    },
    {
      name: "PropertyImages",
      type: "array",
      required: false,
      maxRows: 5,
      fields: [
        {
          name: "image", // required
          type: "upload", // required
          relationTo: "files", // required
          filterOptions: {
            mimeType: { contains: "image" },
          },
          access: {
            read: () => true,
          },
        },
      ],
    },

    {
      name: "featuresAndAmenities",
      type: "group",
      fields: [
        {
          name: "context",
          type: "richText",
        },
        {
          name: "amenities",
          label: "Features and Amenities",
          type: "array",
          required: true,
          fields: [
            {
              name: "Amenity",
              type: "relationship",
              relationTo: "features-and-amenities-category",
              required: true,
            },
            {
              name: "Count",
              type: "text",
              required: true,
            },
          ],
        },
      ],
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
      name: "productOffering",
      label: "Product Offering",
      fields: [
        {
          name:'title',
          type:'text',
          required:false
        },
        {
          name: "description",
          type: "textarea",
          required: false,
        },
        {
          name: "gallery",
          type: "array",
          fields: [
            {
              name: "image",
              label: "Image (Size: 1920x833)",
              type: "upload",
              relationTo: "files",
            },
            {
              name: "description",
              type: "text",
              required: false,
            },
          ],
        },
      ],
    },
    {
      name: "isVirtualTour",
      type: 'text',
      required: true,
      defaultValue: "false",
      hooks: {
        beforeChange: [(args) => {
          const {
            data, // Typed as a Partial of your ExampleDocumentType
          } = args

          if (data?.virtualTourEmbedUrls.length) {
            return "true"
          }

          return "false"
        }],
      },
      admin: {
        hidden: true
      }
    },   
    {
      name: "virtualTourEmbedUrls",
      type: 'array',
      required: false,
      fields: [
        {
          name: "virtualTourEmbedUrl",
          type: "text",
          label: ' ',
          required: false,
        },
      ],
    },
    {
      name: "virtualTourDescription",
      type: "textarea",
      required: false,
    },
    {
      name: "virtualTourWelcomeText",
      type: "text",
      required: false,
    },
    {
      name: "siteDevelopmentPlan",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "floorPlanImages",
          type: "array",
          fields: [
            {
              name: "floorPlanImage", // required
              label: " ",
              type: "upload", // required
              relationTo: "files", // required
              required: true,
              filterOptions: {
                mimeType: { contains: "image" },
              },
            },
          ],
          required: false,
        },
      ],
    },

    {
      type: "group",
      name: "coordinates",
      label: "Map Location",
      fields: [
        {
          name: "latitude",
          type: "number",
          required: true,
        },
        {
          name: "longitude",
          type: "number",
          required: true,
        },
      ],
    },
    // {
    //   name: "site",
    //   type: "relationship",
    //   relationTo: "sites",
    //   required: true,
    //   admin: {
    //     hidden: true,
    //   },
    //   // If user is not admin, set the site by default
    //   // to the first site that they have access to
    // },
    {
      name: "updatedAt",
      label: "Last Modified",
      type: "date",
      admin: {
        hidden: true,
      },
    },
    {
      name: "whatIsNearby",
      label: 'What’s Nearby',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'What’s Nearby'
        },
        {
          name: 'description',
          type: 'textarea'
        },
        {
          name: 'nearbyLocation',
          type: 'array',
          fields: [
            {
              name: 'placeName',
              type: 'relationship',
              relationTo: 'place-categories'
            },
            {
              name: 'longitude',
              type: 'number'
            },
            {
              name: 'Latitude',
              type: 'number'
            },
          ]
        }
      ]
    },
  ],
  // endpoints: [
  //   {
  //     path: "http://localhost:9000/api/futura-projects/:id",
  //     method: "get",
  //     handler: async (req, res, next) => {
  //       const query = qs.stringify(req?.query);

  //       console.log("test")
  //       console.log(query);
  //       const posts = await payload.find({
  //         collection: "projects",
  //         sort: "-createdAt",
  //       });
  //       res.status(200).send(posts);
  //     },
  //   },
  // ],
  admin: {
    useAsTitle: "title",
    group: "Futura",
    preview: (doc) => {
      if (doc?.slug) {
        return `${process.env.PAYLOAD_PUBLIC_FUTURA_URL}/project/${doc.slug}`;
      }

      return null;
    },
    hidden: ({ user }) => {
      return !isVisible("read", "projects", "6396fc1d4f38bc4992f127a9", user);
    },
  },
};
