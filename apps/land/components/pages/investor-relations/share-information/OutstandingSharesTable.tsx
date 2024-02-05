import React from "react";
import Fade from "@/components/animation/Fade";
import FadeDown from "@/components/animation/FadeDown";

export default function OutstandingSharesTable({ content }: any) {
  const OutstandingSection = content?.content?.find(
    (item: any) =>
      item.blockType === "stock-information-outstanding-number-of-shares-table"
  );

  const rowData = OutstandingSection?.rowData;

  const description = OutstandingSection?.description;

  return (
    <>
      <div className="mx-6 mt-4 flex flex-col lg:mx-16">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
              <Fade>
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-dark-cornflower-blue">
                    <tr className="divide-x divide-gray-200 text-center">
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-4 font-semibold text-white sm:pl-6"
                      >
                        Outstanding number of shares
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-4 font-semibold text-white sm:pl-6"
                      >
                        2021 EPS Attributable to Parent Equity Holders
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-4 font-semibold text-white sm:pl-6"
                      >
                        Dividend declared
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {rowData.map((data: any, index: number) => (
                      <tr
                        key={index}
                        className="divide-x divide-gray-200 text-center"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 font-medium text-gray-900 sm:pl-6">
                          {data?.outstandingNumberOfShares}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-gray-900 marker:font-medium sm:pl-6">
                          {data?.epsAttributableToParentEquityHolders}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 font-medium text-gray-900 sm:pl-6">
                          {data?.dividendDeclared}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Fade>
            </div>
          </div>
        </div>
      </div>
      <FadeDown>
        <h3 className="text-dim-gray mx-6 text-center text-lg lg:mx-24">
          {description}
        </h3>
      </FadeDown>
    </>
  );
}
