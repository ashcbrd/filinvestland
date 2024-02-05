"use client";
import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import Button from "./button";
import { Typography } from "../typography/typography";
import SuccessModal from "./SuccessModal";
import { useZoho } from "@/app/hooks/useZoho";
import ReCAPTCHA from "react-google-recaptcha";
import verifyCaptcha from "@/app/server-action";

type Props = {
  data: any;
};

// !NOTE: mainly used in Home page and reused on other pages.

const _initState = {
  firstName: "",
  lastName: "",
  contact: "",
  email: "",
  message: "",
};

export const InvestorsConcerge: React.FC<Props> = ({ data }) => {
  const { submitInquiry } = useZoho();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setIsFormData] = useState<any>(_initState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState<any>(null);
  const recaptchRef = useRef<any>(null);
  const [captchaError, setCaptchaError] = useState<any>(null);

  const handleSend = () => {
    setIsSubmitted((prev) => !prev);
    setIsFormData(_initState);
    recaptchRef?.current?.reset();
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!captcha) {
      return setCaptcha("");
    }

    setIsSubmitting(true);
    try {
      const data = {
        data: [
          {
            First_Name: formData.firstName,
            Last_Name: formData.lastName,
            Email: formData.email,
            Phone: formData.contact,
            Web_Inquiry: formData.message,
            Lead_Source: "Website",
            Website_Source: window.location.hostname,
            Reason_for_contacting_us: `FLI Investor's Concierge`,
          },
        ],
        trigger: ["approval", "workflow", "blueprint"],
      };
      const res = await submitInquiry(data);
      console.log(res);

      if (res) {
        setIsSubmitted(true);
      } else {
        alert("Oooops! Something went wrong.");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
      setIsFormData(_initState);
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
    <section
      id={data.page[3].id}
      className="h-auto w-full bg-[#1E1002] px-8 py-16 sm:py-20 md:px-12 md:py-[100px]"
    >
      <div className="mx-auto h-auto w-full max-w-[1280px] space-y-10 sm:space-y-16">
        <div className="block text-center lg:hidden">
          <Typography
            text={data.page[3].sectionTitle}
            color="light"
            font="cormorant"
            size="heading2"
            className="leading-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="flex flex-col items-center justify-center gap-8 lg:col-span-5">
            <img
              src={data.page[3].profileImage.url}
              className="h-auto w-[365px] rounded-full"
              alt="Image"
            />
            <div className="space-y-2 text-center font-sans">
              <Typography
                text={data.page[3].name}
                color="light"
                font="nunito"
                size="30"
                className="leading-none"
              />
              <Typography
                text={data.page[3].phoneNumber}
                color="dim"
                font="nunito"
                size="26"
                className="leading-none"
              />
              <Typography
                text={data.page[3].email}
                color="dim"
                font="nunito"
                size="26"
                className="leading-none underline"
              />
            </div>
          </div>

          <div className="space-y-10 lg:col-span-7">
            <Typography
              text={data.page[3].sectionTitle}
              color="light"
              font="cormorant"
              size="heading2"
              className="hidden leading-none lg:block"
            />
            <form
              onSubmit={onSubmit}
              className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
              autoComplete="true"
            >
              <input
                autoComplete="true"
                value={formData?.firstName}
                required
                type="text"
                placeholder="First Names"
                className={cn(
                  "h-14 w-full border-b-2 border-[#BC5D07] bg-transparent font-nunito text-base text-[#967E67] outline-none transition-all duration-200 ease-in-out placeholder:text-[#967E67] hover:border-[#F4EBD0] focus:border-[#F4EBD0] lg:text-xl"
                )}
                onChange={(e: any) =>
                  setIsFormData((value: any) => ({
                    ...value,
                    firstName: e.target.value,
                  }))
                }
                style={{ color: "white" }}
              />
              <input
                value={formData?.lastName}
                autoComplete="true"
                required
                type="text"
                placeholder="Last Name"
                className={cn(
                  "h-14 w-full border-b-2 border-[#BC5D07] bg-transparent font-nunito text-base text-[#967E67] outline-none transition-all duration-200 ease-in-out placeholder:text-[#967E67] hover:border-[#F4EBD0] focus:border-[#F4EBD0] lg:text-xl"
                )}
                onChange={(e: any) =>
                  setIsFormData((value: any) => ({
                    ...value,
                    lastName: e.target.value,
                  }))
                }
                style={{ color: "white" }}
              />
              <input
                value={formData?.contact}
                autoComplete="true"
                required
                type="text"
                pattern="(\+63|0)9\d{9}"
                title="Please enter a valid phone number"
                placeholder="Phone Number"
                className={cn(
                  "h-14 w-full border-b-2 border-[#BC5D07] bg-transparent font-nunito text-base text-[#967E67] outline-none transition-all duration-200 ease-in-out placeholder:text-[#967E67] hover:border-[#F4EBD0] focus:border-[#F4EBD0] lg:text-xl"
                )}
                onChange={(e: any) =>
                  setIsFormData((value: any) => ({
                    ...value,
                    contact: e.target.value,
                  }))
                }
                style={{ color: "white" }}
              />
              <input
                value={formData?.email}
                autoComplete="true"
                required
                type="email"
                placeholder="Email Address"
                className={cn(
                  "h-14 w-full border-b-2 border-[#BC5D07] bg-transparent font-nunito text-base text-[#967E67] outline-none transition-all duration-200 ease-in-out placeholder:text-[#967E67] hover:border-[#F4EBD0] focus:border-[#F4EBD0] lg:text-xl"
                )}
                onChange={(e: any) =>
                  setIsFormData((value: any) => ({
                    ...value,
                    email: e.target.value,
                  }))
                }
                style={{ color: "white" }}
              />
              <input
                value={formData?.message}
                type="text"
                placeholder="Message"
                className={cn(
                  "h-14 w-full border-b-2 border-[#BC5D07] bg-transparent font-nunito text-base text-[#967E67] outline-none transition-all duration-200 ease-in-out placeholder:text-[#967E67] hover:border-[#F4EBD0] focus:border-[#F4EBD0] lg:text-xl",
                  "md:col-start-1 md:col-end-3"
                )}
                onChange={(e: any) =>
                  setIsFormData((value: any) => ({
                    ...value,
                    message: e.target.value,
                  }))
                }
                style={{ color: "white" }}
              />
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
              <div />
              <Button
                type="submit"
                disabled={isSubmitting}
                label="Send"
                className="mt-8 w-full xs:w-[200px]"
              />
            </form>
            <SuccessModal open={isSubmitted} onClose={() => handleSend()} />
          </div>
        </div>
      </div>
    </section>
  );
};
