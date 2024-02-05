"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation } from "swiper/modules";
import CustomNavigation from "../slider/custom-navigation";
import Propcard from "../cards/propcard";
import { useCallback, useState } from "react";
import moment from "moment";
import Link from "next/link";
import numbro from "numbro";
import Card from "../cards/card";
import Request from "@/config/Request";
import Modal from "../general/modal";

interface CondoCardCarouselProps {
  items: React.ReactNode[];
}

const CondoCardCarousel: React.FC<CondoCardCarouselProps> = ({ items }) => {
  const [showInquireModal, setShowInquireModal] = useState(false);
  const [projectData, setProjectData] = useState({});
  const [projectId, setProjectId] = useState("");
  const [today, setToday] = useState(moment() as any);

  const handleShowModal = (id: string) => {
    const filteredObject = items.find((x: any) => x.Project.id === id);
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

  return (
    <div className="relative z-40 -mt-28 flex items-center justify-center px-8 lg:hidden">
      <Swiper
        navigation={{
          prevEl: ".custom-prev-button",
          nextEl: ".custom-next-button",
        }}
        loop={true}
        modules={[EffectCoverflow, Navigation]}
      >
        {items?.map((x: any) => (
          <SwiperSlide>
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
              numberOfBedrooms={x.Project.propertyDetails.numberOfBedrooms}
              onSetProjectId={setProjectId}
              onShowModal={handleShowModal}
              slug={x.Project.slug}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-0 left-0 right-0 top-0 z-[99] mx-auto my-auto mt-[260px] flex h-max w-full justify-between">
        <CustomNavigation onClick={() => {}} direction="prev" />
        <CustomNavigation onClick={() => {}} direction="next" />
      </div>
      {showInquireModal && (
        <Modal>
          <PresentationForm data={projectData} onClose={toggleModal} />
        </Modal>
      )}
    </div>
  );
};

const PresentationForm = ({ onClose, data }: any) => {
  const [page, setPage] = useState(1);
  const [today, setToday] = useState(moment() as any);
  const [selected, setSelected] = useState(null);
  const [inputTime, setInputTime] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputNotes, setInputNotes] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const dates = [
    moment(today),
    moment(today).add(1, "day"),
    moment(today).add(2, "day"),
    moment(today).add(3, "day"),
    moment(today).add(4, "day"),
  ];

  const datesMobile = [
    moment(today),
    moment(today).add(1, "day"),
    moment(today).add(2, "day"),
  ];

  const areAllInputsFilled = () => {
    const DateNumber = moment(selected).format("D");
    return (
      inputTime.trim() !== "" &&
      inputName.trim() !== "" &&
      inputPhone.trim() !== "" &&
      inputEmail.trim() !== "" &&
      inputNotes.trim() !== "" &&
      isAgreed === true &&
      !isNaN(Number(DateNumber))
    );
  };

  const onForward = (limit = 5 as any) => {
    setPage((p: any) => p + 1);
    setToday(moment(today).add(limit, "day"));
  };

  const onBackward = (limit = 5 as any) => {
    setPage((p: any) => p - 1);
    setToday(moment(today).subtract(limit, "day"));
  };

  const handleSubmit = async () => {
    setLoader(true);
    try {
      await Request(`/api`).post(`/book`, {
        data: [
          {
            First_Name: inputName,
            Last_Name: "",
            Email: inputEmail,
            Phone: inputPhone,
            Notes: inputNotes,
          },
        ],
        trigger: ["approval", "workflow", "blueprint"],
      });

      setLoader(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      onClose();
    } catch (e) {
      setLoader(false);
    }
  };

  return (
    <div className="left-0 top-0 z-[999999] flex items-center justify-center overflow-scroll bg-black/50 p-10 md:fixed md:h-screen md:w-screen md:p-0">
      <Card style="max-w-[600px] bg-white mt-[500px] duration-300 rounded-xl p-10">
        <div className="mb-4 flex items-center justify-between ">
          <div className="flex w-full flex-col items-center gap-y-4">
            <p className="w-full text-center font-quicksand text-[25px] font-bold md:text-[20px]">
              Schedule a Trip Now
            </p>
            <div className="h-[3px] w-[100px] rounded-full bg-[#E12827]" />
          </div>
          <button
            onClick={onClose}
            className="ray-500 rounded-full border p-3 shadow hover:text-gray-700 focus:outline-none"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.6569 5.65685C16.0474 5.26633 16.6804 5.26633 17.0709 5.65685C17.4614 6.04738 17.4614 6.68038 17.0709 7.07091L12.4142 11.7276L17.071 16.3844C17.4615 16.7749 17.4615 17.4079 17.071 17.7984C16.6804 18.1889 16.0474 18.1889 15.6569 17.7984L11 13.1416L6.34315 17.7984C5.95262 18.1889 5.31962 18.1889 4.92909 17.7984C4.53856 17.4079 4.53856 16.7749 4.92909 16.3844L9.58586 11.7276L4.92909 7.07091C4.53856 6.68038 4.53856 6.04738 4.92909 5.65685C5.31962 5.26633 5.95262 5.26633 6.34315 5.65685L11 10.3137L15.6569 5.65685Z"
                fill="#000"
              />
            </svg>
          </button>
        </div>
        <div className="mt-12">
          <div className="mb-[25px] flex border-b border-b-[#D4D4D4]">
            <div className="relative inline-block w-full flex-shrink-0 px-[5px] pb-[11px] text-[20px] leading-[24px]">
              Property
              <div className="absolute bottom-0 left-0 h-[1px] w-full max-w-[153px] bg-red-700"></div>
            </div>
          </div>
          {data ? (
            <div className="mb-[35px] flex items-center">
              <div
                className="relative mr-[23px] h-[170px] w-full max-w-[148px] bg-gray-50 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${data.Project.headerImage.url})`,
                  borderRadius: "10px",
                }}
              >
                <Link
                  href={`/project/${data.Project.slug}`}
                  className="absolute bottom-0 left-0 right-0 top-0"
                ></Link>
              </div>
              <div className="">
                <h4 className="pb-[13px] text-[20px] font-[500] leading-[32px] md:text-[26px]">
                  <Link href={`/project/${data.Project.slug}`}>
                    {data.Project.title}
                  </Link>
                </h4>
                <div className="pb-[9px]">
                  <label className="leading-[24px] text-[#787878] md:text-[18px]">
                    Address
                  </label>
                  <p className="text-[18px] font-[500] leading-[25px] md:text-[20px]">
                    {data.Project.subLocationTwo?.title},{" "}
                    {data.Project.location.title}
                  </p>
                </div>
                <div>
                  <label className="leading-[24px] text-[#787878] md:text-[18px]">
                    Unit Price
                  </label>
                  <p className="font-[500] uppercase leading-[25px] md:text-[20px]">
                    ₱ {numbro(data.Project.minPrice).format("0.0a")} -{" "}
                    {numbro(data.Project.maxPrice).format("0.0a")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <input
              type="text"
              className="mt-3 w-full border bg-gray-100 px-4 py-4"
              placeholder="Search"
            />
          )}
        </div>
        <div className="mt-30 relative mb-10 flex items-center">
          <div className="flex w-full items-center">
            {page > 1 && (
              <button
                onClick={() => onBackward(5)}
                className="pointer-events-auto absolute left-[-18px] top-[50%] z-[1] flex h-[40px] w-[40px] flex-shrink-0 translate-y-[-50%] rotate-[90deg] items-center justify-center rounded-[100%] border-[1px] border-[#E2E2E2] bg-white transition-all duration-[0.3s] ease-in-out hover:opacity-50"
              >
                <svg
                  className=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 21 12"
                  fill="none"
                >
                  <path d="M1 1L10.5 10.5L20 1" stroke="#000000"></path>
                </svg>
              </button>
            )}
            {dates.map((d: any) => (
              <div
                key={`d_${moment(d).format("MMDDYYYY")}`}
                className="w-[20%] px-[2.5px]"
              >
                <button
                  onClick={() => setSelected(d)}
                  className={`${
                    moment(selected).format("MMDDYYYY") ===
                    moment(d).format("MMDDYYYY")
                      ? "!border-[#E12827] !bg-[#E12827] !text-white"
                      : ""
                  } flex w-full flex-col items-center rounded-md border border-[#DDD] py-[13px] text-center text-[16px] leading-[24px] transition-all duration-[0.3s] ease-in-out`}
                >
                  <span className="block">{d.format("ddd")}</span>
                  <span className="block text-[30px] font-[500] leading-[35px]">
                    {d.format("DD")}
                  </span>
                  <span className="block">{d.format("MMM")}</span>
                </button>
              </div>
            ))}
            <button
              onClick={() => onForward(5)}
              className="pointer-events-auto absolute right-[-18px] top-[50%] z-[1] flex h-[40px] w-[40px] flex-shrink-0 translate-y-[-50%] rotate-[270deg] items-center justify-center rounded-[100%] border-[1px] border-[#E2E2E2] bg-white transition-all duration-[0.3s] ease-in-out hover:opacity-50"
            >
              <svg
                className=""
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 21 12"
                fill="none"
              >
                <path d="M1 1L10.5 10.5L20 1" stroke="#000000"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-2">
          {" "}
          <div className="mb-[25px] flex border-b border-b-[#D4D4D4]">
            <div className="relative inline-block w-full flex-shrink-0 px-[5px] pb-[11px] text-[20px] leading-[24px]">
              Personal Information
              <div className="absolute bottom-0 left-0 h-[1px] w-full max-w-[153px] bg-red-700"></div>
            </div>
          </div>
          <form className="gap-4 md:grid md:grid-cols-2">
            <div className="col-span-2 flex flex-col md:flex-row">
              <input
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                type="text"
                className="mt-3 flex-1 border bg-gray-100 px-4 py-4 focus:outline-[#E02926]/80 md:mr-2"
                placeholder="Time"
              />
              <input
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                type="text"
                className="mt-3 flex-1 border bg-gray-100 px-4 py-4 focus:outline-[#E02926]/80 md:ml-2"
                placeholder="Name"
              />
            </div>
            <div className="col-span-2 flex flex-col md:flex-row">
              <input
                value={inputPhone}
                onChange={(e) => setInputPhone(e.target.value)}
                type="text"
                className="mt-3 flex-1 border bg-gray-100 px-4 py-4 focus:outline-[#E02926]/80 md:mr-2"
                placeholder="Phone"
              />
              <input
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                type="text"
                className="mt-3 flex-1 border bg-gray-100 px-4 py-4 focus:outline-[#E02926]/80 md:ml-2"
                placeholder="Email"
              />
            </div>
          </form>
        </div>
        <div className="col-span-2">
          <textarea
            value={inputNotes}
            onChange={(e) => setInputNotes(e.target.value)}
            className="mt-3 w-full border bg-gray-100 px-4 py-4 focus:outline-[#E02926]/80"
            rows={4}
            placeholder="Enter your message"
          />
        </div>

        <div className="col-span-2 flex items-center">
          <input
            type="checkbox"
            id="agreeCheckbox"
            className="mr-2 bg-red-500"
            onChange={() => setIsAgreed(!isAgreed)}
            checked={isAgreed}
          />
          <label htmlFor="agreeCheckbox" className="text-gray-600">
            By submitting this form I agree to{" "}
            <a
              target="_blank"
              href="https://filinvest.com/terms-and-conditions"
              className="text-[#E02926] underline hover:text-[#E02926]/70"
            >
              Terms of Use
            </a>
          </label>
        </div>

        <div className="col-span-2 mt-12">
          <button
            disabled={!areAllInputsFilled()}
            onClick={handleSubmit}
            className={`w-full ${
              !areAllInputsFilled()
                ? `bg-gray-200 text-black`
                : `bg-[#E02926] text-white`
            } h-[60px] rounded py-3 uppercase`}
            type="button"
          >
            Submit your request
          </button>
        </div>
      </Card>
    </div>
  );
};

export default CondoCardCarousel;
