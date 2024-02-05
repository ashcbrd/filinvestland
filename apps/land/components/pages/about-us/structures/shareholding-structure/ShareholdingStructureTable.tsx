import React from "react";
import Table from "./Table";
export default function ShareholdingStructureTable({ content }: any) {
  const tableBlock = content?.content?.find(
    (item: any) => item.blockType === "structures-chart-table"
  );

  const columns = tableBlock?.tableColumn?.map((col: any) => col?.header);

  // TO DO implement table
  /* let rows = tableBlock?.tableColumn?.[0]?.columnData?.map(
    (r: any, index: number) => {
      return tableBlock?.tableColumn?.map((x: any, i: number) => {
        switch (i) {
          case 0:
            return String(x?.columnData[index]?.data);
          case 1:
            return <b>{x?.columnData[index]?.data}</b>;
          default:
            return String(x?.columnData[index]?.data);
        }
      });
    }
  ); */

  return (
    <Table
      header={columns}
      rows={[
        [
          "Common",
          <span className="flex flex-col gap-3">
            <p>{`A. L. Gotianun, Inc. ("ALGI") (formerly ALG Holdings Corporation) 32nd Floor, Parkway Corporate Center, Corporate Avenue, Filinvest City, Alabang, Muntinlupa City`}</p>
            <p>{`Majority Owner of the Company A. L. Gotianun, Inc. ("ALGI") (formerly ALG Holdings Corporation) 32nd Floor,
                Parkway Corporate Center, Corporate Avenue, Filinvest City, Alabang, Muntinlupa City`}</p>
            <p>Majority Owner of the Company</p>
          </span>,
          "Same as the Record Owner",
          "Filipino",
          <span className="flex flex-col gap-3">
            <p>7,587,823,502 (Direct)</p>
            <p>61,976,540 (Indirect)</p>
          </span>,
          "87.74% (Direct)0. 72% (Indirect)",
        ],
        [
          "Common",
          "PCD Nominee Corporation (Filipino) G/F, Philippine Stock",
          "",
          "Filipino",
          "901,940,68",
          "10.43%",
        ],
      ]}
    />
  );
}
