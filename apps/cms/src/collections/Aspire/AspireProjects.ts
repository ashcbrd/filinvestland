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

export const AspireProjects: CollectionConfig = {
  slug: "aspire-projects",
  labels: { singular: "Project", plural: "Projects" },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeRead: [beforeReadHook],
  },
  access: {
    // Anyone logged in can create
    create: isAdminOrEditor("create", "projects", "63cb9d9a313bab61401c9b2a"),
    // Only admins or editors with site access can update
    update: isAdminOrEditor("update", "projects", "63cb9d9a313bab61401c9b2a"),
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
    delete: isAdminOrEditor("delete", "projects", "63cb9d9a313bab61401c9b2a"),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      label: 'Descriptive Overview',
      required: false,
    },
    slugField(),
    {
      name: "headerImage",
      label: "Header Image (Size: 1922x656)",
      type: "upload",
      relationTo: "files",
      required: true,
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
      defaultValue: 0,
    },
    {
      name: "maxPrice",
      type: "number",
      label: "Max Price",
      // required: true,
      defaultValue: 0,
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
      name: "siteDevelopmentPlan",
      type: "group",
      fields: [
        {
          name: "developmentPlanRichText",
          type: "richText",
          label: "Site Development Plan",
          required: false
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
          defaultValue: 0,
        },
        {
          name: "minSize",
          label: "Min size (sqm)",
          type: "number",
          required: true,
          defaultValue: 0,
        },
        {
          name: "maxSize",
          label: "Max size (sqm)",
          type: "number",
          required: true,
          defaultValue: 0,
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

    // {
    //   type: "array",
    //   name: "locationItemLists",
    //   minRows: 1,
    //   required: true,
    //   fields: [
    //     {
    //       name: "item",
    //       type: "text",
    //       required: true,
    //     },
    //   ],
    // },
    {
      name: "featuresAndAmenities",
      type: "group",
      fields: [
        {
          name: "amenities",
          label: " ",
          type: "group",
          fields: [
            {
              name: "descriptionRichText",
              type: "richText",
              required: false,
            },
            {
              name: "amenities",
              label: " ",
              type: "array",
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: false,
                },
                {
                  name: "features",
                  type: "array",
                  label: " ",
                  fields: [
                    {
                      name: "icon",
                      type: "upload", // required
                      relationTo: "files", // required
                      filterOptions: {
                        mimeType: { contains: "image" },
                      },
                      access: {
                        read: () => true,
                      },
                    },
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
          ],
        },

        {
          name: "featuredVideo", // required
          type: "upload", // required
          relationTo: "files", // required
          filterOptions: {
            mimeType: { contains: "video" },
          },
          access: {
            read: () => true,
          },
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
          type: 'text'
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
    {
      type: "group",
      name: "productOffering",
      label: "Product Offering",
      fields: [
        {
          name: "description",
          type: "textarea",
          required: false,
        },
        {
          name: "oferrings",
          type: "array",
          required: false,
          fields: [
            {
              name: "title",
              type: "text",
              required: false,
            },
            {
              name: "image",
              label: "Image (Size: 1920x833)",
              type: "upload",
              relationTo: "files",
            },

            {
              name: "Specification",
              type: "array",
              fields: [
                {
                  name: "name",
                  type: "text",
                },
                {
                  name: "value",
                  type: "text",
                },
              ],
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
      type: "text",
      required: false,
    },
    {
      name: "virtualTourWelcomeText",
      type: "text",
      required: false,
    },
    // {
    //   name: "projectFooter",
    //   type: "group",
    //   fields: [
    //     {
    //       name: "action1",
    //       type: "group",
    //       label: "CTA 1",
    //       fields: [
    //         {
    //           name: "image", // required
    //           type: "upload", // required
    //           relationTo: "files", // required
    //           filterOptions: {
    //             mimeType: { contains: "image" },
    //           },
    //           access: {
    //             read: () => true,
    //           },
    //         },
    //         {
    //           name: "description",
    //           type: "text",
    //           defaultValue: "See and tour the property!",
    //         },
    //         {
    //           name: "callToActionText",
    //           type: "text",
    //           defaultValue: "schedule trip",
    //         },
    //         {
    //           name: "callToActionLink",
    //           type: "text",
    //         },
    //       ],
    //     },
    //     {
    //       name: "action2",
    //       type: "group",
    //       label: "CTA 2",
    //       admin: {
    //         style: {
    //           marginTop: "20px",
    //         },
    //       },
    //       fields: [
    //         {
    //           name: "image", // required
    //           type: "upload", // required
    //           relationTo: "files", // required
    //           filterOptions: {
    //             mimeType: { contains: "image" },
    //           },
    //           access: {
    //             read: () => true,
    //           },
    //         },
    //         {
    //           name: "description",
    //           type: "text",
    //           defaultValue: "Does this home fit your preferences?",
    //         },
    //         {
    //           name: "callToActionText",
    //           type: "text",
    //           defaultValue: "calculate now",
    //         },
    //         {
    //           name: "callToActionLink",
    //           type: "text",
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      type: "array",
      name: "onlineBrochure",
      fields: [
        {
          name: "Title",
          type: "text",
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "thumbnail",
          type: "upload",
          relationTo: "files",
          required: false,
        },
        {
          name: "brochureFile",
          type: "upload",
          relationTo: "files",
        },
      ],
    },
    {
      name: "SeeAndTour",
      label: " ",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
        },
        { name: "description", type: "text" },
        { name: "callToActionLink", type: "text" },
        {
          name: "Images",
          type: "array",
          fields: [
            {
              name: "image",
              label: " ",
              type: "upload",
              relationTo: "files",
              filterOptions: {
                mimeType: { contains: "image" },
              },
            },
          ],
        },
      ],
    },
    {
      name: "projectFooter",
      type: "group",
      fields: [
        {
          name: "FooterCover", // required
          type: "upload", // required
          relationTo: "files", // required
          filterOptions: {
            mimeType: { contains: "image" },
          },
        },
        {
          name: "title",
          type: "text",
          defaultValue: "Does this home fit your preference?",
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "callToActionText",
          type: "text",
          defaultValue: "Calculate Now",
        },
        {
          name: "callToActionLink",
          type: "text",
        },
      ],
    },
    {
      name: "updatedAt",
      label: "Last Modified",
      type: "date",
      admin: {
        hidden: true,
      },
    },
  ],

  admin: {
    useAsTitle: "title",
    group: "Aspire",
    preview: (doc) => {
      if (doc?.slug) {
        return `${process.env.PAYLOAD_PUBLIC_ASPIRE_URL}/project/${doc.slug}`;
      }

      return null;
    },
    hidden: ({ user }) => {
      return !isVisible("read", "projects", "63cb9d9a313bab61401c9b2a", user);
    },
  },
  // endpoints: [
  //   {
  //     path: "http://localhost:9000/api/aspire-projects/:id",
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
};
