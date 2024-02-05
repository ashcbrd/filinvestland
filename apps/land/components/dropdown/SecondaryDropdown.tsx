"use client";
import ChevronDown from "../svg/ChevronDown";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

type T_ValuesObj = {
  text: string;
  value: number[] | string[];
};

type T_SecondaryDropdown = {
  values: T_ValuesObj[];
  defaultValue?: string;
  onValueChange: Function;
};

const SecondaryDropdown = ({
  values,
  onValueChange,
  defaultValue = "",
}: T_SecondaryDropdown) => {
  const [selected, setSelected] = useState<string>(defaultValue);
  useEffect(() => {
    onValueChange(selected);
  }, [selected, onValueChange]);
  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);
  const renderOptions = (optionsValues: any) => {
    return (
      <>
        {optionsValues?.map((value: any, index: number) => (
          <Listbox.Option
            key={index}
            className={({ active }) =>
              `cursor-pointer select-none p-4 py-2 ${
                active ? "bg-ghost-white text-jet" : "text-dim-gray"
              }`
            }
            value={value.text}
          >
            {({ selected }) => (
              <>
                <span
                  className={`block truncate ${
                    selected ? "font-medium" : "font-normal"
                  }`}
                >
                  {value.text}
                </span>
              </>
            )}
          </Listbox.Option>
        ))}
      </>
    );
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
              {renderOptions(values)}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};

export default SecondaryDropdown;
