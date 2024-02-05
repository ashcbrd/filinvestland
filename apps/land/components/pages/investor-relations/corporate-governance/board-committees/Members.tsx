import React from "react";
import BoardCommittees from "./BoardCommittees";
import KeyOfficers from "./KeyOfficers";
import SeniorManagementOfficers from "./SeniorManagementOfficers";
import TitleYear from "./TitleYear";

const Members = ({ content }: any) => {
  return (
    <div className="flex flex-col gap-6">
      <TitleYear content={content} />
      <div className="mt-5 lg:mt-10">
        <SeniorManagementOfficers content={content} />
      </div>
      <div className="mt-5 lg:mt-10">
        <BoardCommittees content={content} />
      </div>
      <div className="mt-5 lg:mt-10">
        <KeyOfficers content={content} />
      </div>
    </div>
  );
};

export default Members;
