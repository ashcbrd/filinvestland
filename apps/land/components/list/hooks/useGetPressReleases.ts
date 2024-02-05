import { Project } from "shared-types";
import { ArrayResponse } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

export async function getPressRelease({
  page,
  limit,
  search,
  years,
  sort,
}: {
  page?: number;
  limit?: number;
  search?: string;
  years?: string;
  sort: string;
}) {
  const query = {
    ...(search
      ? {
          title: {
            contains: search,
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
    `/api/press-release${
      stringifiedQuery == ""
        ? `${page ? `?page=${page}` : ""}${
            limit && page ? `&limit=${limit}` : limit ? `?limit=${limit}` : ""
          }`
        : `${stringifiedQuery}${page ? `&page=${page}` : ""}${
            limit ? `&limit=${limit}` : ""
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

function useGetPressReleases({
  page,
  limit,
  category,
  search,
  years,
  sort,
}: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  years?: string;
  sort: string;
}) {
  const query = useQuery(
    ["disclosure", { page, limit, search, years, sort }],
    () => getPressRelease({ page, limit, search, years, sort }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );
  return query;
}

export default useGetPressReleases;
