import Content from "@/components/pages/investor-relations/presentations/Content";
import { metaBuilder } from "@/helpers/metaBuilder";
import { getPageContent } from "../page";

const PRESENTATION_PAGE_ID = "64058e3b9736d66cfb1b10fb";

export async function generateMetadata() {
  const content = await getPageContent(PRESENTATION_PAGE_ID);
  return metaBuilder(content);
}

const PresentationPage = async () => {
  const content = await getPageContent(PRESENTATION_PAGE_ID);
  return (
    <>
      <Content content={content} />
    </>
  );
};

export default PresentationPage;
