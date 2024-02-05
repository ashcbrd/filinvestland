import React, { ReactNode } from "react";

const Table = ({
  header,
  rows,
}: {
  header: (string | ReactNode)[];
  rows: (string[] | ReactNode[])[];
}) => {
  return (
    <div className="mt-4 flex flex-col">
      <div className="-my-2 overflow-x-auto lg:-mx-8">
        <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
            <table className="min-w-full border-b-[1px] border-gray-200">
              <thead className="bg-dark-cornflower-blue">
                <tr className="divide-x divide-gray-200 text-center">
                  {header.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left font-semibold text-white sm:pl-6"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {rows?.map((row, index) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    {row.map((item, rowIndex) => {
                      return (
                        <td
                          key={rowIndex}
                          className="py-4 pl-4 pr-4 font-medium text-gray-900 sm:pl-6"
                        >
                          {item}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
