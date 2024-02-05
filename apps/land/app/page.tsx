import AboutUs from "@/components/pages/home/AboutUs";
import HeroSection from "@/components/pages/home/HeroSection";
import InvestorRelations from "@/components/pages/home/InvestorRelations";
import LookingForProperty from "@/components/pages/home/LookingForProperty";
import NewsStories from "@/components/pages/home/NewsStories";
import OurBusinesses from "@/components/pages/home/OurBusinesses";
import OurServices from "@/components/pages/home/OurServices";
import Projects from "@/components/pages/home/Projects";
import StockReport from "@/components/pages/home/StockReport";
import { metaBuilder } from "@/helpers/metaBuilder";

export async function getPageContent(id: string) {
  const res = await fetch(`${process.env.CMS_URL}/api/pages/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata() {
  const content = await getPageContent("639a5782b60dc36e6fc86c93");
  return metaBuilder(content);
}

const HomePage = async () => {
  const content = await getPageContent("639a5782b60dc36e6fc86c93");
  return (
    <div className="overflow-hidden">
      <HeroSection content={content} />
      <Projects content={content} />
      <LookingForProperty content={content} />
      <OurBusinesses content={content} />
      <OurServices content={content} />
      <AboutUs content={content} />
      <NewsStories content={content} />
      <InvestorRelations content={content} />
      <StockReport content={content} />
    </div>
  );
};

export default HomePage;
