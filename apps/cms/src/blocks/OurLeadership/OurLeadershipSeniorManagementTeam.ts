import { Block } from "payload/types";

const OurLeadershipSeniorManagementTeam: Block = {
  slug: "our-leadership-senior-management-team",
  fields: [
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
    {
      name: "numberOfColumns",
      label: "No. of Columns",
      type: "radio",
      options: [
        {
          label: "2",
          value: "2",
        },
        {
          label: "3",
          value: "3",
        },
        {
          label: "4",
          value: "4",
        },
      ],
      defaultValue: "3",
    },
    {
      type: "array",
      name: "director",
      required: true,
      fields: [
        {
          type: "upload",
          name: "directorImage",
          relationTo: "files",
          required: true,
        },
        {
          name: "directorFullName",
          type: "text",
          required: true,
        },
        {
          name: "directorTitle",
          type: "text",
          required: true,
        },
        {
          name: "facebookLink",
          label: "Facebook Link i.e. (https://www.facebook.com/<user>)",
          type: "text",
        },
        {
          name: "twitterLink",
          label: "Twitter Link i.e. (https://www.twitter.com/<user>)",
          type: "text",
        },
        {
          name: "linkedInLink",
          label: "LinkedIn Link i.e. (https://www.linkedin.com/<user>)",
          type: "text",
        },
        {
          name: "email",
          type: "text",
          required: true,
        },
        {
          name: "phoneNumber",
          type: "text",
          required: true,
        },
        {
          name: "bio",
          type: "textarea",
          required: true,
        },
        {
          name: "companyInformation",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};

export default OurLeadershipSeniorManagementTeam;
