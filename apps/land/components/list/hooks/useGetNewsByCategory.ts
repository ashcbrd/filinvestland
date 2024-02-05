import { useQuery } from "@tanstack/react-query";
import qs from "qs";

export async function getNewsByCategory(
  projectType: string,
  page: number,
  queryParams: any,
  sort?: string
) {
  const query = {
    ...(queryParams?.type_tag && {
      "newsTypeTag.title": {
        equals: queryParams?.type_tag,
      },
    }),
    ...(queryParams?.property_type_tag && {
      "propertyTypeTag.title": {
        equals: queryParams?.property_type_tag,
      },
    }),
    ...(queryParams?.location_tag && {
      "locationTag.title": {
        equals: queryParams?.location_tag,
      },
    }),
    ...(queryParams?.brand && {
      "site.title": {
        equals: queryParams?.brand,
      },
    }),
  };

  const stringifiedQuery = qs.stringify(
    {
      where: query, // ensure that `qs` adds the `where` property, too!
      sort,
    },
    { addQueryPrefix: true }
  );
  const res = await fetch(
    `/api/news${
      stringifiedQuery == ""
        ? `?page=${page}&limit=12`
        : `${stringifiedQuery}&page=${page}&limit=12`
    }`,
    {
      cache: "no-store",

      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const jsonData = await res.json();
  return jsonData ? jsonData : null;
}

function useGetNewsByCategory(
  { projectType, sort }: { projectType: string; sort?: string },
  page: number,
  queryParams: any
) {
  const query = useQuery(
    ["project", projectType, page, queryParams.type_tag, sort],
    () => getNewsByCategory(projectType, page, queryParams, sort),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );
  return query;
}

export default useGetNewsByCategory;
