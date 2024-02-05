import { Block } from "payload/types";

const FuturaAboutUsSection: Block = {
    slug: "FuturaAboutUsSection",
    fields: [
        {
            name: 'aboutUsHeader',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    type: 'text'
                },
                {
                    name: 'description',
                    type: 'textarea'
                },
                {
                    name: "converImage", // required
                    type: "upload", // required
                    relationTo: "files", // required
                    filterOptions: {
                        mimeType: { contains: "image" },
                    },
                },
            ]
        },
        {
            name: 'aboutUsFirstSection',
            type: 'group',
            fields: [
                {
                    name: 'Context',
                    type: 'richText',
                    required: false,
                },
                {
                    name: "firstImage", // required
                    type: "upload", // required
                    relationTo: "files", // required
                    filterOptions: {
                        mimeType: { contains: "image" },
                    },
                },
                {
                    name: "secondImage", // required
                    type: "upload", // required
                    relationTo: "files", // required
                    filterOptions: {
                        mimeType: { contains: "image" },
                    },
                },
            ]
        },
        {
            name: 'aboutUsTeam',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    type: 'text'
                },
                {
                    name: 'description',
                    type: 'textarea'
                },
                {
                    name: 'teamMembers',
                    type: 'array',
                    fields: [
                        {
                            name: "name",
                            type: "text",

                        },
                        {
                            name: "profile",
                            type: "upload",
                            relationTo: "files",
                            filterOptions: {
                                mimeType: { contains: "image" },
                            },
                        },
                    ]
                }
            ]
        },
        {
            name: "aboutUsAwards",
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
                    name: "description",
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
                            name: "position",
                            type: "text",
                            required: false,
                        },
                    ],
                },
            ],
        },
    ],
};

export default FuturaAboutUsSection;
