import { Field, GroupField } from "payload/types";
import deepMerge from "../utilities/deepMerge";

export const appearanceOptions = {
  primary: {
    label: "Primary Button",
    value: "primary",
  },
  secondary: {
    label: "Secondary Button",
    value: "secondary",
  },
  default: {
    label: "Default",
    value: "default",
  },
};

export type LinkAppearances = "primary" | "secondary" | "default";

type LinkType = (
  /* eslint-disable no-unused-vars */
  options?: {
    appearances?: LinkAppearances[] | false;
    disableLabel?: boolean;
    overrides?: Partial<GroupField>;
    disableDescription?: boolean
  }
) => Field;

const link: LinkType = ({
  appearances,
  disableLabel = false,
  overrides = {},
  disableDescription = false
} = {}) => {
  let linkResult: Field = {
    name: "link",
    type: "group",
    admin: {
      hideGutter: true,
      ...(overrides?.admin || {}),
    },
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "newTab",
            label: "Open in new tab",
            type: "checkbox",
            admin: {
              width: "50%",
              style: {
                alignSelf: "flex-end",
              },
            },
          },
        ],
      },
    ],
  };

  if (!disableLabel) {
    linkResult.fields.push({
      type: "row",
      fields: [
        {
          name: "url",
          label: "Custom URL",
          type: "text",
          required: true,
        },
        {
          name: "label",
          label: "Label",
          type: "text",
          required: true,
          admin: {
            width: "50%",
          },
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields];
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.primary,
      appearanceOptions.secondary,
    ];

    if (appearances) {
      appearanceOptionsToUse = appearances.map(
        (appearance) => appearanceOptions[appearance]
      );
    }

    linkResult.fields.push({
      name: "appearance",
      type: "select",
      defaultValue: "default",
      options: appearanceOptionsToUse,
      admin: {
        description: "Choose how the link should be rendered.",
      },
    });
  }

  if (!disableDescription) {
    linkResult.fields.push({
      name: "description",
      label: "Description",
      type: "text",
      admin: {
        width: "100%",
      },
    },)
  }

  return deepMerge(linkResult, overrides);
};

export default link;
