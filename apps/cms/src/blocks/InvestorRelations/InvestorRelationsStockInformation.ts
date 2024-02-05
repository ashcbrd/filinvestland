import { Block } from "payload/types";

const InvestorRelationsStockInformation: Block = {
    slug: "investor-relations-Stock-Information",
    fields: [
        {
            name: 'title',
            type: 'text'
        },
        {
            name: 'description',
            type: 'text'
        },
        {
            type: "upload",
            name: "Image",
            relationTo: "files",
            required: true,
        },

    ],
};

export default InvestorRelationsStockInformation;
