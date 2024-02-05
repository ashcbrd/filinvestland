import React from "react";
import Page from "@/components/Page/Page";
import Client from "./_client/client";
import NewsProvider from "@/context/News";
import qs from "qs";

const typeID = "63d743dbb7b2cb2bb619fbd4";

export const metadata = {
    title: "Real Estate Tips and Updates | Aspire by Filinvest Blog",
    description: "Being able to help everyone expand their knowledge on Philippine real estate is our goal. Click here!",
};

async function getData(keyword: any) {
    const query = qs.stringify({
        where: { 
            _status: { equals: "published" },
            'newsTypeTag.title': { equals: "Blogs" }
        }
    });

    const featured = fetch(`${process.env.CMS_URL}/api/globals/aspire-featured-news`, { cache: "no-store" });
    const news = fetch(`${process.env.CMS_URL}/api/aspire-news?limit=4&sort=-Date${ query ? `&${ query }` : "" }`, { cache: "no-store" });
    const req = await Promise.all([news, featured]);

    return {
        news: (await req[0].json()) as any,
        featured: (await req[1].json()) as any,
    };
}

const News = async ({ searchParams }: any) => {
    const req = await getData(searchParams.keyword);
    const news = req.news;
    const featured = req.featured;

    return (
        <Page id="news" className="bg-candy-blue">
            <NewsProvider news={ news }>
                <Client featured={ featured } typeID={ typeID } />
            </NewsProvider>
        </Page>
    )
}

export default News;
