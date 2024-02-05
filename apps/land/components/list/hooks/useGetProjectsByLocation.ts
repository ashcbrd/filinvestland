import { Project } from "shared-types";
import { ArrayResponse } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

export async function getProjectsByLocation({
  location,
  projectType,
  status,
  page,
  dataType,
  limit
}: {
  location: string;
  projectType: string;
  status?: string;
  page?: number;
  limit?: number;
  dataType?: "regular" | "office" | "office park" | "corporate center";
}) {
  const query = {
    ...(location && {
      "location.title": {
        equals: location,
      },
    }),
    ...(projectType && {
      "projectType.title": {
        equals: projectType,
      },
    }),
    ...(dataType && {
      dataType: {
        equals: dataType,
      },
    }),
    ...(status && {
      "status.title": {
        equals: status,
      },
    }),
  };

  const stringifiedQuery = qs.stringify(
    {
      where: query, // ensure that `qs` adds the `where` property, too!
    },
    { addQueryPrefix: true }
  );
  const res = await fetch(
    `/api/projects${stringifiedQuery == ""
      ? `${page ? `?page=${page}` : ''}${limit && page ? `&limit=${limit}` : limit ? `?limit=${limit}` : ''}`
      : `${stringifiedQuery}${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`
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

function useGetProjectsByLocation({
  location,
  projectType,
  status,
  page,
  dataType,
  limit
}: {
  location: string;
  projectType: string;
  status?: string;
  page?: number;
  dataType?: "regular" | "office" | "office park" | "corporate center";
  limit?: number
}) {
  const query = useQuery(
    ["project", { location, projectType, status, page }],
    () =>
      getProjectsByLocation({ location, projectType, status, page, dataType, limit }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );
  return query;
}

export default useGetProjectsByLocation;
