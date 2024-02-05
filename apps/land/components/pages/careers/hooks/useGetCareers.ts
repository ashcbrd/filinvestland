import { useQuery } from "@tanstack/react-query";
import qs from "qs";

interface ICareer {
  page: number;
  searchValue: string;
  location: string;
  jobFamily: string;
}

export async function getCareers(
  page: number,
  searchValue: string,
  location: string,
  jobFamily: string
) {
  const queryParams = qs.stringify(
    {
      where: parseQueryParams(searchValue, location, jobFamily),
      limit: 10,
      page,
    },
    { addQueryPrefix: true }
  );

  const res = await fetch(`/api/manatal-careers${queryParams}`, {
    cache: "no-store",

    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const jsonData = await res.json();
  return jsonData || {};
}

const parseQueryParams = (
  searchValue: string,
  location: string,
  jobFamily: string
) => {
  let queryParams = {};

  if (searchValue) {
    queryParams = {
      ...queryParams,
      position_name: {
        contains: searchValue,
      },
    };
  }

  if (location && location !== "All") {
    queryParams = {
      ...queryParams,
      location_display: {
        equals: location,
      },
    };
  }

  if (jobFamily && jobFamily !== "All") {
    queryParams = {
      ...queryParams,
      organization_name: {
        equals: jobFamily,
      },
    };
  }

  return queryParams;
};

function useGetCareers({ page, searchValue, location, jobFamily }: ICareer) {
  const query = useQuery(
    ["careers", page, searchValue, location, jobFamily],
    () => getCareers(page, searchValue, location, jobFamily),
    {
      refetchOnWindowFocus: false,
    }
  );
  return query;
}

export default useGetCareers;
