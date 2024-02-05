"use client";

import React from "react";
import Link from "next/link";
import ReactSlider from "react-slick";
import numbro from "numbro";

const PropertyBanner = ({ featured }: { featured?: any }) => {
  const NextArrow = (props: any) => {
    return (
      <div className=" absolute bottom-[90px] right-[20px] flex !max-w-[1116px] justify-end md:right-[40px]">
        <button
          className={`pointer-events-auto flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-[100%] bg-[#E12827] pt-[3px] transition-all duration-[0.3s] ease-in-out hover:opacity-50`}
          onClick={props.onClick}
        >
          <svg
            width="24"
            height="24"
            className="translate-x-[1px] translate-y-[-1px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 6L15 12L9 18" stroke="#fff" stroke-width="2" />
          </svg>
        </button>
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <div className="absolute bottom-[90px] right-[80px] z-[2] flex !max-w-[1116px] justify-end md:right-[120px]">
        <button
          className={`pointer-events-auto mr-[13px] flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-[100%] bg-[#E12827] pt-[2px] transition-all duration-[0.3s] ease-in-out hover:opacity-50 md:mr-[0]`}
          onClick={props.onClick}
        >
          <svg
            width="9"
            height="14"
            className="translate-x-[-1px] translate-y-[-1px]"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 1L2 7L8 13" stroke="#fff" stroke-width="2" />
          </svg>
        </button>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoPlaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="mx-auto max-w-[1223px] mt-[128px] px-[25px] md:mt-14">
      {featured?.length > 0 && (
        <div className="overflow-hidden rounded-[20px]">
          <ReactSlider {...settings} className="w-full">
            {featured?.map((n: any) => (
              <div key={`new_${n.id}`}>
                <div
                  className="relative flex min-h-[340px] items-end justify-center bg-black bg-cover bg-center pb-[162px] pt-[40px] md:!min-h-[440px] md:px-[30px]"
                  style={{
                    backgroundImage: `url(${n?.headerImage?.url})`,
                  }}
                >
                  <div className="mx-auto w-full max-w-[1223px]">
                    {/* <p className="absolute bottom-[100%] left-0 text-white bg-[#990912] px-4 py-1 rounded-full z-[99] h-[31px] text-[15px] font-[500] flex items-center justify-center">Featured</p> */}
                    <div className="relative ml-0 w-full items-end md:ml-12 lg:ml-0 p-10 md:p-0">
                      <div
                        className={`relative flex h-max flex-col items-center rounded-bl-xl rounded-tr-xl  md:bg-white px-[33px] pb-[40px] pr-[42px] pt-[20px] md:mx-[10px] bg-white/70 md:!px-[20px] md:w-[595px] md:items-start`}
                      >
                        <p
                          className="absolute bottom-[100%] left-0 z-[99] flex h-[31px] items-center justify-center rounded-[10px] bg-[#990912] px-4 py-1 text-[15px] font-[500] text-white md:!left-[0] md:!rounded-t-[10px]"
                          style={{
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          }}
                        >
                          Featured
                        </p>
                        <div className="flex w-full items-end justify-center md:justify-between">
                          <h3 className="w-max text-[20px] font-[600] text-black md:text-[28px]">
                            {n?.title}
                          </h3>
                          <p className="hidden pb-[3px] font-[500] uppercase md:block md:text-[20px]">
                            ₱ {numbro(n?.minPrice).format("0.00a")} -{" "}
                            {numbro(n?.maxPrice).format("0.00a")}
                          </p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <div>
                            <p className="flex items-center text-center text-black md:text-start md:text-[18px]">
                              <svg
                                className="mr-[10px]"
                                width="10"
                                height="17"
                                viewBox="0 0 10 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 0C2.24305 0 0 2.54213 0 5.66668C0 6.60467 0.206923 7.53469 0.600292 8.35958L4.72657 16.8174C4.78151 16.9301 4.88618 17 5 17C5.11382 17 5.2185 16.9301 5.27343 16.8174L9.40123 8.35679C9.79308 7.53469 10 6.60463 10 5.66664C10 2.54213 7.75695 0 5 0ZM5 8.5C3.62153 8.5 2.50002 7.22895 2.50002 5.66668C2.50002 4.1044 3.62153 2.83336 5 2.83336C6.37847 2.83336 7.49999 4.1044 7.49999 5.66668C7.49999 7.22895 6.37847 8.5 5 8.5Z"
                                  fill="#B6B6B6"
                                />
                              </svg>
                              {n?.location?.title}
                            </p>
                          </div>
                          <div className="flex">
                            <p className="mr-[35px] flex items-center gap-x-2 text-center text-black md:text-start md:text-[18px]">
                              <svg
                                width="21"
                                height="16"
                                viewBox="0 0 21 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.4558 9.35325V14.3547C20.4558 14.7491 20.1285 15.0692 19.7252 15.0692C19.322 15.0692 18.9947 14.7491 18.9947 14.3547V13.6402H1.46113V14.3547C1.46113 14.7491 1.13384 15.0692 0.730565 15.0692C0.327293 15.0692 0 14.7491 0 14.3547V9.35325C0 8.17147 0.98334 7.20976 2.19169 7.20976H18.2641C19.4725 7.20976 20.4558 8.17147 20.4558 9.35325Z"
                                  fill="#E12827"
                                />
                                <path
                                  d="M2.19169 5.78077V1.49379C2.19169 1.09939 2.51899 0.779297 2.92226 0.779297H17.5336C17.9368 0.779297 18.2641 1.09939 18.2641 1.49379V5.78077H16.0724V5.06627C16.0724 4.27818 15.4171 3.63728 14.6113 3.63728H12.4196C11.6138 3.63728 10.9585 4.27818 10.9585 5.06627V5.78077H9.49734V5.06627C9.49734 4.27818 8.84202 3.63728 8.03621 3.63728H5.84452C5.0387 3.63728 4.38339 4.27818 4.38339 5.06627V5.78077H2.19169Z"
                                  fill="#E12827"
                                />
                              </svg>
                              {n?.propertyDetails?.numberOfBedrooms}
                            </p>
                            <p className="flex items-center gap-x-2 text-center text-black md:text-start md:text-[18px]">
                              <svg
                                width="18"
                                height="16"
                                viewBox="0 0 18 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17.9536 12.7702V13.6402C17.9536 13.8207 17.8406 13.9856 17.6617 14.0663C14.6968 15.4035 11.7056 15.4035 8.74063 14.0663C8.39323 13.9096 8.04626 13.7733 7.69964 13.6574L7.65203 13.1009C7.36952 11.1896 6.50448 9.75905 5.05521 8.84389C3.63357 7.94619 2.01548 7.55981 0.222427 7.68752L0 7.70832V2.20828C0 2.02785 0.113004 1.86291 0.291906 1.78224C2.12487 0.955523 3.96789 0.639891 5.80853 0.835368V1.49381C5.81536 3.22659 6.19807 4.52122 6.98779 5.37208C7.46719 5.88862 8.01651 6.22384 9.0021 6.68116C9.06791 6.71167 9.13551 6.74278 9.22572 6.78414C9.33792 6.83549 9.39941 6.86364 9.45042 6.88705C9.63284 6.97079 9.76813 7.0339 9.90139 7.09784C10.242 7.26134 10.5281 7.41161 10.7995 7.57329C11.0503 7.72278 11.2839 7.87956 11.5058 8.04936C11.9427 8.38367 12.2283 8.76267 12.4742 9.27994C12.5585 9.45715 12.5879 9.52781 12.7598 9.95432C13.1743 10.9824 13.4991 11.4696 14.2535 11.8995C15.3522 12.5256 16.3931 12.8213 17.3741 12.7702L17.9536 12.7702ZM17.9536 11.8182L17.3254 11.8185C16.5833 11.8602 15.7481 11.6243 14.8175 11.0941C14.3164 10.8085 14.0926 10.4728 13.7523 9.62873C13.5721 9.18167 13.5403 9.10529 13.4448 8.90446C13.139 8.26109 12.7629 7.76198 12.189 7.32286C11.9338 7.12757 11.6665 6.94813 11.3814 6.77833C11.0792 6.59827 10.7654 6.43339 10.3974 6.25678C10.2575 6.18961 10.117 6.12411 9.9294 6.03797C9.87779 6.01429 9.81562 5.98582 9.70396 5.93472C9.61521 5.89406 9.54907 5.86362 9.48517 5.83396C8.61593 5.43066 8.16299 5.15424 7.79758 4.76051C7.19205 4.10807 6.87067 3.02103 6.86464 1.49209V1.00367C7.6486 1.17035 8.43172 1.42987 9.21299 1.78224C11.8806 2.9854 14.5219 2.9854 17.1894 1.78224C17.5405 1.6239 17.9536 1.85419 17.9536 2.20828L17.9536 11.8182ZM14.5213 6.49526C14.9588 6.49526 15.3134 6.17538 15.3134 5.78076C15.3134 5.38615 14.9588 5.06627 14.5213 5.06627C14.0839 5.06627 13.7293 5.38615 13.7293 5.78076C13.7293 6.17538 14.0839 6.49526 14.5213 6.49526ZM6.61587 13.3614C4.6656 12.9483 2.72199 13.1833 0.764176 14.0663C0.413113 14.2246 0 13.9943 0 13.6403V8.66596L0.318367 8.63625C1.85686 8.52683 3.23104 8.85497 4.44962 9.62442C5.63747 10.3745 6.35595 11.5595 6.60331 13.2139L6.61587 13.3614Z"
                                  fill="#E12827"
                                />
                              </svg>
                              {n?.propertyDetails?.minSize} -{" "}
                              {n?.propertyDetails?.maxSize} sqm
                            </p>
                          </div>
                          <p className="block text-center text-white md:hidden">
                            ₱ {numbro(n?.minPrice).format("0.0a")} -{" "}
                            {numbro(n?.maxPrice).format("0.0a")}
                          </p>
                        </div>
                        <Link
                          href={`/project/${n?.slug}`}
                          className="bottom-0 right-0 mt-4 flex h-[31px] items-center justify-center rounded-full  bg-[#E12827] px-[24px] py-1 text-white hover:bg-red-400 md:absolute md:mt-0 md:rounded-none md:rounded-tl-xl md:text-[18px]"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ReactSlider>
        </div>
      )}
    </div>
  );
};

export default PropertyBanner;
