// import { SubLocationSettings } from "shared-types";

const flattenSubLocations = (locations: any[]) => {
  let res: any[] = [];
  locations.map((location: any) => {
    const mainLocation: string = location?.title;
    const subLocations =
      location?.subLocation?.map((item: any) => {
        return {
          title: item.title,
        };
      }) || [];
    if (typeof mainLocation == "string" && subLocations.length) {
      res.push({
        mainLocation,
        subLocations,
      });
    }
  });
  return res;
  // const subLocationTitles = Object.values(subLocations).map((location) => {
  //   return location.location?.map((item) => {
  //     const value = item.location.reference.value;
  //     return {
  //       mainLocation: value.title,
  //       subLocations: value.subLocation?.map((sub) => {
  //         return {
  //           title: sub.title,
  //         };
  //       }),
  //     };
  //   });
  // });

  // return subLocationTitles;

  // return subLocations
  //   ? subLocations?.map(
  //       (subLocation: SubLocationSettings) =>
  //         subLocation.subLocation.reference.value.title
  //     )
  //   : [];
};

export default flattenSubLocations;
