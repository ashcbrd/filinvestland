import { useQuery } from "@tanstack/react-query";

export async function getSites() {
  const res = await fetch(`/api/sites`, {
    cache: "no-store",

    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const jsonData = await res.json();
  return jsonData ? jsonData.docs : null;
}

function useGetSites() {
  const query = useQuery(["sites"], () => getSites(), {
    refetchOnWindowFocus: false,
  });
  return query;
}

export default useGetSites;
