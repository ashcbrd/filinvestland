import { useEffect, useState } from "react";
import usePropertySearchSettings from "./usePropertySearchSettings";
import flattenLocations from "@/helpers/flattenLocations";
import flattenPropertyTypes from "@/helpers/flattenPropertyTypes";
import flattenUnitSizes from "@/helpers/flattenUnitSizes";
import flattenPricePoints from "@/helpers/flattenPricePoints";
import flattenBedroomRange from "@/helpers/flattenBedroomRange";
import flattenSubLocations from "@/helpers/flattenSubLocations";

function usePropertySearch() {
  const { data: inputSettings } = usePropertySearchSettings();
  const [priceRangeSteps, setPriceRangeSteps] = useState([0, 100]);
  useEffect(() => {
    if (inputSettings && inputSettings.pricePoints) {
      const steps = inputSettings.pricePoints.map(
        (pricePoint: any) => pricePoint.point
      );
      setPriceRangeSteps(steps);
    }
  }, [inputSettings]);

  return {
    priceRangeSteps,
    bedroomsSettings: inputSettings
      ? flattenBedroomRange(inputSettings.bedroomRange)
      : [],
    subLocationSettings: inputSettings
      ? flattenSubLocations(inputSettings.locations)
      : {},
    unitSizeSettings: inputSettings
      ? flattenUnitSizes(inputSettings.unitSizes)
      : [],
    locationSettings: inputSettings
      ? flattenLocations(inputSettings.locations)
      : {},
    propertyTypeSettings: inputSettings
      ? flattenPropertyTypes(inputSettings.propertyTypes)
      : [],
    priceRangeSettings: inputSettings
      ? flattenPricePoints(inputSettings.pricePoints)
      : [100000, 1000000],
  };
}
export default usePropertySearch;
