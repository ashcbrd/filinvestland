import type { Block } from "payload/types";

const Testimonial: Block = {
  slug: "CommonTestimonial",
  fields: [
    {
      name: "testimonial",
      type: "array",
      fields: [
        {
          name: "testimony",
          type: "richText",
        },
        {
          name: "name",
          type: "text",
        },
        {
          name: "rating",
          type: "number",
          max: 5,
          min: 1,
        },
      ],
    },
    {
      name: "section_title",
      type: "text",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "testimonial",
      type: "array",
      fields: [
        {
          name: "testimony",
          type: "richText",
        },
        {
          name: "name",
          type: "text",
        },
        {
          name: "rating",
          type: "number",
          max: 5,
          min: 1,
        },
      ],
    },
  ],
};

export default Testimonial;
