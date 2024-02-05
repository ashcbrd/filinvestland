import { Block } from "payload/types";

const StructuresDownloadButton: Block = {
  slug: "structures-download-button",
  fields: [
    {
      type: "upload",
      name: "file",
      relationTo: "files",
      required: true,
    },
  ],
};

export default StructuresDownloadButton;
