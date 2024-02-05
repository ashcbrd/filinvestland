import { PropertyTypeSettings } from "shared-types";

const flattenPropertyTypes = (propertyTypes: PropertyTypeSettings[]) => {
  return propertyTypes
    ? propertyTypes?.map(
        (propertyType: PropertyTypeSettings) =>
          propertyType.propertyType.reference.value.title
      )
    : [];
};

export default flattenPropertyTypes;
