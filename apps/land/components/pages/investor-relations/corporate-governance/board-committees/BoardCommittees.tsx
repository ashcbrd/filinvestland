import React from "react";
import Table from "./Table";
import FadeUp from "@/components/animation/FadeUp";
import Fade from "@/components/animation/Fade";

const BoardCommittees = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "board-committees-board-committees"
  );
  const flatBoardCommittees = data?.rowData?.map((item: any) => {
    return [item?.committees, item?.name, item?.position];
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
              header={["Committees", "Name", "Position"]}
              rows={flatBoardCommittees ?? []}
            />
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default BoardCommittees;
