import { useQuery } from "@tanstack/react-query";

export async function getTabs() {
  const res = await fetch(`/api/career-categories?limit=0`, {
    cache: "no-store",

    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const jsonData = await res.json();
  return jsonData || {};
}

function useCareerTabs() {
  const query = useQuery(["careers"], () => getTabs(), {
    refetchOnWindowFocus: false,
  });
  return {
    ...query,
  };
}

export default useCareerTabs;
