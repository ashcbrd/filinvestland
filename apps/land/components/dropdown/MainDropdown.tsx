"use client";
import ChevronDown from "../svg/ChevronDown";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

type T_ValuesObj = {
  [k: string]: string[];
};

type T_MainDropdown = {
  values: T_ValuesObj | string[];
  defaultValue?: string;
  onValueChange: Function;
  noneEnabled?: boolean;
  refetch?: Function;
  action?: Function;
  disclosureData?: Record<string, any>[];
};

const MainDropdown = ({
  values,
  onValueChange,
  defaultValue = "",
  noneEnabled,
  action,
  disclosureData,
}: T_MainDropdown) => {
  const [selected, setSelected] = useState<string>(defaultValue);
  useEffect(() => {
    if (disclosureData) {
      const matched = disclosureData!.find((d) => d.slug === selected);
      onValueChange(selected === "All" ? "All" : matched?.title);
      action && action(selected);
    } else {
      onValueChange(selected);
      action && action(selected);
    }
  }, [selected, onValueChange]);
  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    } else setSelected("");
  }, [defaultValue]);

  useEffect(() => {
    if (!values) return setSelected("");
  }, [values]);

  const renderOptions = (optionsValues: any) => {
    if (!Array.isArray(optionsValues)) {
      let options: ReactNode[] = [];
      Object.keys(optionsValues).forEach((k: string, i) => {
        options.push(
          <div key={i}>
            <Listbox.Option
              value={k}
              disabled
              className="cursor-default p-4 py-2"
            >
              <span className="text-md font-bold text-jet">{k}</span>
            </Listbox.Option>
            <hr />
            {optionsValues[k].map((value: any, index: number) => (
              <Listbox.Option
                key={index}
                className={({ active }: any) =>
                  `cursor-pointer select-none p-4 py-2 ${
                    active ? "bg-ghost-white text-jet" : "text-dim-gray"
                  }`
                }
                value={value}
              >
                {({ selected }: any) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {value}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
            {Object.keys(optionsValues).length !== i + 1 && <hr />}
          </div>
        );
      });
      return options;
    } else if (disclosureData?.length) {
      return (
        <>
          {optionsValues.map((value: any, index: number) => {
            const slugData = disclosureData!.find(
              (d) => d.slug === value
            )?.title;

            return (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `cursor-pointer select-none p-4 py-2 ${
                    active ? "bg-ghost-white text-jet" : "text-dim-gray"
                  }`
                }
                value={value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {slugData}
                    </span>
                  </>
                )}
              </Listbox.Option>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {optionsValues.map((value: any, index: number) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                `cursor-pointer select-none p-4 py-2 ${
                  active ? "bg-ghost-white text-jet" : "text-dim-gray"
                }`
              }
              value={value}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {value}
                  </span>
                </>
              )}
            </Listbox.Option>
          ))}
        </>
      );
    }
  };
  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button
            className={`ring-none flex w-full items-center gap-3 border-b-[1px] border-b-white ${
              selected ? "border-opacity-100" : "border-opacity-50"
            } bg-transparent py-2 text-white`}
          >
            <span
              className={`block truncate text-white ${
                !selected && "text-opacity-50"
              }`}
            >
              {selected ? selected : "Select"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown classes="w-[8px] h-[8px]" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-40 mt-1 max-h-96 w-full overflow-auto bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {noneEnabled && (
                <Listbox.Option
                  key="default"
                  className={({ active }) =>
                    `cursor-pointer select-none p-4 py-2 ${
                      active ? "bg-ghost-white text-jet" : "text-dim-gray"
                    }`
                  }
                  value=""
                  onClick={() => setSelected("")}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        --None--
                      </span>
                    </>
                  )}
                </Listbox.Option>
              )}
              {renderOptions(values || [])}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};

export default MainDropdown;
