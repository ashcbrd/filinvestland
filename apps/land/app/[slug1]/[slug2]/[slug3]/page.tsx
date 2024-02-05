import MainHeader from "@/components/header/MainHeader";
import { getRequest } from "@/helpers/getRequest";
import qs from "qs";
import DynamicPage from "@/components/pages/dynamic/DynamicPage";
import NotFound from "../../../not-found";

export const metadata = {
    title: "News",
    description: "News",
};

interface Props {
    params: {
        slug1: string;
        slug2: string;
        slug3: string;
    };
    searchParams: {
        page: number
    }
}

const NewsPage = async (props: Props) => {
    const { slug1, slug2, slug3 } = props.params;

    const query = {
        ...(slug1 && slug2 && {
            "urlPath": {
                equals: `/${slug1}/${slug2}/${slug3}`,
            },
        }),
    };

    const stringifiedQuery = qs.stringify(
        {
            where: query,
        },
        { addQueryPrefix: true })

    const dynamicPages = await getRequest(`/api/pages${stringifiedQuery}`);

    if (!dynamicPages.length || dynamicPages[0].pageType === "blockType") return <NotFound/>

    return (
        <>
             {!dynamicPages?.[0]?.useAdvancedHeader && <MainHeader title={dynamicPages[0].title ?? ""} />}
            <DynamicPage header={dynamicPages?.[0]?.header} data={dynamicPages[0]} />
        </>
    );
};

export default NewsPage;
