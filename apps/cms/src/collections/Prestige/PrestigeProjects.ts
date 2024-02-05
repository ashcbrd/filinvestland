import { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";
import {
  beforeValidateForDuplicate,
  beforeReadHook,
} from "../../utilities/hooks";
import { getPermission, Permissions } from "../../access/Permission";
import payload from "payload";
import qs from "qs";
import { isAdminOrEditor } from "../../access/isAdminOrEditor";
import { isVisible } from "../../access/isAdminOrEditor";

export const PrestigeProjects: CollectionConfig = {
  slug: "prestige-projects",
  labels: { singular: "Project", plural: "Projects" },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeRead: [beforeReadHook],
  },
  access: {
    create: isAdminOrEditor("create", "projects", "63970ca74f38bc4992f1295d"),
    // Only admins or editors with site access can update
    update: isAdminOrEditor("update", "projects", "63970ca74f38bc4992f1295d"),
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
    delete: isAdminOrEditor("delete", "projects", "63970ca74f38bc4992f1295d"),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "cardDescription",
      label: 'Project Card Display Text',
      type: "textarea",
      admin: {
        description: 'This text serves as a description visible when project is shown in a card format.'
      },
      required: true,
    },
    {
      name: "descriptiveOverview",
      type: "richText",
      required: true,
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
          label: 'Floor Plan Image',
          type: "array",
          maxRows: 1,
          minRows: 1,
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
      name: "PropertyImages",
      type: "array",
      label: "Gallery",
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
      name: "parralaxGallery",
      type: "array",
      label: "Parallax Gallery",
      required: false,
      maxRows: 2,
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
    //   type: "group",
    //   name: "productOffering",
    //   label: "Product Offering",
    //   fields: [
    //     {
    //       name: "description",
    //       type: "text",
    //       required: false,
    //     },
    //     {
    //       name: "gallery",
    //       type: "array",
    //       fields: [
    //         {
    //           name: "image",
    //           label: "Image (Size: 1920x833)",
    //           type: "upload",
    //           relationTo: "files",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   name: "featuresAndAmenities",
    //   type: "group",
    //   fields: [
    //     {
    //       name: "context",
    //       type: "richText",
    //     },
    //     {
    //       name: "amenities",
    //       label: "Features and Amenities",
    //       type: "array",
    //       required: true,
    //       fields: [
    //         {
    //           name: "Amenity",
    //           type: "relationship",
    //           relationTo: "features-and-amenities-category",
    //           required: true,
    //         },
    //         {
    //           name: "Count",
    //           type: "text",
    //           required: true,
    //         },
    //       ],
    //     },

    //     {
    //       name: "featuredVideo", // required
    //       type: "upload", // required
    //       relationTo: "files", // required
    //       filterOptions: {
    //         mimeType: { contains: "video" },
    //       },
    //       access: {
    //         read: () => true,
    //       },
    //     },
    //   ],
    // },
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
          name: "virtualTourEmbedType",
          type: "select",
          defaultValue: "url",
          hasMany: false,
          options: [
            {
              label: "Url",
              value: "url",
            },
            {
              label: "File",
              value: "file",
            },
          ],
        },
        {
          name: "virtualTourEmbedUrl",
          type: "text",
          label: ' ',
          required: false,
          admin:{
            condition: (_, siblingsData)=>  siblingsData.virtualTourEmbedType === 'url'
          }
        },
        {
          name: "upload", // required
          type: "upload", // required
          label:"File/Application",
          relationTo: "files", // required
          admin:{
            description:"The file's mimetype should be either zip or rar.",
            condition: (_, siblingsData)=>  siblingsData.virtualTourEmbedType === 'file'
          },
          required:true
        },
        {
          name: "rootFile",
          type: "text",
          label: ' ',
          required: true,
          admin:{
            condition: (_, siblingsData)=>  siblingsData.virtualTourEmbedType === 'file',
            description:"The main or root file of the application, e.g., virtual.html.",
          }
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
    {
      name: "ViewFloorplans",
      type: "array",
      fields: [
        {
          name: "floorPlanImage",
          type: "upload",
          relationTo: "files",
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
  ],
  // endpoints: [
  //   {
  //     path: "http://localhost:9000/api/prestige-projects/:id",
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
    group: "Prestige",
    preview: (doc) => {
      if (doc?.slug) {
        return `${process.env.PAYLOAD_PUBLIC_PRESTIGE_URL}/project/${doc.slug}`;
      }

      return null;
    },
    hidden: ({ user }) => {
      return !isVisible("read", "projects", "63970ca74f38bc4992f1295d", user);
    },
  },
};
