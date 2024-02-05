/* eslint-disable no-unused-vars */

import { getServerSideSitemap } from "next-sitemap";

async function getContent(content: string) {
  const res = await fetch(`${process.env.CMS_URL}/api/${content}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const jsonData = await res.json();
  return jsonData.docs ? jsonData.docs : null;
}

export async function GET(request: Request) {
  // Method to source urls from cms
  const news = await getContent("news");
  const projects = await getContent("projects");
  const formattedNews = news
    ? news.map((item: any) => {
        return {
          loc: `${process.env.LAND_URL}/article/${item.slug}`,
          lastmod: new Date(item.updatedAt).toISOString(),
          changefreq: "daily",
          priority: 0.7,
        };
      })
    : [];
  const formattedProjects = projects
    ? projects.map((item: any) => {
        return {
          loc: `${process.env.LAND_URL}/projects/${item.slug}`,
          lastmod: new Date(item.updatedAt).toISOString(),
          changefreq: "daily",
          priority: 0.7,
        };
      })
    : [];

  return getServerSideSitemap([...formattedNews, ...formattedProjects]);
}
