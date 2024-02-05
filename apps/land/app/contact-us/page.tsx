import Content from "@/components/pages/contact-us/Content";
import { metaBuilder } from "@/helpers/metaBuilder";
import { getPageContent } from "../page";

const CONTACT_US_PAGE_ID = "6402fc1da18562766728404c";

export async function generateMetadata() {
  const content = await getPageContent(CONTACT_US_PAGE_ID);
  return metaBuilder(content);
}

const ContactUsPage = async () => {
  const content = await getPageContent(CONTACT_US_PAGE_ID);
  return <Content content={content} />;
};

export default ContactUsPage;
