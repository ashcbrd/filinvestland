import { Block } from "payload/types";

const FilesListing: Block = {
  slug: "files-listing",
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      type: "array",
      name: "Files",
      required: true,
      fields: [
        {
          type: "text",
          name: "year",
          required: false,
        },
        {
          type: "array",
          name: "file",
          required: true,
          fields: [
            {
              type: "text",
              name: "name",
              required: true,
            },
            {
              type: "upload",
              name: "file",
              relationTo: "files",
              required: true,
            },
          ],
          admin: {
            components: {
              RowLabel: ({ data }) => {
                return data?.name ?? 'No Label'
              },
            },
          },
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }) => {
            return data?.year ?? 'No Label'
          },
        },
      },
    },

  ],
  imageURL: 'https://filinvest-bucket-stg.s3.amazonaws.com/files-listing.PNG'
};

export default FilesListing;
