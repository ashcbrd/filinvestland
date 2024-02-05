import Section from "@/components/Section/Section";
import Slider from "@/components/Slider/Slider";

const Banner = ({ project }: { project?: any }) => {
  return (
    <Section
      id="banner"
      fw
      className="relative h-[738px] bg-black bg-cover bg-center tablet:h-[400px]"
    >
      {project?.virtualTourEmbedUrls?.[0]?.virtualTourEmbedUrl ? (
        <iframe
          src={`${project.virtualTourEmbedUrls[0]?.virtualTourEmbedUrl}&play=1&brand=0&dh=0&mls=1&mt=0&title=0&search=0`}
          className="h-[738px] tablet:h-[400px]"
          width="100%"
        />
      ) : (
        <Slider
          slideClassName={`h-[738px] tablet:h-[400px]`}
          arrowType="bottom"
          slides={project.PropertyImages.map((img: any) => ({
            image: img.image.url,
          }))}
          overlay={
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/60"></div>
          }
        />
      )}
    </Section>
  );
};

export default Banner;
