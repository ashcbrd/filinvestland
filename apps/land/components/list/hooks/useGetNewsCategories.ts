import { useQuery } from "@tanstack/react-query";
import qs from "qs";

export async function getNewsCategory() {
    const query = {

    };

    const stringifiedQuery = qs.stringify(
        {
            where: query, // ensure that `qs` adds the `where` property, too!
        },
        { addQueryPrefix: true }
    );
    const res = await fetch(
        `/api/news-categories?limit=1000`,
        {
            cache: "no-store",

            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }
    );
    const jsonData = await res.json();
    return jsonData ? jsonData : null;
}

function useGetNewsCategory() {
    const query = useQuery(
        ["news-categories"],
        () => getNewsCategory(),
        {
            enabled: true,
            refetchOnWindowFocus: false,
        }
    );
    return query;
}

export default useGetNewsCategory;
