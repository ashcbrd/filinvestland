import { PricePointsSettings } from "shared-types";

const flattenPricePoints = (pricePoints: PricePointsSettings[]) => {
  return pricePoints
    ? pricePoints?.map((pricePoint: PricePointsSettings) => {
        return pricePoint.point;
      })
    : [];
};

export default flattenPricePoints;
