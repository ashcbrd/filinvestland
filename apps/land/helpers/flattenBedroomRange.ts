import { BedroomRangeSettings } from "shared-types";

const flattenBedroomRange = (bedroomRange: BedroomRangeSettings[]) => {
  return bedroomRange
    ? bedroomRange?.map((unitSize: BedroomRangeSettings) => {
        return [unitSize.bedroomFrom, unitSize.bedroomTo];
      })
    : [];
};

export default flattenBedroomRange;
