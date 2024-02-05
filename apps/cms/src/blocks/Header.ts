import { Block } from "payload/types";
import link from "../fields/link";

const Header: Block = {
  slug: "header",
  fields: [
    {
      type: "upload",
      name: "coverImage",
      relationTo: "files",
      required: true,
    },
    {
      type: "upload",
      name: "smallCoverImage",
      relationTo: "files",
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "breadcrumbs",
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      type: "array",
      name: "tabs",
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
};

export default Header;
