import { Block } from "payload/types";

const RichTextBlock: Block = {
    slug: "rich-text",
    fields: [
        {
            name: "content",
            type: "richText",
            required: true,
        },
    ],
};

export default RichTextBlock;
