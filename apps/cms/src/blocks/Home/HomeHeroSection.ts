import { Block } from "payload/types";

const HomeHeroSection: Block = {
  slug: "homeHeroSection",
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
      name: "mediaBackground", // required
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
    {
      type: "array",
      name: "imageBackgrounds",
      required: true,
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
    },
    {
      type: "array",
      name: "videoBackgrounds",
      required: true,
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
    },
    {
      name: "youtubeBackground",
      label:
        "YouTube Video Background (i.e. https://www.youtube.com/watch?v=lQ6Yrf_5EOw)",
      type: "text",
    },
    {
      type: "array",
      name: "youtubeBackgrounds",
      required: true,
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
    },
    {
      name: "vimeoBackground",
      label: "Vimeo Video Background (i.e. https://vimeo.com/266448492)",
      type: "text",
    },
    {
      type: "array",
      name: "vimeoBackgrounds",
      required: true,
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: "vimeoBackground2",
          label: "Vimeo Video Background (i.e. https://vimeo.com/266448492)",
          type: "text",
        },
      ],
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "prestigeImage", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          access: {
            read: () => true,
          },
        },
        {
          name: "prestigeLogo", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          access: {
            read: () => true,
          },
        },
        {
          name: "prestigeLink",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "futuraImage", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          access: {
            read: () => true,
          },
        },
        {
          name: "futuraLogo", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          access: {
            read: () => true,
          },
        },
        {
          name: "futuraLink",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "aspireImage", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          access: {
            read: () => true,
          },
        },
        {
          name: "aspireLogo", // required
          type: "upload", // required
          relationTo: "files", // required
          required: true,
          access: {
            read: () => true,
          },
        },
        {
          name: "aspireLink",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default HomeHeroSection;
