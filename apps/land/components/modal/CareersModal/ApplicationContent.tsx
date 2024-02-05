"use client";
import React, { Dispatch, Fragment, useState, useEffect, FC } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import LevelOne from "./LevelOne";
import LevelTwo from "./LevelTwo";
import { T_ManatalCareerJob } from "@/types/global";
import Submit from "@/components/svg/Submit";
import Fade from "@/components/animation/Fade";

type ApplicationContentProps = {
  selectedCareer?: T_ManatalCareerJob;
  withPosition?: boolean;
  withCoverLetter?: boolean;
  backButton?: any;
  fileTitle?: string;
  isEmbeddedForm?: boolean;
};

type SubmittedProps = {
  backButton: any;
};

const Submitted = ({ backButton }: SubmittedProps) => {
  return (
    <Fade>
      <div className="flex w-full justify-center py-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-center gap-3">
          <Submit />
          <h1 className="text-lg font-bold">
            Your application has been submitted.
          </h1>
          {backButton}
        </div>
      </div>
    </Fade>
  );
};

const ApplicationContent = ({
  selectedCareer,
  withPosition,
  withCoverLetter,
  backButton,
  fileTitle,
  isEmbeddedForm = false,
}: ApplicationContentProps) => {
  const { register, getValues, setValue, reset } = useForm();
  const [level, setLevel] = useState(1);
  const [onSubmitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmit = async () => {
    if (onSubmitting == true) return;
    setSubmitting(true);
    const data = getValues();

    if (!isEmbeddedForm) {
      try {
        let response = await fetch(
          `/api/manatal/csrf-token?hash=${selectedCareer?._hash}`
        );
        let res = await response.json();

        if (res?.token?.length) {
          const file = data?.cv?.[0];
          if (file) {
            const jobDataUrl = `https://api.manatal.com/open/v3/career-page/${process.env.MANATAL_CLIENT_ID}/jobs/${selectedCareer?.id}/application-form/`;

            const rawJobData = await fetch(jobDataUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });

            const jobData = await rawJobData.json();

            const formData = new FormData();
            formData.append("file", file);

            // const urlFromBucket = await fetch(`${process.env.CMS_URL}/upload`, {
            //   method: "POST",
            //   body: formData,
            // });

            // const url = await urlFromBucket.json();
            const submitURL = `https://api.manatal.com/open/v3/career-page/${process.env.MANATAL_CLIENT_ID}/jobs/${selectedCareer?.id}/application-form/`;

            response = await fetch(submitURL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                application_data: {
                  [jobData[0].id]: `${data.firstName} ${data.lastName}`,
                  [jobData[1].id]: data.email,
                  [jobData[2].id]: data.contact,
                  [jobData[3].id]: data.cv,
                },
              }),
            });

            if (response.ok) {
              reset();
              setSubmitted(true);
            }
          } else {
            alert("Please attach resume");
          }
        } else throw "failture";
      } catch (error) {
        alert("This position may no longer be available!");
        setLevel(1);
        reset();
      }
    } else {
      const { cv, firstName, lastName, email, contact, coverLetter } =
        getValues();

      const formData = new FormData();

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("contact", contact);
      formData.append("coverLetter", coverLetter);
      formData.append("email", email);
      formData.append("file", cv);

      const URL = `${process.env.CMS_URL}/api/filinvest-smtp`;
      const response = await fetch(URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again!");
        setLevel(1);
        reset();
      }
    }
    setSubmitting(false);
  };

  const ApplicantForm = () => {
    return level === 1 ? (
      <LevelOne
        setLevel={setLevel}
        register={register}
        getValues={getValues}
        setValue={setValue}
        selectedCareer={selectedCareer?._hash}
        withPosition={withPosition}
        withCoverLetter={withCoverLetter}
        fileTitle={fileTitle}
      />
    ) : (
      <LevelTwo
        setLevel={setLevel}
        register={register}
        getValues={getValues}
        onSubmit={onSubmit}
        onSubmitting={onSubmitting}
      />
    );
  };

  useEffect(() => {
    setValue("position", selectedCareer?.position_name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCareer]);

  return (
    <div className="w-full p-6 pb-10">
      {submitted ? <Submitted backButton={backButton} /> : <ApplicantForm />}
    </div>
  );
};

export default ApplicationContent;
