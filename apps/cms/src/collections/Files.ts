import { CollectionConfig } from "payload/types";
import { isAdminOrHasSiteAccess } from "../access/isAdminOrHasSiteAccess";
import { isLoggedIn } from "../access/isLoggedIn";
import {
  beforeValidateForDuplicate,
  uploadFilesOnS3Bucket,
} from "../utilities/hooks";

const bucket = process.env.PAYLOAD_PUBLIC_S3_BUCKET;
export const Files: CollectionConfig = {
  slug: "files",
  upload: {
    disableLocalStorage: true,
    staticURL: `https://${bucket}.s3.amazonaws.com`,
    adminThumbnail: ({ doc }) => {
      switch (doc.mimeType) {

        case 'application/pdf':
          return 'https://filinvest-bucket-stg.s3.amazonaws.com/pdf.png'

        default:
          return `https://${bucket}.s3.amazonaws.com/${doc.filename}`
      }
    },
  },

  admin: {
    group: "Other",
    disableDuplicate: true,
  },
  // hooks: {
  //   beforeValidate: [beforeValidateForDuplicate("files")],
  // },
  hooks: {
    beforeChange: [uploadFilesOnS3Bucket],
  },
  access: {
    // Anyone logged in can create
    create: isLoggedIn,
    // Only admins or editors with site access can update
    update: isAdminOrHasSiteAccess(),
    // Only admins or editors with site access can read
    read: () => true,
    // Only admins or editors with site access can delete
    delete: isAdminOrHasSiteAccess(),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: false,
    },
    {
      name: "site",
      type: "relationship",
      relationTo: "sites",
      required: false,
      // If user is not admin, set the site by default
      // to the first site that they have access to
      defaultValue: ({ user }) => {
        if (!user?.roles?.includes("admin") && user?.sites?.[0]) {
          return user?.sites[0];
        }
      },
    },
  ],
};
