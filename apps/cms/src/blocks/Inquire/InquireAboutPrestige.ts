import { Block } from "payload/types";

const InquireAboutPrestige: Block = {
    slug: "inquireAboutPrestige",
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
            name: 'customerService',
            type: "array",
            fields: [
                {
                    name: "contactTitle",
                    type: "text",
                    required: false,
                },
                {
                    name: "value",
                    type: "text",
                    required: false,
                },
            ]

        },
        {
            name: 'salesHotline',
            type: "array",
            fields: [
                {
                    name: "contactTitle",
                    type: "text",
                    required: false,
                },
                {
                    name: "value",
                    type: "text",
                    required: false,
                },
            ]

        },
        {
            name: 'privacyPolicyLink',
            type: 'text',

        },
        {
            name: 'termsOfUseLink',
            type: 'text',

        }
    ],
};

export default InquireAboutPrestige;
