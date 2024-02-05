"use client";
import React, { Dispatch, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import verifyCaptcha from "../../../app/server-action";

const LevelOne = ({
  setLevel,
  register,
  getValues,
  setValue,
  selectedCareer,
  withPosition = false,
  withCoverLetter = false,
  fileTitle,
}: {
  setLevel: Dispatch<number>;
  register: any;
  getValues: any;
  setValue: any;
  selectedCareer?: string;
  withPosition?: boolean;
  withCoverLetter?: boolean;
  fileTitle?: string;
}) => {
  const [captcha, setCaptcha] = useState<any>(null);
  const recaptchRef = useRef<any>(null);
  const [captchaError, setCaptchaError] = useState<any>(null);

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
    <div>
      <h3 className="text-xl font-bold text-dark-cornflower-blue">{`APPLICANT'S DETAILS`}</h3>
      <div className="mt-5 grid gap-x-6 gap-y-3">
        <div className="mt-5 grid gap-x-6 gap-y-3 md:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-jet"
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
              className="block text-sm font-medium text-jet"
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
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-jet"
              >
                Contact<span className="text-red">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="contact"
                  maxLength={13}
                  className="focus:ring-none block w-full border-[1px] border-jet p-2 shadow-sm sm:text-sm"
                  {...register("contact", { required: true })}
                  onChange={(e) =>
                    setValue(
                      "contact",
                      "+63" + e.target.value.replace(/\D/g, "").slice(2)
                    )
                  }
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-jet"
              >
                Email<span className="text-red">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  className="focus:ring-none block w-full border-[1px] border-jet p-2 shadow-sm sm:text-sm"
                  {...register("email", { required: true })}
                />
              </div>
            </div>
          </div>
          {withPosition && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-jet"
              >
                Selected Position
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="Position"
                  value={selectedCareer}
                  disabled
                  className="focus:ring-none block w-full border-[1px] border-jet p-2 shadow-sm disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
                  {...register("position", { required: true })}
                />
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-jet"
            >
              CV Link<span className="text-red">*</span>
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="Position"
                className="focus:ring-none block w-full border-[1px] border-jet p-2 shadow-sm disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
                pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
                {...register("cv", { required: true })}
              />
            </div>
          </div>
        </div>
        {withCoverLetter && (
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-jet"
            >
              Cover Letter<span className="text-red">*</span>
            </label>
            <div className="mt-2">
              <textarea
                {...register("coverLetter", { required: true })}
                className="focus:ring-none block w-full border-[1px] border-jet p-2 shadow-sm disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
                style={{ minHeight: 100 }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 flex flex-col justify-between sm:flex-row">
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
              {captchaError ?? "Please verify that you are not a robot."}
            </p>
          )}
        </div>
        <div className="mt-12 sm:mt-0">
          <button
            className="w-44 rounded-full bg-blue-ryb p-3 text-white"
            onClick={() => {
              const values = getValues();

              if (
                values.firstName &&
                values.lastName &&
                values.contact &&
                values.email &&
                values?.cv
              ) {
                if (!values.position && !values.coverLetter) {
                  return alert("Please enter a cover letter");
                }

                let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(values.email)) {
                  alert("Please input a valid email");
                  return;
                }

                let phNumber = /^(09|\+639)\d{9}$/;
                //let phNumber = /^\+639{9}$/;
                if (!phNumber.test(values.contact)) {
                  alert("Please input a valid PH contact number");
                  return;
                }

                const urlPattern = new RegExp(
                  "^(https?:\\/\\/)?" + // validate protocol
                    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
                    "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
                    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
                    "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
                    "(\\#[-a-z\\d_]*)?$",
                  "i"
                ); // validate fragment locator
                if (!urlPattern.test(values?.cv)) {
                  return alert("Please enter a valid CV Link");
                }

                const supportedMimeType = /\.(pdf|jpg|jpeg)$/i;

                if (
                  !supportedMimeType.test(values?.cv) &&
                  !values?.cv.includes("usp=drive_link")
                ) {
                  return alert(
                    "Supported links are pdf, jpg and, only and google drive links."
                  );
                }

                if (!captcha) {
                  return setCaptcha("");
                }

                setLevel(2);
              } else {
                alert("Please complete all required fields");
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelOne;
