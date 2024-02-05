import Content from "./_client/Content";
import { getPageContent } from "../../page";
import { metaBuilder } from "@/helpers/metaBuilder";
import qs from "qs";
import NotFound from "../../not-found";

const DISCLOSURES_PAGE_ID = "6403761dcda32af5e1100236";
export async function generateMetadata() {
  const content = await getPageContent(DISCLOSURES_PAGE_ID);
  return metaBuilder(content);
}

interface Props {
  params: {
    slug1: string;
  };
  searchParams: {
    page: number;
  };
}

const getDisclosures = async (props: any) => {
  try {
    const content = await getPageContent(DISCLOSURES_PAGE_ID);
    /* const { title, breadcrumbs, image, imageSmall } = HEADER_INFO.disclosures; */

    const slug = props.params.slug1;

    const query = {
      ...(slug
        ? {
            slug: {
              equals: slug,
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

    const res = await fetch(
      `${process.env.CMS_URL}/api/disclosure-categories${stringifiedQuery}`,
      {
        cache: "no-store",

        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (data.docs.length) {
      return { content: content, slug };
    } else {
      return { error: true, content: null, slug: null };
    }
  } catch (error) {
    return { error, content: null, slug: null };
  }
};

const DisclosuresPage = async (props: Props) => {
  const { slug, content, error } = await getDisclosures(props);

  if (error) return <NotFound />;

  return (
    <Content slug={slug} searchParams={props.searchParams} content={content} />
  );
};

export default DisclosuresPage;
