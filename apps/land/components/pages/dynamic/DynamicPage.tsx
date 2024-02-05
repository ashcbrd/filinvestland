"use client";
import { serializeRichText } from "@/helpers/serializeRichText";
import FilesListing from "./FilesListing";
import RichText from "./RichText";
import MainHeader from "@/components/header/MainHeader";

const DynamicPage = ({
    data,
    header
}: {
    data: any,
    header: any
}) => {

    const elements = data?.dynamicContent.map((obj: any) => {

        switch (obj.blockType) {
            case 'files-listing':
                return <FilesListing content={obj} />
            case 'rich-text':
                return <RichText data={obj} />
            default: <div></div>
        }
    })

    return (
        <>
            {data?.useAdvancedHeader && <MainHeader
                title={header?.title}
                breadcrumbs={header?.breadcrumbs}
                bgUrl={header?.coverImage?.url}
                tabs={header?.tabs}
            />}
            <div className="mx-12 mt-8">
                {...elements}
            </div>
        </>

    );
};

export default DynamicPage;
