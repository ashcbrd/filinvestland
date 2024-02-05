import React from "react";
import Table from "./Table";
import FadeUp from "@/components/animation/FadeUp";
import Fade from "@/components/animation/Fade";

const SeniorManagementOfficers = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) =>
      item.blockType === "board-committees-senior-management-officers"
  );
  const flatSeniorManagementOfficer = data?.rowData?.map((item: any) => {
    return [item.committees, item.name];
  });

  return (
    <div>
      <div className="mt-5 lg:mt-10">
        <FadeUp>
          <h4 className="text-jet text-2xl font-bold">{data?.tableTitle}</h4>
        </FadeUp>
        <Fade>
          <div className="mt-5">
            <Table
              header={["Committees", "Name"]}
              rows={flatSeniorManagementOfficer ?? []}
            />
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default SeniorManagementOfficers;
