import { Block } from "payload/types";

const AdvancedFilesListing: Block = {
    slug: "advanced-files-listing",
    fields: [
        {
            name: "files",
            label: 'Labels',
            type: "array",
            fields: [
                {
                    name: 'label',
                    type: 'text'
                }
            ],
            admin: {
                components: {
                    RowLabel: ({ data }) => {
                        return data?.label ?? 'No Label'
                    },
                },
            },
        },
    ],
};

export default AdvancedFilesListing;
