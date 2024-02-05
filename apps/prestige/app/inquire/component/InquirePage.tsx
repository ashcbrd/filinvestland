"use client";
import cn from "classnames";
import styled from "styled-components";
import Banner from "../../components/carousel/banner";
import { Typography } from "../../components/typography/typography";
import { Checkbox } from "./../component/checkbox";
import Button from "../../components/general/button";
import { InvestorsConcerge } from "../../components/general/investorsconcerge";
import { useEffect, useRef, useState } from "react";
import qs from "qs";
import Map from "./map";
import { getDomainRedirection } from "@/app/utils";
import SuccessModal from "@/app/components/general/SuccessModal";
import { useZoho } from "@/app/hooks/useZoho";
import ReCAPTCHA from "react-google-recaptcha";
import verifyCaptcha from "@/app/server-action";

interface BookingParams {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone: string;
  Notes?: string;
  Lead_Source: string;
  Website_Source: string;
  Reason_for_contacting_us: string;
  Project_Category: string;
  Product_Type: string;
  Project_Name: string;
  Management_Group: string;
  Web_Inquiry: string;
}

function InquirePage({ sections, investor, project }: any) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const { submitInquiry } = useZoho();
  const [captcha, setCaptcha] = useState<any>(null);
  const recaptchRef = useRef<any>(null);
  const [captchaError, setCaptchaError] = useState<any>(null);

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setContact("");
    setEmailAddress("");
    setMessage("");
    setIsAgreed(false);
    recaptchRef?.current?.reset();
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

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!isAgreed) {
      return alert(
        "Please agree with the Filinvest Group Privacy Policy and Terms of Use."
      );
    }

    if (!captcha) {
      return setCaptcha("");
    }

    setIsSubmitting(true);
    try {
      const data = {
        data: [
          {
            First_Name: firstName,
            Last_Name: lastName,
            Email: emailAddress,
            Phone: contact,
            Web_Inquiry: message,
            Lead_Source: "Website",
            Website_Source: window.location.hostname,
            Reason_for_contacting_us: "Inquire about a property",
            Project_Category: project?.propertyType?.title,
            Project_Name: project?.title,
            Product_Type: project?.propertyDetails?.projectType?.title,
            Management_Group: project?.locationGroup?.title,
          },
        ],
        trigger: ["approval", "workflow", "blueprint"],
      };
      const res = await submitInquiry(data);

      if (res) {
        setIsSent(!isSent);
      } else {
        alert("Oooops! Something went wrong.");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
      resetFields();
    }
  };

  function abbreviateNumber(number: number) {
    if (!number) return;
    const abbreviations = ["", "k", "m", "b", "t"];
    const tier = (Math.log10(Math.abs(number)) / 3) | 0;

    if (tier === 0) return number.toString();

    const suffix = abbreviations[tier];
    const scale = Math.pow(10, tier * 3);
    const scaledNumber = number / scale;
    const isWholeNumber = scaledNumber % 1 === 0;

    if (isWholeNumber) {
      return `${scaledNumber}${suffix}`;
    } else {
      const roundedNumber = (Math.round(scaledNumber * 10) / 10).toFixed(1);
      return `${roundedNumber}${suffix}`;
    }
  }

  return (
    <>
      <Map />
      <section className="min-h-fit w-full bg-[#F4EBD0] px-8 py-16 sm:py-20 md:px-12 md:py-[100px]">
        <form onSubmit={onSubmit}>
          <div className="mx-auto grid h-auto w-full max-w-[1650px] grid-cols-1 gap-14 lg:grid-cols-[440px,_1fr] lg:gap-20">
            <div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-1">
                <div className="space-y-4 bg-[#311700] p-12">
                  <Typography
                    size="heading2"
                    color="light"
                    font="cormorant"
                    text="Customer Service"
                    className="!text-4xl"
                  />
                  {sections.page?.customerService.length > 0 &&
                    sections.page?.customerService.map((x: any) => (
                      <div className="space-y-2" key={x.id}>
                        <Typography
                          size="20"
                          color="white"
                          text={`${x.contactTitle}`}
                          className="leading-snug"
                        />
                        <Typography
                          size="20"
                          color="light"
                          text={`${x.value}`}
                          className="leading-snug !text-[#A0672D]"
                        />
                      </div>
                    ))}
                </div>

                <div className="space-y-4 bg-[#311700] p-12 md:space-y-8">
                  <Typography
                    size="heading2"
                    color="light"
                    font="cormorant"
                    text="Sales Hotline"
                    className="!text-4xl"
                  />
                  {sections.page?.salesHotline.length > 0 &&
                    sections.page?.salesHotline.map((x: any) => (
                      <div className="space-y-2">
                        <Typography
                          size="20"
                          color="white"
                          text={`${x.contactTitle}`}
                          className="leading-snug"
                        />
                        <Typography
                          size="20"
                          color="light"
                          text={`${x.value}`}
                          className="leading-snug !text-[#A0672D]"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Typography
                size="heading2"
                color="dark"
                font="cormorant"
                text="Inquire About Prestige"
                className="font-medium leading-snug"
              />
              <Typography
                size="20"
                color="dark"
                text={
                  sections.page?.description ||
                  "Maintaining your privacy is an important part of the products and services rendered by the Filinvest Group."
                }
                className="w-full max-w-[566px]"
              />
              {project && (
                <div className="relative !mt-10 flex gap-4">
                  {project?.headerImage?.url && (
                    <img
                      src={project?.headerImage?.url}
                      alt={project?.title ? project.title : "image"}
                      className="h h-36 w-36"
                    />
                  )}
                  <div className="flex w-full flex-col gap-2">
                    <h2 className="text-dark-cornflower-blue text-2xl">
                      {project.title}
                    </h2>
                    <div>
                      <p className="text-sm">Address:</p>
                      <p className="text-md text-jet line-clamp-3 sm:w-auto sm:text-ellipsis md:text-lg lg:text-xl">
                        {project.title} is located at{" "}
                        {`${
                          project?.subLocationTwo
                            ? `${project?.subLocationTwo?.title},`
                            : ""
                        }`}{" "}
                        {project?.location?.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">Price:</p>
                      {project.minPrice && project.maxPrice && (
                        <p className="text-md text-jet sm:w-auto sm:text-ellipsis md:text-lg lg:text-xl">{`${abbreviateNumber(
                          project.minPrice
                        )} - ${abbreviateNumber(project.maxPrice)}`}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="!mt-12 grid grid-cols-1 gap-8 xl:grid-cols-2">
                <div className="col-span-1 space-y-1">
                  <input
                    required
                    type="text"
                    id="first-name"
                    name="first-name"
                    placeholder="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={cn(
                      "h-14 w-full border bg-transparent px-5 font-nunito text-xl text-[#261119] outline-none transition-all duration-200 ease-in-out placeholder:text-[#261119]",
                      "border-[#A0672D] hover:border-[#311700] focus:border-[#311700]"
                    )}
                  />
                </div>
                <div className="col-span-1 space-y-1">
                  <input
                    required
                    type="text"
                    id="last-name"
                    name="last-name"
                    placeholder="Last Name *"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={cn(
                      "h-14 w-full border bg-transparent px-5 font-nunito text-xl text-[#261119] outline-none transition-all duration-200 ease-in-out placeholder:text-[#261119]",
                      "border-[#A0672D] hover:border-[#311700] focus:border-[#311700]"
                    )}
                  />
                </div>
                <div className="col-span-1 space-y-1">
                  <input
                    pattern="(\+63|0)9\d{9}"
                    title="Please enter a valid phone number"
                    required
                    type="text"
                    id="mobile"
                    name="mobile"
                    placeholder="Mobile *"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className={cn(
                      "h-14 w-full border bg-transparent px-5 font-nunito text-xl text-[#261119] outline-none transition-all duration-200 ease-in-out placeholder:text-[#261119]",
                      "border-[#A0672D] hover:border-[#311700] focus:border-[#311700]"
                    )}
                  />
                </div>
                <div className="col-span-1 space-y-1">
                  <input
                    required
                    type="email"
                    id="email-address"
                    name="email-address"
                    placeholder="Email Address *"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className={cn(
                      "h-14 w-full border bg-transparent px-5 font-nunito text-xl text-[#261119] outline-none transition-all duration-200 ease-in-out placeholder:text-[#261119]",
                      "border-[#A0672D] hover:border-[#311700] focus:border-[#311700]"
                    )}
                  />
                </div>
                <div className="space-y-1 xl:col-span-2">
                  <textarea
                    cols={30}
                    rows={10}
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cn(
                      "h-auto w-full border bg-transparent px-5 pt-3 font-nunito text-xl text-[#261119] outline-none transition-all duration-200 ease-in-out placeholder:text-[#261119]",
                      "border-[#A0672D] hover:border-[#311700] focus:border-[#311700]"
                    )}
                  />
                </div>
              </div>
              <div className="col-span-2 flex items-start gap-4">
                <label className="flex">
                  <Checkbox
                    value={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                  />
                  <p className="pl-4">
                    I agree with the Filinvest Group{" "}
                    <a
                      href={
                        getDomainRedirection(
                          window?.location.origin,
                          sections?.page?.privacyPolicyLink
                        ) ?? "/"
                      }
                      target="_blank"
                      className="text-[#A0672D] underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      target="_blank"
                      href={
                        getDomainRedirection(
                          window?.location.origin,
                          sections?.page?.termsOfUseLink
                        ) ?? "/"
                      }
                      className="text-[#A0672D] underline"
                    >
                      Terms of Use
                    </a>{" "}
                    and give consent to the collection, use, storage, or any
                    other form of processing of my personal information in
                    accordance with Republic Act No. 10173 or the Data Privacy
                    Act of 2012. *
                  </p>
                </label>
              </div>

              <div className="captcha">
                <ReCAPTCHA
                  ref={recaptchRef}
                  sitekey={
                    process.env.GOOGLE_RECAPTCHA_SITE_KEY ??
                    "6LdR3xwpAAAAAMRLrT3h4K9OdIl1XSPU2kpxFZgi"
                  }
                  onChange={handleCaptchaSubmission}
                  theme="dark"
                />
                {captcha !== null && captcha === "" && (
                  <p className="pt-6 text-[red]">
                    {captchaError ?? "Please verify that you are not a robot."}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                label={isSubmitting ? "Submitting..." : "Submit"}
                className="!mt-12"
              />
            </div>
          </div>
        </form>
        <SuccessModal open={isSent} onClose={() => setIsSent(!isSent)} />
      </section>

      <InvestorsConcerge data={investor} />
    </>
  );
}

export default InquirePage;
