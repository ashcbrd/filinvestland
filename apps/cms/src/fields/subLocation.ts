import { Field, GroupField } from "payload/types";
import deepMerge from "../utilities/deepMerge";

type SubLocationType = (
  /* eslint-disable  no-unused-vars */
  options?: {
    relationTo?: string;
    label?: string;
    disableLabel?: boolean;
    fieldName?: string;
    overrides?: Partial<GroupField>;
  }
) => Field;

const subLocation: SubLocationType = ({ overrides = {} } = {}) => {
  let propertyTypeResult: Field = {
    name: "subLocation",
    label: "Sub-Location",
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
            label: "Sub-Location",
            type: "relationship",
            relationTo: ["sub-location-categories"],
            required: true,
          },
        ],
      },
    ],
  };

  return deepMerge(propertyTypeResult, overrides);
};

export default subLocation;
