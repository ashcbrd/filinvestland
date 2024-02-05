import { WEB_TITLE } from "./constants";

export function metaBuilder(content: any) {
  return {
    title: content?.meta?.title ? content?.meta?.title : content?.title,
    description: content?.meta?.description,
    openGraph: {
      title: content?.meta?.title,
      description: content?.meta?.description,
      url: `${process.env.LAND_URL}`,
      siteName: WEB_TITLE,
      images: [
        {
          url: content?.meta?.image?.url,
          width: content?.meta?.image?.width,
          height: content?.meta?.image?.height,
        },
      ],
      locale: "en-US",
      type: "website",
    },
  };
}
