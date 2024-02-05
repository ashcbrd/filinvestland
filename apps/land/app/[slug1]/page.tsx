import MainHeader from "@/components/header/MainHeader";
import Content from "@/components/pages/news/Content";
import { getRequest } from "@/helpers/getRequest";
import NotFound from "../not-found";
import qs from "qs";
import { NewsCategory } from "shared-types";
import DynamicPage from "@/components/pages/dynamic/DynamicPage";
import { pages } from "next/dist/build/templates/app-page";

export const metadata = {
  title: "News",
  description: "News",
};

interface Props {
  params: {
    slug1: string;
  };
  searchParams: {
    page: number
  }
}

const NewsPage = async (props: Props) => {
  const { slug1 } = props.params;

  let isDynamic = false;
  let newsCategories;
  let newsCategory;

  const query = {
    ...(slug1 && {
      "urlPath": {
        equals: `/${slug1}`,
      },
    })
  };

  const stringifiedQuery = qs.stringify(
    {
      where: query,
    },
    { addQueryPrefix: true })

  const dynamicPages = await getRequest(`/api/pages${stringifiedQuery}`);



  if (dynamicPages.length) {
    isDynamic = true;
  }
  else {
    //temporary

    newsCategories = await getRequest(`/api/news-categories`);
    const validUrl = newsCategories.map((obj: any) => obj?.slug)
    if (!slug1 || !validUrl.includes(slug1)) return <NotFound />

    newsCategory = newsCategories?.find(
      (item: NewsCategory) => item?.slug == slug1
    );
  }

  return (
    <>
      {!dynamicPages?.[0]?.useAdvancedHeader && <MainHeader title={isDynamic ? dynamicPages[0].title : newsCategory.title ?? "Latest News and Stories"} />}
      {isDynamic ? <DynamicPage header={dynamicPages?.[0]?.header} data={dynamicPages[0]} /> :
        <Content searchParams={props?.searchParams} slug={slug1} categories={newsCategories} category={newsCategory.title} />}
    </>
  );
};

export default NewsPage;
