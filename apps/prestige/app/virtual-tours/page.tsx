import Banner from "@/app/components/carousel/banner";
import Carousels from "@/app/components/carousel/portfolio";
import VirtualSearch from "@/app/components/inputs/virtual-search";
import ProjectProvider from "@/context/Project";
import { InvestorsConcerge } from "../components/general/investorsconcerge";

async function getData() {
  const page = fetch(
    `${process.env.CMS_URL}/api/prestige-pages/65310c14578071a8a7bb3657`,
    { cache: "no-store" }
  );
  const featured = fetch(
    `${process.env.CMS_URL}/api/globals/prestige-featured-virtual-tours`
  );
  const investor = fetch(
    `${process.env.CMS_URL}/api/prestige-pages/64d34fc0281bd2de8791c8b4`,
    { cache: "no-store" }
  );

  const req = await Promise.all([page, featured, investor]);

  return {
    page: (await req[0].json()) as any,
    featured: (await req[1].json()) as any,
    investor: (await req[2].json()) as any,
  };
}

const Virtual = async () => {
  const req = (await getData()) as any;
  const sections = {
    page: req.page,
  };
  const featured = req.featured;
  const investor = {
    page: req.investor.content,
  };


  return (
    <ProjectProvider>
      <Banner
        opacity="bg-[#130A01]/80"
        title={sections.page.title}
        imageUrl={sections.page.content[0].image.url}
      />

      <section className="min-h-fit w-full space-y-20 bg-[#F4EBD0] px-0 sm:px-8 sm:pb-20 md:px-12 md:pb-[100px]">
        <div className="mx-auto h-auto w-full max-w-[1650px] space-y-20">
          <div className="relative mx-auto -mt-16 max-w-[1280px] px-8 sm:px-0">
            <VirtualSearch />
          </div>
          <Carousels featured={featured.FeaturedVirtualTours} isfor="virtual" />
        </div>
      </section>

      <InvestorsConcerge data={investor} />
    </ProjectProvider>
  );
};

export default Virtual;
