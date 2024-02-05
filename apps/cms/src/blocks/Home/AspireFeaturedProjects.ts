import { Block } from "payload/types";
import link from "../../fields/link";

const AspireFeaturedProjects: Block = {
  slug: "AspireFeaturedProjects",
  fields: [
    {
      name: "FeaturedProjects",
      type: "array",
      maxRows: 100,
      minRows: 1,
      fields: [
        {
          name: "Project",
          type: "relationship",
          required: true,
          relationTo: "aspire-projects",
        },
      ],
    },
  ],
};

export default AspireFeaturedProjects;
