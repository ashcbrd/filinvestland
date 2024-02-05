import React, { Dispatch, Fragment } from "react";
import { Transition, Popover } from "@headlessui/react";
import { combineClass } from "@/helpers/combineClass";
import ChevronDown from "../svg/ChevronDown";
import Funnel from "../svg/Funnel";

const SelectOrder = ({
  list,
  value,
  handleChange,
}: {
  list: string[];
  value: string;
  handleChange: Dispatch<string>;
}) => {
  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Popover.Button
            className={combineClass("group inline-flex hover:underline")}
          >
            <div className="flex w-52 items-center bg-white px-2 py-3 shadow-xl">
              <Funnel color="#030303" className="mx-2 flex-none" />
              <p className="flex-1 pl-4 text-left">{value}</p>
              <div className="flex flex-none flex-col gap-1 p-4">
                <ChevronDown color="#303030" />
              </div>
            </div>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 mt-3">
              <div className="max-h-60 w-52 overflow-auto shadow-lg">
                <div className="gap-6 bg-white sm:gap-8">
                  {list?.map((order, index) => (
                    <span
                      onClick={() => {
                        handleChange(order);
                        close();
                      }}
                      className={`flex items-start border-b border-gray-200 transition duration-150 ease-in-out hover:cursor-pointer hover:bg-ghost-white ${
                        value === order && "bg-ghost-white"
                      }`}
                      key={index}
                    >
                      <div className="w-full px-5 py-4">
                        <p className="text-md whitespace-nowrap text-left font-medium text-jet">
                          {order}
                        </p>
                      </div>
                    </span>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default SelectOrder;
