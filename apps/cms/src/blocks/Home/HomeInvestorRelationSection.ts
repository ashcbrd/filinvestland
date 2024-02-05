import { Block } from "payload/types";

const HomeInvestorRelationSection: Block = {
  slug: "homeInvestorRelationSection",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "subTitle",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "learnMoreLink",
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "sliderItems",
      label: "Slider Items",
      minRows: 1,
      required: true,
      fields: [
        {
          type: "array",
          name: "sliderItem",
          label: "Slider Item",
          minRows: 4,
          maxRows: 4,
          fields: [
            {
              type: "upload",
              name: "logo",
              relationTo: "files",
              required: true,
            },
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "cost",
              type: "text",
              required: true,
            },
            {
              name: "year",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default HomeInvestorRelationSection;
