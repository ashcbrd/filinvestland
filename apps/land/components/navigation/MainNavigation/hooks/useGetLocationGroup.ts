import { useQuery } from "@tanstack/react-query";

export async function getLocations() {
  const res = await fetch("/api/location-group-categories?limit=50", {
    cache: "no-store",

    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const jsonData = await res.json();
  return jsonData ? jsonData.docs : null;
}

function useGetLocationGroup() {
  const query = useQuery(["locationGroup"], () => getLocations(), {
    refetchOnWindowFocus: false,
  });
  return query;
}

export default useGetLocationGroup;
