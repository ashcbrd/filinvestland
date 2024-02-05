import MainHeader from "@/components/header/MainHeader";
import Content from "@/components/pages/news/Content";
import { getRequest, getHeaderCover } from "@/helpers/getRequest";

export const metadata = {
  title: "News",
  description: "News",
};

const NewsPage = async () => {
  const categories = await getRequest(`/api/news-categories`);
  const header = await getHeaderCover(`/api/pages/65352e91d1974f082c21b2d6`);
  return (
    <>
      <MainHeader
        header={header?.content?.[0]}
        bgUrl={header?.content?.[0]?.coverImage?.url}
        title="Latest News and Stories"
      />
      <Content category="News" categories={categories} />
    </>
  );
};

export default NewsPage;
