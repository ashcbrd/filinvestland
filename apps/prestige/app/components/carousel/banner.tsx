import React from "react";
import { Typography } from "../typography/typography";
import classNames from "classnames";
import Slider from "./Slider";
import ImageBanner from "../../components/carousel/headerbanner";

interface Props {
  imageUrl?: string;
  title?: string;
  description?: string;
  opacity?: string;
  sliderBanner?: boolean;
  project?: any;
}

const Banner = ({
  imageUrl,
  title,
  description,
  opacity,
  sliderBanner,
  project,
}: Props) => {
  return (
    <>
      {project?.virtualTourEmbedUrls?.length > 0 ? (
        <iframe
          src={`${project.virtualTourEmbedUrls[0]?.virtualTourEmbedUrl}&play=1&brand=0&dh=0&mls=1&mt=0&title=0&search=0`}
          className="tablet:h-[400px] h-[738px]"
          width="100%"
        />
      ) : (
        <>
          {sliderBanner ? (
            <section
              id="banner"
              className="tablet:h-[400px] relative h-[738px] bg-black bg-cover bg-center"
            >
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
            </section>
          ) : (
            <ImageBanner data={{ url: imageUrl }}>
              {title && (
                <div className="relative z-[1] flex h-auto w-full flex-col items-center justify-center gap-4 px-8">
                  <Typography
                    color="light"
                    size="heading2"
                    font="cormorant"
                    text={title}
                    className="text-center leading-none"
                  />
                  <Typography
                    color="light"
                    size="20"
                    font="nunito"
                    text={description}
                    className="text-center"
                  />
                </div>
              )}
            </ImageBanner>
          )}
        </>
      )}
    </>
  );
};

export default Banner;
