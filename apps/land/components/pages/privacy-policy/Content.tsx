import Link from "next/link";
import React from "react";
import MainHeader from "@/components/header/MainHeader";
import { serializeRichText } from "@/helpers/serializeRichText";

const Content = ({ content }: any) => {
  const header = content?.content?.find(
    (item: any) => item.blockType === "header"
  );
  const richText = content?.content?.find(
    (item: any) => item.blockType === "privacy-policy-text"
  );
  const tableHeaderRow = richText
    ? richText.tableRowData.find((row: any) => row.isTitleRow === "yes")
    : null;
  const tableRows = richText
    ? richText.tableRowData
        .map((row: any) => {
          return row.isTitleRow === "no" ? row : null;
        })
        .filter((item: any) => item)
    : null;
  return (
    <>
      <MainHeader title={header.title} bgUrl={header.coverImage.url} />
      <section className="mx-3 mb-28 mt-16 flex flex-col gap-6 px-6 lg:mx-9 xl:mx-16 2xl:mx-44">
        {serializeRichText(richText.privacyPolicy)}
        {serializeRichText(richText.tableTop)}
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-dark-cornflower-blue">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-white sm:pl-6"
                      >
                        {tableHeaderRow.businessUnits}
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        {tableHeaderRow.emailAddress}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {tableRows.map((contact: any, index: number) => (
                      <tr key={index} className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {contact.businessUnits}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          <Link
                            href={`mailto:${contact.emailAddress}`}
                            className="hover:underline"
                          >
                            {contact.emailAddress}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {serializeRichText(richText.tableBottom)}
      </section>
    </>
  );
};

export default Content;
