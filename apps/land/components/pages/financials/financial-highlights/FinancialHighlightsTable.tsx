"use client";
import React from "react";
import Table from "./Table";
import FadeDown from "@/components/animation/FadeDown";
import Fade from "@/components/animation/Fade";

export default function FinancialHighlightsTable({
  content,
  id,
  withMarginTop = false,
}: any) {
  const tableBlock = content?.content?.find((item: any) => item.id === id);

  const columns = tableBlock?.tableColumn?.map((col: any) => col?.header);

  let rows = tableBlock?.tableColumn?.[0]?.columnData?.map(
    (r: any, index: number) => {
      return tableBlock?.tableColumn?.map((x: any, i: number) => {
        switch (i) {
          case 0:
            return <b>{x?.columnData[index]?.data}</b>;
          case 1:
            return <b>{x?.columnData[index]?.data}</b>;
          default:
            return String(x?.columnData[index]?.data);
        }
      });
    }
  );

  return (
    <>
      <div className={`${withMarginTop && "mt-9"}`}>
        <FadeDown>
          <h4 className="text-dark-cornflower-blue text-center font-bold">
            {tableBlock?.typeOfData}
          </h4>
        </FadeDown>
        <Fade>
          <h2 className="text-jet text-center text-4xl font-bold">
            {tableBlock?.title}
          </h2>
        </Fade>

        <h4 className="text-dim-gray mt-9 text-center">
          {tableBlock?.description}
        </h4>
      </div>
      <Fade>
        <Table header={columns} rows={rows} />
      </Fade>
    </>
  );
}
