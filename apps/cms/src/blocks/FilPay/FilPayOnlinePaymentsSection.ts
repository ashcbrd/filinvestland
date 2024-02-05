import { Block } from "payload/types";

const FilPayOnlinePaymentsSection: Block = {
  slug: "filpay-online-payments-section",
  fields: [
    {
      type: "upload",
      name: "mainHeaderImage",
      relationTo: "files",
      required: true,
    },
    {
      type: "upload",
      name: "mainHeaderImageSmall",
      relationTo: "files",
      required: true,
    },
    {
      type: "upload",
      name: "headerImage",
      relationTo: "files",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "filpayAdvantages",
      required: true,
      minRows: 3,
      fields: [
        {
          type: "upload",
          name: "icon",
          relationTo: "files",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      name: "text",
      type: "textarea",
      required: true,
    },
    {
      type: "array",
      name: "filpayCards",
      required: true,
      fields: [
        {
          type: "upload",
          name: "icon",
          relationTo: "files",
          required: true,
        },
      ],
    },
    {
      type: "array",
      name: "filpayBanks",
      required: true,
      fields: [
        {
          type: "upload",
          name: "icon",
          relationTo: "files",
          required: true,
        },
      ],
    },
    {
      name: "learnMoreLink",
      type: "text",
      required: true,
    },
  ],
};

export default FilPayOnlinePaymentsSection;
