import Content from "@/components/pages/investor-relations/corporate-governance/board-committees/Content";
import { metaBuilder } from "@/helpers/metaBuilder";

async function getPageContent(id: string) {
  const res = await fetch(`${process.env.CMS_URL}/api/pages/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata() {
  const content = await getPageContent("64040e725d08897a7559e5e8");
  return metaBuilder(content);
}

const BoardCommitteesPage = async () => {
  const content = await getPageContent("64040e725d08897a7559e5e8");
  return (
    <>
      <Content content={content} />
    </>
  );
};

export default BoardCommitteesPage;
