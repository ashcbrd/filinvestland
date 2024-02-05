import { useQuery } from "@tanstack/react-query";

export async function getNavigation() {
  const res = await fetch(`/api/globals/navigation`, {
    cache: "no-store",

    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const jsonData = await res.json();
  return jsonData ? jsonData : null;
}

function useGetNavigation() {
  const query = useQuery(["navigation"], () => getNavigation(), {
    refetchOnWindowFocus: false,
  });
  return query;
}

export default useGetNavigation;
