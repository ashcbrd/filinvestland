"use client";
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import ROUTES from "@/helpers/routes";
import BorderButton from "@/components/button/BorderButton";
import Image from "next/image";
import Link from "next/link";
import FadeLeft from "@/components/animation/FadeLeft";
import Fade from "@/components/animation/Fade";
import FadeDown from "@/components/animation/FadeDown";
import qs from "qs";
import { toCurrency } from "@/helpers/homeCalculator";
import ReCAPTCHA from "react-google-recaptcha";
import verifyCaptcha from "../../../app/server-action";
import { useZoho } from "../../../hooks/useZoho";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const center = {
  lat: 14.5752826,
  lng: 121.0490635,
};

export default function ContactUsBlock({ content }: any) {
  const params = useSearchParams();
  const contactUsBlock = content?.content?.find(
    (item: any) => item.blockType === "contact-us"
  );

  const items = contactUsBlock?.item;
  const [fillingState, setFillingState] = useState(true);
  const [submit, setSubmit] = useState<any>(null);
  const { register, handleSubmit, getValues } = useForm();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GMAPS_TOKEN as string,
  });
  const { PRIVACY_POLICY, TERMS_OF_USE } = ROUTES;
  const [project, setProject] = useState<any>(null);
  const [captcha, setCaptcha] = useState<any>(null);
  const recaptchRef = useRef<any>(null);
  const [captchaError, setCaptchaError] = useState<any>(null);
  const { submitInquiry } = useZoho();

  const renderMap = () => {
    return isLoaded ? (
      // @ts-ignore
      <GoogleMap mapContainerStyle={containerStyle} zoom={18} center={center}>
        {/* @ts-ignore */}
        <Marker
          position={{
            lat: contactUsBlock?.latitudeFilinvestOfficeMap,
            lng: contactUsBlock?.longitudeFilinvestOfficeMap,
          }}
        />
      </GoogleMap>
    ) : (
      <></>
    );
  };

  useEffect(() => {
    const loadProject = async () => {
      const stringifiedQuery = (query: Object) => {
        return qs.stringify(
          {
            where: query, // ensure that `qs` adds the `where` property, too!
          },
          { addQueryPrefix: true }
        );
      };

      const query = {
        slug: {
          equals: params?.get("project"),
        },
      };

      const res = await fetch(
        `${process.env.CMS_URL}/api/projects${stringifiedQuery(query)}`,

        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await res.json();
      setProject(jsonData.docs[0]);
    };

    loadProject();
  }, []);

  const submitForm = async (searchParams: any) => {
    const { privacy } = getValues();
    if (!privacy) {
      return alert("Please accept terms and policy");
    }

    if (!captcha) {
      return setCaptcha("");
    }

    try {
      const data = {
        data: [
          {
            First_Name: searchParams.firstName,
            Last_Name: searchParams.lastName,
            Email: searchParams.email,
            Phone: searchParams.contact,
            Web_Inquiry: searchParams.notes,
            Lead_Source: "Website",
            Website_Source: window.location.hostname,
            Reason_for_contacting_us: "Inquire about a property",
            Project_Category: project?.propertyType?.title,
            Project_Name: project?.title,
            Product_Type: project?.propertyDetails?.projectType?.title,
            Management_Group: project?.locationGroup?.title,
            Amount: project?.price.toString(),
          },
        ],
        trigger: ["approval", "workflow", "blueprint"],
      };
      const res = await submitInquiry(data);

      if (res) {
        setSubmit(res);
        setFillingState(false);
      } else {
        alert("Oooops! Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCaptchaSubmission = async (token: string | null) => {
    return await verifyCaptcha(token)
      .then((res: any) => {
        if (res?.success) {
          setCaptcha(res.success);
        } else {
          setCaptchaError(res?.message);
        }
      })
      .catch((err: any) => {
        console.error(err);
        setCaptcha(false);
      });
  };

  return (
    <>
      {fillingState ? (
        <section className="mt-24">
          <div className="mx-9 flex flex-col gap-24 md:flex-row xl:mx-16 2xl:mx-44">
            <div className="flex-1">
              <div>
                <FadeLeft>
                  <h2 className="text-4xl font-bold text-dark-cornflower-blue">
                    {contactUsBlock?.title}
                  </h2>
                </FadeLeft>
                {project && (
                  <div className="relative mt-6 flex min-h-[150px] gap-4">
                    <Image
                      src={project?.headerImage?.url ?? project?.coverImage.url}
                      width={170}
                      height={250}
                      alt={project?.logo?.alt}
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                    <div className="flex w-full flex-col gap-2">
                      <h2 className="text-2xl font-bold text-dark-cornflower-blue">
                        {project?.title}
                      </h2>
                      <div>
                        <p className="text-sm font-bold text-gray-400">
                          Address
                        </p>
                        <p className="text-md line-clamp-3 font-bold text-jet sm:w-auto sm:text-ellipsis md:text-lg lg:text-2xl">
                          {project?.locationGroup.title}
                          {", "}
                          {project?.location?.title}
                          {", "}
                          {project?.subLocationTwo?.title}
                        </p>
                      </div>
                      {project?.price > 0 && (
                        <div>
                          <p className="text-sm font-bold text-gray-400">
                            Price
                          </p>
                          <p className="text-md font-bold text-jet sm:w-auto sm:text-ellipsis md:text-lg lg:text-2xl">
                            {toCurrency(project?.price)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-8">
                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name<span className="text-red">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="firstName"
                          className="focus:ring-none block w-full border-[1px] border-jet p-2 shadow-sm sm:text-sm"
                          {...register("firstName", { required: true })}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name<span className="text-red">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="lastName"
                          className="focus:ring-none block w-full border-[1px] border-jet p-2 shadow-sm sm:text-sm"
                          {...register("lastName", { required: true })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact<span className="text-red">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="contact"
                        className="focus:ring-none block w-full border-[1px] border-jet p-2 shadow-sm sm:text-sm"
                        {...register("contact", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email<span className="text-red">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        className="focus:ring-none block w-full border-[1px] border-jet p-2 shadow-sm sm:text-sm"
                        {...register("email", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message<span className="text-red">*</span>
                    </label>
                    <div className="mt-2">
                      <textarea
                        rows={4}
                        id="message"
                        className="focus:ring-none block w-full border-[1px] border-jet p-2 shadow-sm sm:text-sm"
                        defaultValue={""}
                        {...register("notes", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="relative mt-4 flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="privacy"
                        aria-describedby="privacy"
                        type="checkbox"
                        className="focus:ring-none h-4 w-4 rounded border-gray-300 text-dark-cornflower-blue"
                        {...register("privacy")}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="privacy"
                        className="font-medium text-gray-700"
                      >
                        I understand and agree to the{" "}
                        <Link
                          href={`${PRIVACY_POLICY.url}`}
                          target="_blank"
                          className="text-dark-cornflower-blue underline"
                        >
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link
                          href={`${TERMS_OF_USE.url}`}
                          target="_blank"
                          className="text-dark-cornflower-blue underline"
                        >
                          Terms of Use
                        </Link>
                        .
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col justify-between lg:flex-row">
                    <div className="captcha">
                      <ReCAPTCHA
                        ref={recaptchRef}
                        sitekey={
                          process.env.GOOGLE_RECAPTCHA_SITE_KEY ??
                          "6LdR3xwpAAAAAMRLrT3h4K9OdIl1XSPU2kpxFZgi"
                        }
                        onChange={handleCaptchaSubmission}
                      />
                      {captcha !== null && captcha === "" && (
                        <p className="pt-6 text-[red]">
                          {captchaError ??
                            "Please verify that you are not a robot."}
                        </p>
                      )}
                    </div>
                    <div>
                      <button type="submit" className="mt-14 lg:mt-4">
                        <BorderButton
                          buttonText="Submit"
                          textColor="dark-cornflower-blue"
                          borderColor="dark-cornflower-blue"
                        />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-14">
              {items?.map((item: any) => (
                <div className="flex gap-5" key={item?.id}>
                  <div className="max-w-[56.56px] lg:max-w-[70px] xl:max-w-[75px]">
                    <Image
                      src={item?.logo?.url}
                      width={75}
                      height={75}
                      alt={item?.logo?.alt || "alt"}
                    />
                  </div>
                  <div className="mt-5">
                    <Fade>
                      <h2 className="text-2xl font-bold text-dark-cornflower-blue">
                        {item?.title}
                      </h2>
                    </Fade>
                    <div className="flex max-w-[444px] flex-wrap gap-12">
                      {item?.addressContact?.map(
                        (child: any, index: number) => (
                          <FadeDown key={child?.id}>
                            <div
                              className={`${
                                item?.addressContact?.length > 2 &&
                                index >= 1 &&
                                "-mt-12"
                              }`}
                            >
                              <p className="mt-3 font-bold text-jet">
                                {child?.address}
                              </p>
                              {child?.isAddressSecondary ? (
                                <p className="text-sm text-jet">
                                  {child?.address2}
                                </p>
                              ) : (
                                <p className="font-bold">{child?.address2}</p>
                              )}
                              <p className="mt-2 text-dim-gray">
                                {child?.phone}
                              </p>
                            </div>
                          </FadeDown>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-32">{renderMap()}</div>
        </section>
      ) : (
        <div className="mx-9 my-24 md:flex-row xl:mx-16 2xl:mx-44">
          {submit ? (
            <h2 className="text-xl">
              Successfully received your information. We will get back to you as
              soon as possible.
            </h2>
          ) : (
            <h2 className="text-xl">
              There was an error submitting your data. Please contact Filinvest
              support team.
            </h2>
          )}
        </div>
      )}
    </>
  );
}
