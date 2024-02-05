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
      <div className="">
        <div className="inline-block min-w-full align-middle">
          <div className="ring-jet shadow ring-1">
            <table className="divide-jet min-w-full divide-y lg:min-w-full">
              <thead className="bg-dark-cornflower-blue">
                <tr className="divide-x divide-white text-center">
                  {header.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="py-3.5 pl-2 pr-2 text-left text-lg font-bold text-white sm:pl-4"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-jet divide-y bg-white text-sm sm:text-base">
                {rows.map((row, index) => (
                  <tr key={index} className="divide-jet divide-x">
                    {row.map((item, rowIndex) => {
                      return (
                        <td
                          key={rowIndex}
                          className="px-2 py-4 font-medium text-black sm:pl-6 lg:pl-4 lg:pr-4"
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
