import { Field, GroupField } from "payload/types";
import deepMerge from "../utilities/deepMerge";

type LocationType = (
  /* eslint-disable  no-unused-vars */
  options?: {
    relationTo?: string;
    label?: string;
    disableLabel?: boolean;
    fieldName?: string;
    overrides?: Partial<GroupField>;
  }
) => Field;

const location: LocationType = ({
  relationTo,
  label,
  fieldName,
  overrides = {},
} = {}) => {
  let locationResult: Field = {
    name: fieldName,
    label: label,
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
            label: label,
            type: "relationship",
            relationTo: [relationTo],
            required: true,
          },
        ],
      },
    ],
  };

  return deepMerge(locationResult, overrides);
};

export default location;
