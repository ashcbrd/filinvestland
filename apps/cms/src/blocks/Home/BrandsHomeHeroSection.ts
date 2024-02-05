import { Block } from "payload/types";

const BrandsHomeHeroSection: Block = {
  slug: "BrandsHomeHeroSection",
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
      required: true,
    },
    {
      name: "subTitle",
      type: "textarea",
      required: true,
    },
    {
      name: "callToActionText",
      label: "Call To Action Text (optional)",
      type: "text",
      required: false,
    },
    {
      name: "callToActionLink",
      label: "Call To Action Link (optional)",
      type: "text",
      required: false,
    },
    {
      name: "mediaBackground", // required
      label: "Image Background",
      type: "upload", // required
      relationTo: "files", // required
      required: true,
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
      type: "array",
      name: "imageBackgrounds",
      required: false,
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: "mediaBackground2", // required
          label: "Image Background",
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
      ],
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
      type: "array",
      name: "videoBackgrounds",
      required: false,
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: "videoBackground2", // required
          label: "Video Background",
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
      type: "array",
      name: "youtubeBackgrounds",
      required: false,
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: "youtubeBackground2",
          label:
            "YouTube Video Background (i.e. https://www.youtube.com/watch?v=lQ6Yrf_5EOw)",
          type: "text",
        },
      ],
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
      type: "array",
      name: "vimeoBackgrounds",
      required: false,
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: "vimeoBackground2",
          label: "Vimeo Video Background (i.e. https://vimeo.com/266448492)",
          type: "text",
        },
      ],
      admin: {
        condition: (data) => {
          return data.content?.[0]?.backgroundType === "vimeo";
        },
      },
    },
  ],
};

export default BrandsHomeHeroSection;
