import { Project } from "shared-types";
import { ArrayResponse } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

export async function getDisclosuresCategories({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) {
  const stringifiedQuery = qs.stringify(
    { sort: "title", limit: 1000 },
    { addQueryPrefix: true }
  );
  const res = await fetch(`/api/disclosure-categories${stringifiedQuery}`, {
    cache: "no-store",

    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const jsonData = (await res.json()) as ArrayResponse<Project>;
  return jsonData ? jsonData : null;
}

function useGetDisclosuresAllCategories({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) {
  const query = useQuery(
    ["disclosure", { page, limit }],
    () => getDisclosuresCategories({ page, limit }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );
  return query;
}

export default useGetDisclosuresAllCategories;
