import { T_Locations } from "@/types/global";
// import { LocationSettings } from "shared-types";

const flattenLocations = (locations: any[]) => {
  let res: T_Locations = {};
  locations.map((location: any) => {
    const locationGroup: string = location?.locationGroup?.title;
    const title = location?.title;
    if (typeof locationGroup == "string") {
      const exist = typeof res[locationGroup] != "undefined";
      if (!exist) res[locationGroup] = [];
      res[locationGroup].push(title);
    }
  });

  const customOrder = [
    "Metro Manila",
    "Calabarzon",
    "Luzon",
    "Mindanao",
    "Visayas",
  ];
  const sortedArray = customOrder.map((key) => ({ [key]: res[key] }));

  const sortedObject = sortedArray.reduce((acc, item) => {
    const key = Object.keys(item)[0];
    const value = item[key];
    acc[key] = value;
    return acc;
  }, {});

  return sortedObject;
  // return locations
  //   ? (locations?.reduce((acc: T_Locations, obj: LocationSettings) => {
  //       let accCopy = acc;
  //       const subLocations = obj.location?.map(
  //         (location) => location.location.reference.value.title
  //       );
  //       return {
  //         ...accCopy,
  //         [obj.locationGroup.reference?.value.title]: subLocations,
  //       };
  //     }, {}) as T_Locations)
  //   : {};
};

export default flattenLocations;
