"use client";
import React, { Dispatch } from "react";

const LevelTwo = ({
  setLevel,
  register,
  getValues,
  onSubmit,
  onSubmitting,
}: {
  setLevel: Dispatch<number>;
  register: any;
  getValues: any;
  onSubmit: any;
  onSubmitting: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-dark-cornflower-blue">{`Applicant Privacy Statement`}</h3>
      <p className="text-dim-gray">
        Filinvest Land, Inc. (“FLI”), its affiliates and wholly-owned
        subsidiaries (collectively, the “Filinvest Group”) are committed to the
        protection and security of your personal data. In this regard, we
        conduct our business in accordance with Republic Act No. 10173 or the
        Data Privacy Act of 2012, its Implementing Rules and Regulations and
        such other applicable rules and regulations.
      </p>

      <p className="text-dim-gray">
        This Privacy Statement discloses how the Filinvest Group, through its
        authorized representatives and employees, will process the personal
        information you submit in connection with your employment application
        with us.
      </p>

      <p className="mt-3 font-bold text-jet">Collection of Personal Data</p>

      <p className="text-dim-gray">
        This Privacy Statement covers the personal data or information you share
        with us and/or which may be acquired or produced by the Filinvest Group
        during the application or recruitment process, with your consent, such
        as but not limited to:
      </p>

      <p className="text-dim-gray">
        Your name, address, email address, and other contact details; Your
        resume or CV, cover letter, previous and/or relevant work experience or
        other experience, educational background, transcripts of records,
        licenses, family background, affiliation or other information you
        provide to us in support of an application and/ or the application and
        recruitment process; Information from interviews, if any; Details of the
        type of employment you are or may be looking for, current and/or desired
        salary and other terms relating to compensation and benefits packages,
        willingness to relocate, or other job preferences; Details of how you
        heard about the position you are applying for; Any sensitive and/or
        demographic information obtained during the application or recruitment
        process such as gender, citizenship and/or nationality, criminal record,
        and/or medical or health information; and Reference information and/or
        information received from background checks (where applicable),
        including information provided by third parties.
      </p>

      <p className="text-dim-gray">
        It is your responsibility to obtain the consent from referees before
        providing their personal information to the Filinvest Group.
      </p>

      <p className="mt-3 font-bold text-jet">Use of Personal Data</p>

      <p className="text-dim-gray">
        We may also collect, use, disclose or process information contained in
        employment applications or other employment-related forms/documents
        submitted to us for administrative and management purposes, including
        but not limited to: recruitment, assessment of your suitability,
        appraisal, performance, promotion, training, career development,
        remuneration, health and safety, discipline, review of human resource
        policies and/or statistical purposes.
      </p>

      <p className="text-dim-gray">
        Personal data or any other information contained in employment
        applications shall be processed exclusively for legitimate purposes as
        specified above. Under no circumstances shall personal data or
        information be processed in a way that is incompatible with the purposes
        for which said data or information was originally collected.
      </p>

      <p className="text-dim-gray">
        If you are offered and accept employment with the Filinvest Group, the
        information collected during the application and recruitment process
        will become part of your employment record.
      </p>

      <p className="mt-3 font-bold text-jet">Security of Personal Data</p>

      <p className="text-dim-gray">
        The Filinvest Group takes all necessary technical, organizational and
        physical measures to protect the confidentiality and security of your
        personal data that is collected, processed, and stored as part of the
        application and recruitment process.
      </p>

      <p className="text-dim-gray">
        These efforts include, but are not necessarily limited to: (i) storing
        your personal information in secure operating environments that are not
        available to the public and that are only accessible to authorized
        employees, and our agents and contractors; and (ii) disposing the
        sensitive documents containing your personal information (e.g. biodata,
        resumes and/or CVs) through shredding or such other modes of secure
        disposal within two (2) years from date of application.
      </p>

      <p className="text-dim-gray">
        The employees, agents or representatives of the Filinvest Group who are
        involved in the processing of personal information or data shall operate
        and hold personal information or data under strict confidentiality if
        the personal information or data are not intended for public disclosure.
        This obligation shall continue even after the transfer to another
        position or upon termination of employment or contractual relations with
        the Filinvest Group.
      </p>

      <p className="mt-3 font-bold text-jet">Disclosure of Personal Data</p>

      <p className="text-dim-gray">
        Insofar as you have provided your consent or when we are otherwise
        legally entitled to do so, we will share your personal information or
        data with the affiliated entities and subsidiaries of the FLI where
        applicable, for the purposes indicated above.
      </p>

      <p className="text-dim-gray">
        Your personal data possessed by the Filinvest Group shall be kept
        confidential. However, it may be necessary for the Filinvest Group to
        disclose and transfer your personal data to third party companies,
        entities, or service providers engaged by the Filinvest Group to perform
        certain services on its behalf, including the following:
      </p>

      <div>
        <p className="text-dim-gray">Insurance providers;</p>
        <p className="text-dim-gray">Storage facility providers;</p>
        <p className="text-dim-gray">
          External advisors and other professional advisors, such as auditors
          and legal firms;
        </p>
        <p className="text-dim-gray">Contractors or sub-contractors; and</p>
        <p className="text-dim-gray">
          Such other service providers that may be appointed by the Filinvest
          Group including background investigators.
        </p>
        <p className="text-dim-gray">Reviewing your personal data</p>
      </div>

      <p className="text-dim-gray">
        You can review and correct personal data provided during the application
        process by notifying anyone from the Talent Acquisition Team or any
        attending HR personnel. We may take steps to verify your identity before
        providing you access to your personal data. You can help us keep your
        data accurate by notifying us of any changes to your mailing address,
        phone number, or e-mail address. In the event that you become an
        employee of the Filinvest Group, it shall be your responsibility to
        inform your local HR Officer with any changes in your personal
        information. Non-compliance violates the existing Company Code of
        Discipline.
      </p>

      <p className="mt-3 font-bold text-jet">Questions and Comments</p>

      <p className="text-dim-gray">
        The Filinvest Group will respond to reasonable requests to review your
        personal data collected by us and to correct, amend or delete any
        inaccuracies. If you have any questions or comments about the Applicant
        Privacy Statement, you may reach us at 918-8188 local 6114-6119 or email
        us at WeRecruitTalent@filinvestland.com.
      </p>

      <p className="text-dim-gray">
        I acknowledge that I have read and understood the terms and conditions
        of the foregoing Applicant Privacy Statement and that I accept and
        consent to the privacy practices and uses or disclosures of personal
        information in connection with my employment application with the
        Filinvest Group.
      </p>
      <div>
        <label className="mt-4 text-jet">
          Applicant Privacy Statement Acceptance
          <span className="text-red">*</span>
        </label>
        <div className="relative mt-2 flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="privacy"
              aria-describedby="privacy"
              type="checkbox"
              className="focus:ring-none h-4 w-4 rounded border-gray-300 text-dark-cornflower-blue"
              {...register("privacy", { required: true })}
            />
          </div>
          <div className="ml-3">
            <label htmlFor="privacy" className="text-dim-gray">
              I acknowledge that I have read and understood the terms and
              conditions of the Filinvest Applicant Privacy Statement above
            </label>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <div className="flex-1">
          <button
            className="w-44 rounded-full border-[1px] border-blue-ryb p-3 text-jet"
            onClick={() => setLevel(1)}
          >
            Back
          </button>
        </div>
        <button
          className={`w-44 flex-none rounded-full bg-blue-ryb p-3 text-white ${
            onSubmitting ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() => {
            const values = getValues();
            if (values.privacy) {
              onSubmit();
            } else {
              alert("Please accept the privacy terms");
            }
          }}
          disabled={onSubmitting}
        >
          {onSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default LevelTwo;
