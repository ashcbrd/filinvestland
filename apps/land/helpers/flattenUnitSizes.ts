import { UnitSizesSettings } from "shared-types";

const flattenUnitSizes = (unitSizes: UnitSizesSettings[]) => {
  return unitSizes
    ? unitSizes?.map((unitSize: UnitSizesSettings) => {
        return [unitSize.sizeFrom, unitSize.sizeTo];
      })
    : [];
};

export default flattenUnitSizes;
