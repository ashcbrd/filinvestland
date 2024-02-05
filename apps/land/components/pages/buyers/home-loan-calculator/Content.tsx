"use client";
import RangeSliderMark from "@/components/range-sliders/RangeSliderMark";
import Diamond from "@/components/svg/Diamond";
import Reset from "@/components/svg/Reset";
import React, { useEffect, useState } from "react";
import MainHeader from "@/components/header/MainHeader";
import {
  getContractPrice,
  getDownPayment,
  getMonthlyAmortization,
  getRate,
  getRequiredMonthlyIncome,
  toCurrency,
  toCurrencyComma,
} from "@/helpers/homeCalculator";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import BlueButton from "@/components/button/BlueButton";
import Fade from "@/components/animation/Fade";
import FadeDown from "@/components/animation/FadeDown";
import FadeRight from "@/components/animation/FadeRight";

const Content = ({ content }: any) => {
  const header = content?.content?.find(
    (item: any) => item.blockType === "header"
  );
  const breadcrumbsItems = header?.breadcrumbs.map(
    (tab: any, index: number) => {
      return {
        title: tab.link.label,
        ...(index + 1 < header?.breadcrumbs?.length && { link: tab.link.url }),
      };
    }
  );

  const breadcrumbs = <Breadcrumbs items={breadcrumbsItems} />;
  const [tcp, setTcp] = useState<number | null>(null);
  const [formattedTcp, setFormattedTcp] = useState("");
  const [reservationFee, setReservationFee] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(0);
  const [downPaymentTerm, setDownPaymentTerm] = useState(12);
  const [yearsToPay, setYearsToPay] = useState(0);
  const [contractPrice, setContractPrice] = useState({
    contractPrice: 0,
    miscFees: 0,
    bankFees: 0,
    vat: 0,
  });
  const [downPayment, setDownPayment] = useState({
    reservationFee: 0,
    downPaymentPercent: 0,
    downPayment: 0,
    netDownPayment: 0,
    monthlyDownPayment: 0,
  });
  const [rate, setRate] = useState({
    rate: 0,
    yearsToPay: 0,
  });
  const [loan, setLoan] = useState(0);
  const [monthlyAmortization, setMonthlyAmortization] = useState(0);
  const [requiredMonthlyIncome, setRequiredMonthlyIncome] = useState(0);
  const reservationFeeMarks = {
    0: <strong className="absolute -left-[19px] top-[12px]">10,000</strong>,
    50: <strong className="absolute -left-[19px] top-[12px]">20,000</strong>,
    100: <strong className="absolute -left-[19px] top-[12px]">50,000</strong>,
  };
  const downPaymentMarks = {
    0: <strong className="absolute -left-[10px] top-[12px]">10%</strong>,
    50: <strong className="absolute -left-[10px] top-[12px]">20%</strong>,
    100: <strong className="absolute -left-[10px] top-[12px]">30%</strong>,
  };
  const yearsPayMarks = {
    0: <strong className="absolute -left-[13px] top-[12px]">5 Years</strong>,
    50: <strong className="absolute -left-[13px] top-[12px]">10 Years</strong>,
    100: <strong className="absolute -left-[13px] top-[12px]">15 Years</strong>,
  };
  const downPaymentTerms = [12, 24, 36, 48, 60];
  useEffect(() => {
    setContractPrice(getContractPrice(tcp ? tcp : 0));
  }, [tcp]);

  useEffect(() => {
    if (tcp) {
      const updatedReservationFee =
        reservationFee === 0
          ? 10000
          : reservationFee === 50
          ? 20000
          : reservationFee === 100
          ? 50000
          : 10000;
      const updatedDownPaymentPercent =
        downPaymentPercent === 0
          ? 10
          : downPaymentPercent === 50
          ? 20
          : downPaymentPercent === 100
          ? 30
          : 10;
      setDownPayment(
        getDownPayment(
          contractPrice.contractPrice,
          updatedDownPaymentPercent,
          downPaymentTerm,
          updatedReservationFee
        )
      );
    }
  }, [reservationFee, downPaymentPercent, downPaymentTerm, contractPrice, tcp]);

  useEffect(() => {
    if (tcp) {
      const updatedYearsToPay =
        yearsToPay === 0
          ? 5
          : yearsToPay === 50
          ? 10
          : yearsToPay === 100
          ? 15
          : 5;
      setRate(getRate(updatedYearsToPay));
    }
  }, [yearsToPay, tcp]);

  useEffect(() => {
    if (contractPrice.contractPrice > 0 && downPayment.downPayment > 0) {
      setLoan(contractPrice.contractPrice - downPayment.downPayment);
    }
  }, [downPayment, contractPrice]);

  useEffect(() => {
    if (tcp && loan > 0 && rate.rate > 0 && rate.yearsToPay > 0) {
      setMonthlyAmortization(
        getMonthlyAmortization(loan, rate.rate, rate.yearsToPay * 12)
      );
    }
  }, [tcp, loan, rate, yearsToPay]);

  useEffect(() => {
    if (monthlyAmortization > 0) {
      setRequiredMonthlyIncome(getRequiredMonthlyIncome(monthlyAmortization));
    }
  }, [monthlyAmortization]);

  const clearFields = () => {
    setFormattedTcp("");
    setTcp(null);
    setReservationFee(0);
    setDownPaymentPercent(0);
    setDownPaymentTerm(12);
    setYearsToPay(0);
    setContractPrice({
      contractPrice: 0,
      miscFees: 0,
      bankFees: 0,
      vat: 0,
    });
    setDownPayment({
      reservationFee: 0,
      downPaymentPercent: 0,
      downPayment: 0,
      netDownPayment: 0,
      monthlyDownPayment: 0,
    });
    setRate({
      rate: 0,
      yearsToPay: 0,
    });
    setLoan(0);
    setMonthlyAmortization(0);
    setRequiredMonthlyIncome(0);
  };

  return (
    <>
      <MainHeader
        title={header.title}
        breadcrumbs={breadcrumbs}
        bgUrl={header.coverImage.url}
      />
      <section className="mx-6 mb-32 mt-20 flex flex-col gap-16 md:flex-row lg:mx-9 lg:mt-24 xl:mx-16 2xl:mx-44">
        <div className="flex-1 p-8">
          <Fade>
            <h2 className="text-4xl font-bold text-jet">
              Your New Home With The Right Loan
            </h2>
          </Fade>
          <FadeDown>
            <div className="mt-6 text-dim-gray">
              Use this calculator to calculate estimated monthly payments and
              monthly income required each month.
            </div>
          </FadeDown>
          <div className="mt-14">
            <div>
              <label
                htmlFor="totalContactPrice"
                className="block text-sm font-bold text-jet"
              >
                Total Contract Price
              </label>
              <div className="mt-2">
                <input
                  max="100000000000000"
                  type="text"
                  min="0"
                  step="any"
                  name="totalContactPrice"
                  id="totalContactPrice"
                  className="focus:ring-none block w-full border-b-[1px] border-b-jet px-2 py-4 sm:text-sm"
                  placeholder="Php"
                  value={formattedTcp ? formattedTcp : ""}
                  onChange={(e) => {
                    let { value, min, max } = e.target;

                    //convert to number first without comma
                    value = value.replace(/[$,]/g, "");

                    //set a max value
                    value = String(
                      Math.max(
                        Number(min),
                        Math.min(Number(max), Number(value))
                      )
                    );

                    setTcp(Number(value));
                    setFormattedTcp(
                      toCurrencyComma(value.replace(/[^0-9.]/g, ""))
                    );
                  }}
                />
              </div>
            </div>
            <div className="mt-8">
              <label
                htmlFor="totalContactPrice"
                className="block text-sm font-bold text-jet"
              >
                Reservation Fee
              </label>
              <div className="mx-2 mt-8">
                <RangeSliderMark
                  marks={reservationFeeMarks}
                  step={null}
                  value={reservationFee}
                  onValueChange={setReservationFee}
                />
              </div>
            </div>
            <div className="mt-14">
              <label
                htmlFor="totalContactPrice"
                className="block text-sm font-bold text-jet"
              >
                Percent Down Payment
              </label>
              <div className="mx-2 mt-8">
                <RangeSliderMark
                  marks={downPaymentMarks}
                  step={null}
                  value={downPaymentPercent}
                  onValueChange={setDownPaymentPercent}
                />
              </div>
            </div>
            <div className="mt-14">
              <label
                htmlFor="totalContactPrice"
                className="block text-sm font-bold text-jet"
              >
                Down Payment Term (Months)
              </label>
              <div className="mt-8 flex flex-wrap gap-8">
                {downPaymentTerms.map((term: number, i: number) => {
                  return (
                    <div
                      key={i}
                      onClick={() => setDownPaymentTerm(term)}
                      className={`${
                        downPaymentTerm === term
                          ? "bg-blue-ryb hover:bg-dark-cornflower-blue"
                          : "bg-gainsboro hover:bg-ghost-white"
                      } delay-50 flex-1 bg-opacity-95 px-5 py-5 transition hover:cursor-pointer`}
                    >
                      <div
                        className={`text-center text-2xl font-bold ${
                          downPaymentTerm === term
                            ? "text-white"
                            : "text-dim-gray"
                        } delay-50 bg-opacity-95 transition`}
                      >
                        {term}
                      </div>
                      <div
                        className={`text-center text-sm ${
                          downPaymentTerm === term
                            ? "text-white"
                            : "text-dim-gray"
                        } delay-50 bg-opacity-95 transition`}
                      >
                        Months
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-14">
              <label
                htmlFor="totalContactPrice"
                className="block text-sm font-bold text-jet"
              >
                Number of Years to Pay Loan
              </label>
              <div className="mx-2 mt-8">
                <RangeSliderMark
                  marks={yearsPayMarks}
                  step={null}
                  value={yearsToPay}
                  onValueChange={setYearsToPay}
                />
              </div>
            </div>
            <div className="mt-24 flex items-center gap-8">
              {/* Disabled button because the ui is auto update when input change */}
              {/* <button className="bg-blue-ryb hover:bg-dark-cornflower-blue px-16 py-5 text-sm text-white">
              Calculate
            </button> */}
              <div
                className="delay-50 flex items-center gap-4 bg-opacity-95 transition hover:cursor-pointer hover:bg-alice-blue"
                onClick={() => clearFields()}
              >
                <Reset />
                <div className="text-sm text-jet">Clear Fields</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <FadeRight>
            <div className="divide-y divide-gainsboro bg-white shadow-2xl">
              <div className="p-12">
                <h3 className="text-2xl font-bold text-jet">Payment Details</h3>
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex">
                    <div className="flex-1 font-bold text-jet">
                      Total Contract Price:
                    </div>
                    <div className="flex-none font-bold text-jet">
                      {tcp ? toCurrency(tcp) : "---"}
                    </div>
                  </div>
                  <div>
                    <div className="text-jet">Add:</div>
                    <div className="ml-4 mt-2 flex">
                      <div className="flex-1 text-jet">VAT:</div>
                      <div className="flex-none text-jet">
                        {contractPrice.vat
                          ? toCurrency(contractPrice.vat)
                          : "---"}
                      </div>
                    </div>
                    <div className="ml-4 mt-2 flex">
                      <div className="flex-1 text-jet">Miscellaneous Fees:</div>
                      <div className="flex-none text-jet">
                        {contractPrice.miscFees
                          ? toCurrency(contractPrice.miscFees)
                          : "---"}
                      </div>
                    </div>
                    <div className="ml-4 mt-2 flex">
                      <div className="flex-1 text-jet">Bank Fees:</div>
                      <div className="flex-none text-jet">
                        {contractPrice.bankFees
                          ? toCurrency(contractPrice.bankFees)
                          : "---"}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 font-bold text-jet">
                      Gross Total Contract Price:
                    </div>
                    <div className="flex-none font-bold text-jet">
                      {contractPrice.contractPrice
                        ? toCurrency(contractPrice.contractPrice)
                        : "---"}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 font-bold text-jet">
                      Down Payment:
                    </div>
                    <div className="flex-none font-bold text-jet">
                      {downPayment.downPayment
                        ? toCurrency(downPayment.downPayment)
                        : "---"}
                    </div>
                  </div>
                  <div>
                    <div className="text-jet">Less:</div>
                    <div className="ml-4 mt-2 flex">
                      <div className="flex-1 text-jet">Reservation Fee:</div>
                      <div className="flex-none text-jet">
                        {downPayment.reservationFee
                          ? toCurrency(downPayment.reservationFee)
                          : "---"}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 font-bold text-jet">
                      Net Down Payment:
                    </div>
                    <div className="flex-none font-bold text-jet">
                      {downPayment.netDownPayment
                        ? toCurrency(downPayment.netDownPayment)
                        : "---"}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 font-bold text-jet">
                      Monthly Down Payment:
                    </div>
                    <div className="flex-none font-bold text-jet">
                      {downPayment.monthlyDownPayment
                        ? toCurrency(downPayment.monthlyDownPayment)
                        : "---"}
                    </div>
                  </div>
                  <div>
                    <div className="flex">
                      <div className="flex-1 font-bold text-jet">Loan:</div>
                      <div className="flex-none font-bold text-jet">
                        {loan > 0 ? toCurrency(loan) : "---"}
                      </div>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex-1 text-jet">Rate:</div>
                      <div className="flex-none text-jet">
                        {rate.rate > 0
                          ? `${(rate.rate * 12 * 100).toFixed(3)}%`
                          : "---"}
                      </div>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex-1 text-jet">Period (Months):</div>
                      <div className="flex-none text-jet">
                        {rate.yearsToPay > 0 ? rate.yearsToPay * 12 : "---"}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 font-bold text-jet">
                      Monthly Amortization:
                    </div>
                    <div className="flex-none font-bold text-jet">
                      {monthlyAmortization > 0
                        ? toCurrency(monthlyAmortization)
                        : "---"}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 font-bold text-jet">
                      Required Monthly Income:
                    </div>
                    <div className="flex-none font-bold text-jet">
                      {requiredMonthlyIncome > 0
                        ? toCurrency(requiredMonthlyIncome)
                        : "---"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-12">
                <div className="text-jet">Disclaimer</div>
                <div className="mt-6 flex gap-3">
                  <div className="mt-1 flex-1">
                    <Diamond />
                  </div>
                  <div className="text-dim-gray">
                    Terms and prices are subject to change without prior notice.
                    Filinvest Land Inc. reserves the right to make any
                    correction in case of typographical errors.
                  </div>
                </div>
                <div className="mt-3 flex gap-3">
                  <div className="mt-1 flex-1">
                    <Diamond />
                  </div>
                  <div className="text-dim-gray">
                    Sample computation is for initial reference only. Final
                    computation is system generated and shall be provided by
                    Filinvest Land, Inc.
                  </div>
                </div>
                <div className="mt-3 flex gap-3">
                  <div className="mt-1 flex-1">
                    <Diamond />
                  </div>
                  <div className="text-dim-gray">
                    Total Contract Price (TCP) is inclusive of VAT (if
                    applicable), title transfer, and miscellaneous fees
                  </div>
                </div>
                <div className="mt-3 flex gap-3">
                  <div className="mt-1 flex-1">
                    <Diamond />
                  </div>
                  <div className="text-dim-gray">
                    For bank financing payment term, the stated bank interest
                    rate are indicative only. The final loan interest rate shall
                    be determined by the bank at the time of loan arrangements
                    and approval.
                  </div>
                </div>
              </div>
              {String(tcp)?.length > 0 && tcp != 0 && tcp != null && (
                <BlueButton text={`Contact Us`} />
              )}
            </div>
          </FadeRight>
        </div>
      </section>
    </>
  );
};

export default Content;
