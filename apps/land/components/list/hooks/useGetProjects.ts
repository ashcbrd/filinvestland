import { useQuery } from "@tanstack/react-query";
import qs from "qs";

interface IProject {
  page: number;
  propertyType?: string;
  location?: string;
  unitSize?: [number, number];
  priceRange?: [number, number];
  bedroomRange?: [number, number];
  subLocation?: string;
  brand?: string;
  group?: string;
  project: string;
  property?: string;
  status?: string;
}

export async function getProjects(
  page: number,
  propertyType: string,
  location: string,
  unitSize: [number, number],
  priceRange: [number, number],
  bedroomRange: [number, number],
  subLocation: string,
  brand: string,
  group: string,
  project: string,
  property: string,
  status: string
) {
  const queryParams = qs.stringify(
    {
      where: parseQueryParams(
        propertyType,
        location,
        unitSize,
        priceRange,
        bedroomRange,
        subLocation,
        brand,
        group,
        project,
        property,
        status
      ),
      limit: 12,
      page,
    },
    { addQueryPrefix: true }
  );

  const res = await fetch(`/api/projects${queryParams}`, {
    cache: "no-store",

    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const jsonData = await res.json();
  return jsonData || {};
}

const parseQueryParams = (
  propertyType: string,
  location: string,
  unitSize: any,
  priceRange: [number, number],
  bedroomRange: [number, number],
  subLocation: string,
  brand: string,
  group: string,
  project: string,
  property: string,
  status: string
) => {
  let queryParams = {};

  if (propertyType) {
    queryParams = {
      ...queryParams,
      "propertyType.title": {
        equals: propertyType,
      },
    };
  }

  if (location) {
    queryParams = {
      ...queryParams,
      "location.title": {
        equals: location,
      },
    };
  }

  if (unitSize) {
    queryParams = {
      ...queryParams,
      ...getRangeValues(unitSize, "size"),
    };
  }

  if (priceRange) {
    if (priceRange[0] && priceRange[1]) {
      queryParams = {
        ...queryParams,
        ...getRangeValues(priceRange, "price"),
      };
    }
  }

  if (bedroomRange) {
    if (bedroomRange[0] && bedroomRange[1]) {
      queryParams = {
        ...queryParams,
        ...getRangeValues(bedroomRange, "numberOfBedrooms"),
      };
    }
  }

  if (subLocation) {
    queryParams = {
      ...queryParams,
      "location.subLocation[0].title": {
        equals: location,
      },
    };
  }

  if (brand) {
    queryParams = {
      ...queryParams,
      "site.title": {
        equals: brand,
      },
    };
  }

  if (group) {
    queryParams = {
      ...queryParams,
      "locationGroup.title": {
        equals: group,
      },
    };
  }

  if (project) {
    queryParams = {
      ...queryParams,
      "projectType.title": {
        like: project,
      },
    };
  }

  if (property) {
    queryParams = {
      ...queryParams,
      title: {
        like: property,
      },
    };
  }

  if (status) {
    queryParams = {
      ...queryParams,
      "status.title": {
        equals: property,
      },
    };
  }

  return queryParams;
};

const getRangeValues = (range: any, key: string) => {
  let from = 0;
  let to = 0;
  if (Array.isArray(range)) {
    from = range[0];
    to = range[1];
  } else if (typeof range === "string") {
    const values = range.split(" to ") as any;
    from = values[0];
    to = values[1];
  } else {
    console.error(`Parsing type ${typeof range} is not handled.`);
  }

  return {
    and: [
      {
        [key]: {
          greater_than_equal: from,
        },
      },
      {
        [key]: {
          less_than_equal: to,
        },
      },
    ],
  };
};

function useGetProjects({
  page,
  propertyType,
  location,
  unitSize,
  priceRange,
  bedroomRange,
  subLocation,
  brand,
  group,
  project,
  property,
  status,
}: IProject) {
  const query = useQuery(
    [
      "careers",
      page,
      propertyType,
      location,
      unitSize,
      priceRange,
      bedroomRange,
      subLocation,
      brand,
      group,
      project,
      property,
      status,
    ],
    () =>
      getProjects(
        page,
        propertyType!,
        location!,
        unitSize!,
        priceRange!,
        bedroomRange!,
        subLocation!,
        brand!,
        group!,
        project!,
        property!,
        status!
      ),
    {
      refetchOnWindowFocus: false,
    }
  );
  return query;
}

export default useGetProjects;
