import { T_SearchQuery } from "@/types/global";
import { CACHE_REVALIDATE, SEARCH_PARAM_MAP } from "./constants";
import qs from "qs";

export async function getProperties(searchParams: T_SearchQuery, returnMeta?: { returnMeta?: boolean }) {
  const query = {
    ...(searchParams.brand
      ? {
        "site.title": {
          ...(searchParams.brand === "All"
            ? { exist: true }
            : { equals: searchParams.brand }),
        },
      }
      : {}),
    ...(searchParams.propertyType &&
      searchParams?.propertyType?.toLowerCase() != "all"
      ? {
        "propertyType.title": {
          equals: searchParams.propertyType,
        },
      }
      : {}),
    ...(searchParams.locationGroup
      ? {
        "locationGroup.title": {
          equals: searchParams.locationGroup,
        },
      }
      : {}),
    ...(searchParams.projectType
      ? {
        "projectType.title": {
          equals: searchParams.projectType,
        },
      }
      : {}),
    ...(searchParams.subLocation
      ? {
        "subLocationTwo.title": {
          equals: searchParams.subLocation,
        },
      }
      : {}),
    ...(searchParams.propertyName
      ? {
        title: {
          contains: searchParams.propertyName,
        },
      }
      : {}),
    ...(searchParams.location && searchParams?.location?.toLowerCase() != "all"
      ? {
        "location.title": {
          equals: searchParams.location,
        },
      }
      : {}),
    and: [
      ...(searchParams.priceRangeFrom
        ? [
          {
            price: {
              greater_than_equal: searchParams.priceRangeFrom,
            },
          },
          {
            price: {
              less_than_equal: searchParams.priceRangeTo,
            },
          },
        ]
        : []),
      ...(searchParams.unitSizeFrom
        ? [
          {
            size: {
              greater_than_equal: searchParams.unitSizeFrom,
            },
          },
          {
            size: {
              less_than_equal: searchParams.unitSizeTo,
            },
          },
        ]
        : []),
      ...(searchParams.bedroomsFrom
        ? [
          {
            numberOfBedrooms: {
              greater_than_equal: searchParams.bedroomsFrom,
            },
          },
          {
            numberOfBedrooms: {
              less_than_equal: searchParams.bedroomsTo,
            },
          },
        ]
        : []),
    ],
  };
  const stringifiedQuery = qs.stringify(
    {
      where: query, // ensure that `qs` adds the `where` property, too!
    },
    { addQueryPrefix: true }
  );
  const res = await fetch(
    `${process.env.CMS_URL}/api/projects${stringifiedQuery ? `${stringifiedQuery}&` : '?'}limit=12${searchParams?.page ? `&page=${searchParams.page}` : ''}`,
    {
      cache: "no-store",

      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const jsonData = await res.json();
  return jsonData ? (jsonData.docs && !returnMeta?.returnMeta ? jsonData.docs : jsonData.docs && returnMeta?.returnMeta ? jsonData : []) : null;
}


export const formatSearchParams = (searchParams: T_SearchQuery) => {
  let propertyType = searchParams?.propertyType || "";
  let location = searchParams?.location || "";
  let brand = searchParams?.brand || "";

  let unitSize = searchParams?.unitSize || "";
  let unitSizeFrom = unitSize ? Number(unitSize?.split("-")?.[0]) : 0;
  let unitSizeTo = unitSize ? Number(unitSize?.split("-")?.[1]) : 0;
  unitSize =
    unitSizeFrom || unitSizeTo ? `${unitSizeFrom} to ${unitSizeTo}` : "";

  let priceRangeFrom = searchParams?.priceRangeFrom || 0;
  let priceRangeTo = searchParams?.priceRangeTo || 0;
  let priceRange = [Number(priceRangeFrom), Number(priceRangeTo)];
  let projectType = searchParams?.projectType || "";
  let propertyName = searchParams?.propertyName || "";

  let bedrooms = searchParams?.bedrooms || "";
  let bedroomsFrom = bedrooms ? Number(bedrooms?.split("-")?.[0]) : 0;
  let bedroomsTo = bedrooms ? Number(bedrooms?.split("-")?.[1]) : 0;
  bedrooms = `${bedroomsFrom} to ${bedroomsTo}`;
  bedrooms =
    bedroomsFrom || bedroomsTo ? `${bedroomsFrom} to ${bedroomsTo}` : "";

  let locationGroup = searchParams?.locationGroup || "";
  let subLocation = searchParams?.subLocation || "";

  const param = {
    propertyType,
    location,
    unitSize,
    unitSizeFrom,
    unitSizeTo,
    priceRangeFrom,
    priceRangeTo,
    priceRange,
    brand: brand ? brand : "",
    bedroomsFrom,
    bedroomsTo,
    propertyName,
    subLocation,
    bedrooms,
    projectType,
    locationGroup,
  };
  return param;
};

export const decode = (target: string) => {
  return target
    ?.replaceAll("_and_", "_%26_")
    ?.replaceAll("__", "_")
    ?.replaceAll("_", "%20");
};

export const encode = (target: string) => {
  return target
    .replaceAll("%20", "_")
    .replaceAll("%26", "_and_")
    .replaceAll("__", "_");
};

export const getParams = (params: {
  propertyType: string;
  location: string;
  filters?: string[];
}): T_SearchQuery => {
  let reverseMap: any = {};
  Object.getOwnPropertyNames(SEARCH_PARAM_MAP).map((key: string) => {
    const value = SEARCH_PARAM_MAP[key];
    reverseMap[value] = key;
  });
  let type = decode(params.propertyType);
  let location = decode(params.location);
  if (type?.toLocaleLowerCase() == "all" || type?.toLocaleLowerCase() == "buy")
    type = "";
  if (
    location?.toLocaleLowerCase() == "all" ||
    location?.toLocaleLowerCase() == "buy"
  )
    location = "";
  const filters = params?.filters || [];
  let tRes: any = {};
  tRes.propertyType = decodeURIComponent(type);
  tRes.location = decodeURIComponent(location);
  filters.map((item) => {
    const arr = decodeURIComponent(item).split(":");
    const key = arr[0];
    const val = arr[1];
    if (Object.hasOwn(reverseMap, key)) {
      tRes[reverseMap[key]] = val;
    }
  });
  return tRes;
};

export const checkValidSearchURL = async (
  searchParams: T_SearchQuery
): Promise<boolean> => {
  if (searchParams.propertyType == "" && searchParams.location == "")
    return true;
  const propertySearch = await getPropertySearch();
  let f = true;
  if (searchParams.propertyType != "") {
    let propertyTypes: string[] = propertySearch.propertyTypes.map(
      (item: any) => item?.propertyType?.reference?.value?.title
    );
    propertyTypes = propertyTypes.filter((item) => !!item);
    f = !!propertyTypes.find((item) => item == searchParams.propertyType);
  }
  if (f && searchParams.location != "") {
    let locationTypes: string[] = propertySearch.locations.map(
      (item: any) => item?.title
    );
    locationTypes = locationTypes.filter((item) => !!item);
    f = !!locationTypes.find((item) => item == searchParams.location);
  }
  return f;
};

export async function getPropertySearch() {
  const res = await fetch(
    `${process.env.CMS_URL}/api/globals/property-search`,
    {
      cache: "no-store",

      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  let response = await fetch(
    `${process.env.CMS_URL}/api/location-categories?limit=0`,
    {
      cache: "no-store",

      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  let locations: any[] = (await response.json())?.docs;
  const jsonData = await res.json();
  jsonData.locations = locations;
  return jsonData ? jsonData : null;
}
