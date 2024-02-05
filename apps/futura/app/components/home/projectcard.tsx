"use client";
import React, {
  useState,
  useCallback,
  MouseEventHandler,
  useEffect,
} from "react";
import Propcard from "@/app/components/cards/propcard";
import { motion } from "framer-motion";
import Modal from "../general/modal";
import Card from "@/app/components/cards/card";
import Link from "next/link";
import numbro from "numbro";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getters } from "@/app/context/Project";
import moment from "moment";
import Request from "@/config/Request";
import { PresentationForm } from "@/app/containers/header";
import { Grid } from "@mui/material";

interface Props {
  data: any;
  motionSettings: any;
  slider: boolean;
  className?: any;
}

const closeIcon = (
  <div>
    <svg
      width="64px"
      height="64px"
      viewBox="0 0 24.00 24.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <circle
          opacity="0.5"
          cx="12"
          cy="12"
          r="10"
          stroke="#000000"
          stroke-width="0.528"
        ></circle>{" "}
        <path
          d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
          stroke="#000000"
          stroke-width="0.528"
          stroke-linecap="round"
        ></path>{" "}
      </g>
    </svg>
  </div>
);

const ProjectCard = ({
  data,
  motionSettings,
  slider,
  className = "",
}: Props) => {
  const [showInquireModal, setShowInquireModal] = useState(false);
  const [projectData, setProjectData] = useState({});
  const [projectId, setProjectId] = useState("");

  const handleShowModal = (id: string) => {
    const filteredObject = data.list.find((x: any) => x.id === id);
    if (filteredObject) {
      setProjectData(filteredObject);
      setShowInquireModal(true);
    }
  };

  const handleRedirect = () => {
    window.location.href = "/project";
  };

  const toggleModal = useCallback(() => {
    setShowInquireModal((prevModal) => !prevModal);
  }, []);

  const shouldRenderSlider = data && data.length > 3;
  const get = getters();

  // filter all available projects
  const availableProjects = get.projects?.list?.filter((list: any) => {
    return list.propertyDetails.status.title !== "Sold-Out";
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <>
      <div className={`${className} mx-auto w-full px-4 md:px-10`}>
        <div className="flex flex-wrap">
          <div className="mb-12 w-full xl:mb-0">
            <div className="relative mb-6 flex w-full min-w-0 flex-col break-words">
              <motion.div
                {...motionSettings}
                className="relative flex flex-wrap gap-4"
              >
                {slider && shouldRenderSlider ? (
                  <Slider {...sliderSettings}>
                    {availableProjects.map((x: any, index: any) => (
                      <div key={index}>
                        <Propcard
                          virtualRedirect={
                            x.virtualTourEmbedUrls[0].virtualTourEmbedUrl
                          }
                          propertyStatus={x.propertyDetails.status}
                          id={x.id}
                          key={x.id}
                          imgSrc={x.headerImage.url}
                          title={x.title}
                          location={x.location.title}
                          type={x.propertyType?.type || ""}
                          addtionalCss={"absolute top-0 left-0"}
                          redirect={handleRedirect}
                          minPrice={x.minPrice}
                          maxPrice={x.maxPrice}
                          numberOfBedrooms={x.propertyDetails.numberOfBedrooms}
                          onSetProjectId={setProjectId}
                          onShowModal={handleShowModal}
                          slug={x.slug}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 12, sm: 8, md: 8, lg: 12 }}
                  >
                    {
                      // Render individual Propcards if there are 3 or fewer items
                      availableProjects.map((x: any, index: number) => (
                        <Grid item xs={12} sm={4} md={4} lg={4} key={index}>
                          <Propcard
                            virtualRedirect={
                              x?.virtualTourEmbedUrls?.[0]?.virtualTourEmbedUrl
                            }
                            propertyStatus={x.propertyDetails.status}
                            id={x.id}
                            key={x.id}
                            imgSrc={x.headerImage.url}
                            title={x.title}
                            location={x.location.title}
                            type={x.propertyType?.type || ""}
                            addtionalCss={"absolute top-0 left-0"}
                            redirect={handleRedirect}
                            minPrice={x.minPrice}
                            maxPrice={x.maxPrice}
                            numberOfBedrooms={
                              x.propertyDetails.numberOfBedrooms
                            }
                            onSetProjectId={setProjectId}
                            onShowModal={handleShowModal}
                            slug={x.slug}
                          />
                        </Grid>
                      ))
                    }
                  </Grid>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {showInquireModal && (
        <Modal>
          <PresentationForm formData={projectData} onClose={toggleModal} />
        </Modal>
      )}
    </>
  );
};

export default ProjectCard;
