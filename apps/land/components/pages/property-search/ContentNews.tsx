"use client";
import { T_SearchQuery } from "@/types/global";
import useGetNews from "../../../hooks/useGetNews";
import FeaturedArticles from "@/components/list/FeaturedArticles";

const ContentNews = ({ params }: { params: T_SearchQuery }) => {
  const { data: news } = useGetNews({ searchParams: params });
  return (
    <div className="bg-ghost-white mt-24 flex flex-col items-center py-24">
      <section className="w-full">
        <div className="mx-6 lg:mx-9 xl:mx-16 2xl:mx-44">
          <h3 className="text-jet flex-none text-4xl font-bold">
            Related Articles
          </h3>
          <FeaturedArticles className="mt-16" sliderOnMobile articles={news} />
        </div>
      </section>
    </div>
  );
};

export default ContentNews;
