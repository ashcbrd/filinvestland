import { Block } from "payload/types";

const PrestigeOurHeritage: Block = {
    slug: "prestige-our-heritage",
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
            name: 'parallaxCover',
            type: 'upload',
            required: false,
            relationTo: 'files'
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
                    type: "textarea",
                    required: false,
                },
                {
                    name: "image",
                    type: "upload",
                    relationTo: "files",
                    required: false,
                },
            ],
        },
        {
            type: "group",
            name: "secondSection",
            fields: [
                {
                    name: "title",
                    type: "text",
                    required: false,
                },
                {
                    name: "description",
                    type: "textarea",
                    required: false,
                },
                {
                    name: "image",
                    type: "upload",
                    relationTo: "files",
                    required: false,
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
                    type: "textarea",
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
                            type: "textarea",
                            required: false,
                        },
                    ],
                },
            ],
        }
    ],
};

export default PrestigeOurHeritage;
