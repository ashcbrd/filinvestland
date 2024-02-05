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
import moment from "moment";
import Request from "@/config/Request";
import { Grid } from "@mui/material";
import { PresentationForm } from "@/app/containers/header";
interface Props {
  data: any;
  motionSettings: any;
  slider: boolean;
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

const CondoCard = ({ data, motionSettings, slider }: Props) => {
  const [showInquireModal, setShowInquireModal] = useState(false);
  const [projectData, setProjectData] = useState<any>({});
  const [projectId, setProjectId] = useState("");
  const [today, setToday] = useState(moment() as any);

  const handleShowModal = (id: string) => {
    const filteredObject = data.find((x: any) => x.Project.id === id);
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
      <div className="relative z-50 mx-auto -mb-28 hidden w-full px-4 md:-my-28 md:px-10 lg:block">
        <div className="flex flex-wrap">
          <div className="mb-12 w-full px-4 xl:mb-0">
            <div className="relative mb-6 flex w-full min-w-0 flex-col break-words">
              <motion.div className="relative flex flex-nowrap gap-4 pb-12">
                {slider && shouldRenderSlider ? (
                  <Slider {...sliderSettings}>
                    {data.map((x: any, index: any) => (
                      <div key={index}>
                        <Propcard
                          virtualRedirect={x.Project.virtualTour.urlEmbed}
                          propertyStatus={x.Project.propertyDetails.status}
                          id={x.Project.id}
                          key={x.id}
                          imgSrc={x.Project.PropertyImages[0].image.url}
                          title={x.Project.title}
                          location={x.Project.location.title}
                          type={x.type}
                          addtionalCss={"absolute top-0 left-0"}
                          redirect={handleRedirect}
                          minPrice={x.Project.minPrice}
                          maxPrice={x.Project.maxPrice}
                          numberOfBedrooms={
                            x.Project.propertyDetails.numberOfBedrooms
                          }
                          onSetProjectId={setProjectId}
                          onShowModal={handleShowModal}
                          slug={x.Project.slug}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <Grid container spacing={2} columns={12}>
                    {
                      // Render individual Propcards if there are 3 or fewer items
                      data.map((x: any, index: number) => (
                        <Grid item xs={4} key={index}>
                          <Propcard
                            virtualRedirect={x?.Project?.virtualTour?.embedUrl}
                            propertyStatus={x.Project.propertyDetails.status}
                            id={x.Project.id}
                            key={x.id}
                            imgSrc={x.Project.PropertyImages[0].image.url}
                            title={x.Project.title}
                            location={x.Project.location.title}
                            type={x.type}
                            addtionalCss={"absolute top-0 left-0"}
                            redirect={handleRedirect}
                            minPrice={x.Project.minPrice}
                            maxPrice={x.Project.maxPrice}
                            numberOfBedrooms={
                              x.Project.propertyDetails.numberOfBedrooms
                            }
                            onSetProjectId={setProjectId}
                            onShowModal={handleShowModal}
                            slug={x.Project.slug}
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
          <PresentationForm
            formData={projectData?.Project}
            onClose={toggleModal}
            inquireNow
            title="Inquire Now"
          />
        </Modal>
      )}
    </>
  );
};

export default CondoCard;
