import { getPropertySearch } from "@/helpers/getProperties";
import { useQuery } from "@tanstack/react-query";

function usePropertySearchSettings() {
  const query = useQuery(
    ["propertySearchSettings"],
    () => getPropertySearch(),
    {
      refetchOnWindowFocus: false,
    }
  );
  return query;
}

export default usePropertySearchSettings;
