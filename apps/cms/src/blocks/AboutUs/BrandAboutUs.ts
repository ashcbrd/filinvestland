import { Block } from "payload/types";

const BrandAboutUsSection: Block = {
  slug: "BrandAboutUsSection",
  fields: [
    {
      name: "backgroundType", // required
      label: "Use for background",
      type: "radio", // required
      options: [
        // required
        {
          label: "Image",
          value: "image",
        },
        {
          label: "Video",
          value: "video",
        },
        {
          label: "YouTube",
          value: "youtube",
        },
        {
          label: "Vimeo",
          value: "vimeo",
        },
      ],
      defaultValue: "image", // The first value in options.
      admin: {
        layout: "horizontal",
      },
    },
    {
      name: "title",
      type: "text",
      required: false,
    },
    {
      name: "subTitle",
      type: "textarea",
      required: false,
    },
    {
      name: "mediaBackground", // required
      label: "Image Background",
      type: "upload", // required
      relationTo: "files", // required
      required: false,
      access: {
        read: () => true,
      },
      admin: {
        condition: (data) => {
          return data.content?.[0]?.backgroundType === "image";
        },
      },
    },
    {
      name: "videoBackground", // required
      type: "upload", // required
      relationTo: "files", // required
      filterOptions: {
        mimeType: { contains: "video" },
      },
      access: {
        read: () => true,
      },
      admin: {
        condition: (data) => {
          return data.content?.[0]?.backgroundType === "video";
        },
      },
    },
    {
      name: "youtubeBackground",
      label:
        "YouTube Video Background (i.e. https://www.youtube.com/watch?v=lQ6Yrf_5EOw)",
      type: "text",
      admin: {
        condition: (data) => {
          return data.content?.[0]?.backgroundType === "youtube";
        },
      },
    },
    {
      name: "vimeoBackground",
      label: "Vimeo Video Background (i.e. https://vimeo.com/266448492)",
      type: "text",
      admin: {
        condition: (data) => {
          return data.content?.[0]?.backgroundType === "vimeo";
        },
      },
    },
    {
      type: "group",
      name: "firstSection",
      fields: [
        {
          name: "title",
          type: "text",
          required: false,
        },
        {
          name: "overviewDescription",
          type: "richText",
          required: false,
        },
        {
          name: "image1",
          label: "image 1",
          type: "upload",
          relationTo: "files",
          required: false,
        },
        {
          name: "image2",
          label: "image 2",
          type: "upload",
          relationTo: "files",
          required: false,
        },
      ],
    },
    {
      name: "CommunityAndHealth",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: false,
        },
        {
          name: "content",
          type: "array",
          maxRows: 15,
          minRows: 0,
          fields: [
            {
              name: "Image", // required
              label: "Image",
              type: "upload", // required
              relationTo: "files", // required
              required: false,
              filterOptions: {
                mimeType: { contains: "image" },
              },
              access: {
                read: () => true,
              },
            },
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
        },
      ],
    },

    {
      name: "Awards",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: false,
        },
        {
          name: "awardDescription",
          type: "text",
          required: false,
        },
        {
          name: "Content",
          type: "array",
          maxRows: 15,
          minRows: 0,
          fields: [
            {
              name: "Image", // required
              label: "Image",
              type: "upload", // required
              relationTo: "files", // required
              required: false,
              filterOptions: {
                mimeType: { contains: "image" },
              },
              access: {
                read: () => true,
              },
            },
            {
              name: "title",
              type: "text",
              required: false,
            },
            {
              name: "subTitle",
              type: "text",
              required: false,
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
      name: "Testimonials",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: false,
        },
        {
          name: "Content",
          type: "array",
          maxRows: 15,
          minRows: 0,
          fields: [
            {
              name: "Name",
              type: "text",
              required: false,
            },
            {
              name: "ProfileImage", // required
              label: "Image",
              type: "upload", // required
              relationTo: "files", // required
              required: false,
              filterOptions: {
                mimeType: { contains: "image" },
              },
              access: {
                read: () => true,
              },
            },
            {
              name: "comment",
              type: "text",
              required: false,
            },
            {
              name: "OptionalImage", // required
              label: "OptionalImage",
              type: "upload", // required
              relationTo: "files", // required
              required: false,
              filterOptions: {
                mimeType: { contains: "image" },
              },
              access: {
                read: () => true,
              },
            },
          ],
        },
      ],
    },
  ],
};

export default BrandAboutUsSection;
