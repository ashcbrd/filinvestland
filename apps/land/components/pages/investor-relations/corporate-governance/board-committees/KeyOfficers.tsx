import React from "react";
import Table from "./Table";
import FadeUp from "@/components/animation/FadeUp";
import Fade from "@/components/animation/Fade";

const KeyOfficers = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "board-committees-key-officers"
  );
  const flatKeyCommittees = data?.rowData?.map((item: any) => {
    return [item.name, item.position];
  });

  return (
    <div>
      {data?.tableTitle && (
        <div className="mt-5 lg:mt-10">
          <FadeUp>
            <h4 className="text-2xl font-bold text-jet lg:text-3xl">
              {data?.tableTitle}
            </h4>
          </FadeUp>
          <Fade>
            <div className="mt-5 lg:w-3/4">
              <Table
                header={["Name", "Position"]}
                rows={flatKeyCommittees ?? []}
              />
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
};

export default KeyOfficers;
