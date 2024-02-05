"use client";
import PageNextPrevButton from "@/components/button/PageNextPrevButton";
import React from "react";
import Fade from "@/components/animation/Fade";

const EnterpriseRiskManagementTable = ({ content }: any) => {
  const data = content?.content?.find(
    (item: any) => item.blockType === "enterprise-risk-management-table"
  );
  const flatRiskData = data.riskManagementTable.map((item: any) => {
    return {
      riskExposure: item.riskExposure,
      riskManagementPolicy: item.riskManagementPolicy,
      objective: item.riskObjective,
    };
  });

  return (
    <section className="mx-6 mb-28 mt-16 flex flex-col gap-9 lg:mx-9 xl:mx-16 2xl:mx-44">
      <div className="flex flex-col">
        {/* <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
        <Fade>
          <div className="-my-2 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="ring-jet overflow-hidden shadow ring-1">
                <table className="divide-jet min-w-full divide-y">
                  <thead className="bg-dark-cornflower-blue">
                    <tr className="divide-x divide-gray-200 text-center">
                      <th
                        scope="col"
                        className="xs:text-sm py-3.5 pl-4 pr-4 text-xs font-semibold text-white sm:pl-6 md:text-lg"
                      >
                        Risk Exposure
                      </th>
                      <th
                        scope="col"
                        className="xs:text-sm px-4 py-3.5 text-xs font-semibold text-white md:text-lg"
                      >
                        Risk Management Policy
                      </th>
                      <th
                        scope="col"
                        className="xs:text-sm px-4 py-3.5 text-xs font-semibold text-white md:text-lg"
                      >
                        Objectives
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-jet divide-y bg-white">
                    {flatRiskData.map((item: any, index: any) => (
                      <tr key={index} className="divide-jet divide-x">
                        {/* className="xs:text-sm py-4 pl-4 pr-4 text-xs font-bold text-gray-900 sm:pl-6 md:text-lg" */}
                        <td className="xs:text-sm flex items-start  justify-center py-4  pl-4 pr-4 text-xs font-bold text-gray-900 sm:pl-6 md:text-lg">
                          {item.riskExposure}
                        </td>
                        <td className="xs:text-sm p-4 text-xs text-gray-500 md:text-lg">
                          {item.riskManagementPolicy}
                        </td>
                        <td className="xs:text-sm p-4 text-xs text-gray-500 md:text-lg">
                          {item.objective}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Fade>
      </div>
      <div className="mt-32 flex w-full">
        <PageNextPrevButton content={content} />
      </div>
    </section>
  );
};

export default EnterpriseRiskManagementTable;
