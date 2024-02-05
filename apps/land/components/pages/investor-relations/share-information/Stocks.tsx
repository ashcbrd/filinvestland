"use client";
import React from "react";
import RedDownTriangle from "@/components/svg/RedDownTriangle";
import useStock from "./hooks/useStock";
import { round } from "@/helpers/methods";
import { getMonthStr } from "../../../../helpers/methods";
import Fade from "@/components/animation/Fade";

const Stocks = () => {
  const { currentStock, highest, lowest, loading, open, close, change } =
    useStock();

  return (
    <Fade>
      <section className="flex flex-col lg:flex-row">
        <div className="bg-dark-cornflower-blue flex-none py-10 lg:px-9 lg:py-20">
          <div className="mx-10 lg:mx-12">
            <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              Stock Information
            </h2>
            <div className="flex flex-col py-6 sm:px-12">
              <h3 className="lg:text-4xlfont-bold ml-7 text-2xl text-white md:text-3xl">
                FLI
              </h3>
              <div className="flex items-end gap-3">
                <RedDownTriangle />
                <h3 className="text-3xl font-bold text-white md:text-5xl lg:text-8xl">
                  {loading.stock ? "Loading..." : round(open)}
                </h3>
                <h4 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                  {currentStock.currency}
                </h4>
              </div>
              <h4 className="ml-12 mt-5 text-lg text-white lg:mt-12">
                {loading.stock
                  ? "Loading..."
                  : `as of ${getMonthStr(
                      currentStock.date.getMonth()
                    )} ${currentStock.date.getDate()}, ${currentStock.date.getFullYear()}`}
              </h4>
            </div>
          </div>
        </div>
        <div className="bg-oxford-blue flex-1 px-10 py-10 lg:px-16 lg:py-20">
          <div className="flex flex-col gap-2 border-b-[1px] border-solid border-white py-6 pb-2">
            <div className="flex">
              <h3 className="w-2/4 flex-none text-xl font-bold text-white lg:w-4/6">
                Open
              </h3>
              <h3 className="w-2/4 flex-none text-xl font-bold text-white lg:w-auto">
                %Change
              </h3>
            </div>
            <div className="flex">
              <h3 className="w-2/4 flex-none text-xl text-white lg:w-4/6">
                {loading.stock ? "Loading..." : `${round(open)}`}
              </h3>
              <h3 className="w-2/4 flex-none text-xl text-white lg:w-auto">
                {loading.lowest || loading.highest
                  ? "Loading..."
                  : `${round(((highest - lowest) / highest) * 100.0, 2)}`}
                %
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b-[1px] border-solid border-white py-4">
            <div className="flex">
              <h3 className="w-2/4 flex-none text-xl font-bold text-white lg:w-4/6">
                Close
              </h3>
              <h3 className="w-2/4 flex-none text-xl font-bold text-white lg:w-auto">
                52-Week High
              </h3>
            </div>
            <div className="flex">
              <h3 className="w-2/4 flex-none text-xl text-white lg:w-4/6">
                {loading.stock ? "Loading..." : round(close)}
              </h3>
              <h3 className="w-2/4 flex-none text-xl text-white lg:w-auto">
                {loading.highest ? "Loading..." : round(highest)}
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-2 py-4">
            <div className="flex">
              <h3 className="w-2/4 flex-none text-xl font-bold text-white lg:w-4/6">
                Change
              </h3>
              <h3 className="w-2/4 flex-none text-xl font-bold text-white lg:w-auto">
                52-Week Low
              </h3>
            </div>
            <div className="flex">
              <h3 className="w-2/4 flex-none text-xl text-white lg:w-4/6">
                {loading.stock ? "Loading..." : round(change)}
              </h3>
              <h3 className="w-2/4 flex-none text-xl text-white lg:w-auto">
                {loading.lowest ? "Loading..." : round(lowest)}
              </h3>
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default Stocks;
