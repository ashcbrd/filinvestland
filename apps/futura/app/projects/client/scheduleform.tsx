"use client";
import React, {
  useState,
  useCallback,
  MouseEventHandler,
  useEffect,
} from "react";
import moment from "moment";
import Card from "@/app/components/cards/card";
import numbro from "numbro";
import Link from "next/link";
import Modal from "@/app/components/general/modal";
import Button from "@/app/components/button";
import Request from "@/config/Request";
import { PresentationForm } from "@/app/containers/header";

const ScheduleForm = ({ data, className = "w-52" }: any) => {
  const [showInquireModal, setShowInquireModal] = useState(false);
  const [projectData, setProjectData] = useState({});
  const [projectId, setProjectId] = useState("");
  const [today, setToday] = useState(moment() as any);

  const handleShowModal = () => {
    if (data) {
      setProjectData(data);
      setShowInquireModal(true);
    }
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
      <Button onClick={handleShowModal} className={`ml-5 py-4 ${className}`}>
        Book Now
      </Button>
      {showInquireModal && (
        <Modal>
          <PresentationForm data={projectData} onClose={toggleModal} />
        </Modal>
      )}
    </>
  );
};

export default ScheduleForm;
