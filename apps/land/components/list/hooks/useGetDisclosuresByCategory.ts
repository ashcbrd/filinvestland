import { Project } from "shared-types";
import { ArrayResponse } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

export async function getDisclosuresByCategory({
  page,
  limit,
  category,
  search,
  years,
  sort,
  type,
  slug
}: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  years?: string;
  sort?: string;
  type?: string;
  slug?: string;
}) {
  const query = {
    ...(category && {
      "category.title": {
        equals: category,
      },
    }),
    ...(search
      ? {
        title: {
          contains: search,
        },
      }
      : {}),
    ...(slug
      ? {
        'category.slug': {
          equals: slug,
        },
      }
      : {}),
    ...(type && type !== "All"
      ? {
        'category.title': {
          equals: type,
        },
      }
      : {}),
    and: [
      ...(years
        ? [
          {
            publishedDate: {
              greater_than_equal: `01/01/${years}`,
            },
          },
          {
            publishedDate: {
              less_than_equal: `12/31/${years}`,
            },
          },
        ]
        : []),
    ],
  };

  const stringifiedQuery = qs.stringify(
    {
      where: query,
      sort,
    },
    { addQueryPrefix: true }
  );
  const res = await fetch(
    `/api/disclosure${stringifiedQuery == ""
      ? `${page ? `?page=${page}` : ""}${limit && page ? `&limit=${limit}` : limit ? `?limit=${limit}` : ""
      }`
      : `${stringifiedQuery}${page ? `&page=${page}` : ""}${limit ? `&limit=${limit}` : ""
      }`
    }`,
    {
      cache: "no-store",

      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const jsonData = (await res.json()) as ArrayResponse<Project>;
  return jsonData ? jsonData : null;
}

function useGetDisclosuresByCategory({
  page,
  limit,
  category,
  search,
  years,
  sort,
  type,
  slug
}: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  years?: string;
  sort?: string;
  type?: string;
  slug?: string;
}) {
  const query = useQuery(
    ["disclosure", { page, limit, search, category, years, sort, type, slug }],
    () =>
      getDisclosuresByCategory({ page, limit, category, search, years, sort, type, slug }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );
  return query;
}

export default useGetDisclosuresByCategory;
