import { HEADER_INFO } from "@/components/pages/investor-relations/corporate-governance/constants";
import Content from "@/components/pages/investor-relations/corporate-governance/annual-corporate-governance-report/Content";
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
  const content = await getPageContent("639a584bb60dc36e6fc86d90");
  return metaBuilder(content);
}

const AnnualCorporateGovernanceReportPage = async () => {
  const content = await getPageContent("63f21bbf9813fc62eebc9960");
  HEADER_INFO.annualCorporateGovernanceReport;
  return (
    <>
      <Content content={content} />
    </>
  );
};

export default AnnualCorporateGovernanceReportPage;
