import React from "react";
import qs from "qs";
import Client from "../projects/client/Client";

const typeID = "63c89fb91111c5320a1c76ab";

async function getData() {
    const query = qs.stringify({
        where: {
            _status: { equals: "published" },
            propertyType: { equals: typeID }
        }
    });

    const projects = fetch(`${process.env.CMS_URL}/api/globals/futura-featured-projects`);
    const page = fetch(`${process.env.CMS_URL}/api/futura-pages/654c8980386037465bbbea82`, { cache: "no-store" });
    const property_search = fetch(`${process.env.CMS_URL}/api/globals/futura-property-search`);
    const allprojects = fetch(`${process.env.CMS_URL}/api/futura-projects?limit=6${ query ? `&${query}` : "" }`);
    const req = await Promise.all([projects, page, property_search, allprojects]);

    return {
        projects: (await req[0].json()) as any,
        page: (await req[1].json()) as any,
        property_search: (await req[2].json()) as any,
        allprojects: (await req[3].json()) as any,
    };
}

async function Project({ searchParams }: any) {
    const req = (await getData()) as any;
    const featured = req.projects;

    return (
        <Client
            title="Mid-Rise Condos"
            req={req}
            searchParams={searchParams}
            typeID={typeID}
            featured={featured}
            propertyType={["63c89fb91111c5320a1c76ab"]}
        />
    );
}

export default Project;
