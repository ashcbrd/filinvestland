import Propcard from "@/app/components/cards/propcard";
import Banner from "@/app/components/carousel/banner";
import Recomcard from "@/app/components/news/recomcard";
import qs from "qs";
import { serializeRichText } from "@/app/utils/serializeRichText";
import NotFound from "../../not-found";

async function getData(id: any) {
  try {
    const query = {
      ...(id
        ? {
            slug: {
              equals: id,
            },
          }
        : {}),
    };

    const stringifiedQuery = qs.stringify(
      {
        where: query,
      },
      { addQueryPrefix: true }
    );

    const newsQuery = await fetch(`${process.env.CMS_URL}/api/futura-news${stringifiedQuery}`, {
      cache: "no-store",

      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const news = await newsQuery.json();

    return {
      content: news,
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

const Index = async ({ params }: any) => {
  const req = await getData(params.id);

  if (req.error || !req.content.docs.length) return <NotFound />;

  const page = req.content.docs[0];

  const formattedText = page?.content[1]?.children[0].text?.replace(/\n/g, "\n");

  const formattedText1 = page?.content[4]?.children[0].text?.replace(/\n/g, "\n");

  const recommendation1 = page?.ProjectRecommendation?.recommendation1;
  const recommendation2 = page?.ProjectRecommendation?.recommendation2;

  const newsDate = page.Date;

  console.log("dd", page?.coverImage?.url);
  return (
    <>
      <Banner imageUrl={page?.coverImage?.url} title={page?.title} description={page?.shortDescription} date={newsDate} />

      <div className="container mx-auto !mb-20 !mt-20 flex min-h-screen w-full flex-col gap-x-8">
        <div className="py-8 md:flex-1 md:px-4">
          <div className="flex flex-1 flex-col justify-center gap-4">
            {serializeRichText(page.content, true, {
              isFromNewsPage: true,
            })}
          </div>
        </div>
        <div>
          <p className="mb-7 font-quicksand text-[22px] font-bold">Featured Communities</p>
          <Recomcard recommendation1={recommendation1} recommendation2={recommendation2} />
        </div>
      </div>
    </>
  );
};

export default Index;
