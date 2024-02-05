import { useQuery } from "@tanstack/react-query";

export async function getFloatingMenu() {
  const res = await fetch(`/api/globals/floating-menu`, {
    cache: "no-store",

    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const jsonData = await res.json();
  return jsonData ? jsonData : null;
}

function useGetFloatingMenu() {
  const query = useQuery(["floating-menu"], () => getFloatingMenu(), {
    refetchOnWindowFocus: false,
  });
  return query;
}

export default useGetFloatingMenu;
