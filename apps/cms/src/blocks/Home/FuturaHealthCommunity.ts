
import { Block } from "payload/types";

const FuturaHealthCommunity: Block = {
    slug: "FuturaHealthCommunity",
    fields: [
        {
            name: 'healthCommunity',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
                {
                    name: "coverImage", // required
                    label: " ",
                    type: "upload", // required
                    relationTo: "files", // required
                    required: true,
                    filterOptions: {
                        mimeType: { contains: "image" },
                    },
                },
                {
                    name: 'callToActionText',
                    type: 'text',
                },
                {
                    name: 'callToActionLink',
                    type: 'text',
                },
            ]
        },
    ],
};

export default FuturaHealthCommunity;

