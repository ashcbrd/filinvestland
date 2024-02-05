import Fade from "@/components/animation/Fade";
import FadeDown from "@/components/animation/FadeDown";
import Image from "next/image";

const Dividends = ({
  dividendsContent,
  totalDividendsRow,
  payoutRateRow,
}: {
  dividendsContent: any;
  totalDividendsRow: any;
  payoutRateRow: any;
}) => {
  return (
    <>
      <section className="mx-3 mb-28 mt-16 flex flex-col gap-9 px-6 lg:mx-9 xl:mx-16 2xl:mx-44">
        <div>
          <FadeDown>
            <p className="text-dark-cornflower-blue m-0 text-center font-bold">
              {dividendsContent.title}
            </p>
          </FadeDown>

          <Fade>
            <h2 className="text-jet text-center text-4xl font-bold">
              {dividendsContent.mainTitle}
            </h2>
          </Fade>
        </div>
        <FadeDown>
          <h3 className="text-dim-gray text-center text-xl">
            {dividendsContent.description}
          </h3>
        </FadeDown>
        <Fade>
          <div className="mx-0 lg:mx-32">
            <Image
              src={dividendsContent.file.url}
              width={2998}
              height={1822}
              alt={dividendsContent.file.alt}
            />
          </div>
        </Fade>
        <Fade>
          <div className="mt-4 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-dark-cornflower-blue">
                      <tr className="divide-x divide-gray-200">
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-4 text-left text-lg font-semibold text-white sm:pl-6"
                        >
                          {totalDividendsRow.totalDividendsRowTitle}
                        </th>
                        {totalDividendsRow.totalDividends.map(
                          ({ totalDividend, id }: any) => (
                            <th
                              key={id}
                              scope="col"
                              className="py-3.5 pl-4 pr-4 text-left text-lg font-semibold text-white sm:pl-6"
                            >
                              {totalDividend}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="divide-x divide-gray-200">
                        <td className="bg-alice-blue whitespace-nowrap py-4 pl-4 pr-4 text-lg font-semibold text-gray-900 sm:pl-6">
                          {payoutRateRow.payoutRateRowTitle}
                        </td>
                        {payoutRateRow.payoutRates.map(
                          ({ payoutRate, id }: any) => {
                            return (
                              <td
                                key={id}
                                className="whitespace-nowrap py-4 pl-4
                            pr-4 text-2xl font-semibold text-gray-900 last:text-3xl last:font-bold sm:pl-6"
                              >
                                {payoutRate}
                              </td>
                            );
                          }
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    </>
  );
};

export default Dividends;
