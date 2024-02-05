import { Field, GroupField } from "payload/types";
import deepMerge from "../utilities/deepMerge";

type PropertyType = (
  /* eslint-disable  no-unused-vars */
  options?: {
    relationTo?: string;
    label?: string;
    disableLabel?: boolean;
    fieldName?: string;
    overrides?: Partial<GroupField>;
  }
) => Field;

const propertyType: PropertyType = ({ overrides = {} } = {}) => {
  let propertyTypeResult: Field = {
    name: "propertyType",
    label: "Property Types",
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
            name: "reference",
            label: "Property Type",
            type: "relationship",
            relationTo: ["property-categories"],
            required: true,
          },
        ],
      },
    ],
  };

  return deepMerge(propertyTypeResult, overrides);
};

export default propertyType;
