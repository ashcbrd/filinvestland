import { Block } from "payload/types";

const ContactUs: Block = {
  slug: "contact-us",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "item",
      label: "Items",
      minRows: 3,
      required: true,
      fields: [
        {
          type: "upload",
          name: "logo",
          relationTo: "files",
          required: true,
        },
        {
          type: "upload",
          name: "coverImageOnFormSubmit",
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
          name: "addressContact",
          label: "Address Contact",
          minRows: 1,
          required: true,
          fields: [
            {
              name: "address",
              type: "text",
              required: true,
            },
            {
              name: "address2",
              type: "text",
              required: false,
            },
            {
              name: "isAddressSecondary",
              type: "checkbox",
              label: "Make address 2 secondary (gray and smaller)?",
              defaultValue: false,
            },
            {
              name: "phone",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "latitudeFilinvestOfficeMap",
          type: "text",
          required: true,
        },
        {
          name: "longitudeFilinvestOfficeMap",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default ContactUs;
