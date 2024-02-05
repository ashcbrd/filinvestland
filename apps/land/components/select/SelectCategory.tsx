import React, { Fragment, useEffect, useState } from "react";
import { Transition, Popover } from "@headlessui/react";
import { combineClass } from "@/helpers/combineClass";
import ChevronDown from "../svg/ChevronDown";

/* type T_ValuesObj = {
  [k: string]: string[];
}; */

type T_MainDropdown = {
  values: string[];
  defaultValue?: string;
  onValueChange: Function;
  navigate: any;
  paramValue?: string;
  setPageNumber?: Function;
  categories?: any;
};

const SelectCategory = ({
  values,
  onValueChange,
  defaultValue = "",
  navigate,
  paramValue,
  setPageNumber,
  categories,
}: T_MainDropdown) => {
  const [selected, setSelected] = useState<string>(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Popover.Button
            className={combineClass("group inline-flex hover:underline")}
          >
            <div className="flex w-52 items-center divide-x divide-gainsboro bg-white shadow-xl">
              <div className="flex-1 truncate px-6 py-3 font-bold">
                {!values?.includes(defaultValue as string)
                  ? "Category - All"
                  : defaultValue}
              </div>
              <div className="flex flex-none flex-col gap-1 p-4">
                <ChevronDown color="#303030" classes="rotate-180" />
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
              <div className="w-52 overflow-hidden shadow-lg">
                <div className="gap-6 bg-white sm:gap-8">
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      setPageNumber && setPageNumber(1);
                      navigate.push(`/news`);
                      onValueChange("");
                      close();
                    }}
                    className="flex items-start transition duration-150 ease-in-out hover:cursor-pointer hover:bg-ghost-white"
                  >
                    <div className="w-full px-5 py-4">
                      <p className="text-md whitespace-nowrap text-left font-medium text-jet">
                        All
                      </p>
                    </div>
                  </span>
                  {values?.map((val: any, index: number) => (
                    <span
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        onValueChange(val);
                        const awardsEntry = categories?.find(
                          (entry: any) => entry.title === val
                        );
                        navigate.push(
                          `/${
                            awardsEntry ? awardsEntry?.slug : val.toLowerCase()
                          }`
                        );
                        setPageNumber && setPageNumber(1);
                        close();

                      }}
                      className="flex items-start transition duration-150 ease-in-out hover:cursor-pointer hover:bg-ghost-white"
                    >
                      <div className="w-full px-5 py-4">
                        <p className="text-md whitespace-nowrap text-left font-medium text-jet">
                          {val == "" ? "Category - All" : val}
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

export default SelectCategory;
