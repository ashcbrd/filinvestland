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
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-dark-cornflower-blue">
                <tr className="divide-x divide-gray-200 text-center">
                  {header.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-lg font-semibold text-white sm:pl-6"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {rows.map((row, index) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    {row.map((item, rowIndex) => {
                      if (rowIndex === 1) {
                        return (
                          <td
                            key={rowIndex}
                            className="bg-ghost-white whitespace-nowrap py-4 pl-4 pr-4 font-medium text-gray-900 sm:pl-6"
                          >
                            {item}
                          </td>
                        );
                      } else {
                        return (
                          <td
                            key={rowIndex}
                            className="whitespace-nowrap py-4 pl-4 pr-4 font-medium text-gray-900 sm:pl-6"
                          >
                            {item}
                          </td>
                        );
                      }
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
