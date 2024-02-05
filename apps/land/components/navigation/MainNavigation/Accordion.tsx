import React, { ReactNode } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import ChevronDown from "@/components/svg/ChevronDown";

const Accordion = ({
  title,
  children,
  index,
  accordionRefs,
}: {
  title: string;
  children: ReactNode;
  index: number;
  accordionRefs?: React.RefObject<HTMLButtonElement>[];
}) => {
  function handleClosingOthers() {
    const otherRefs = accordionRefs?.filter((ref) => {
      return ref.current?.getAttribute("data-index") !== String(index);
    });

    otherRefs?.forEach((ref) => {
      const isOpen = ref.current?.getAttribute("data-open") === "true";

      if (isOpen) {
        ref.current?.click();
      }
    });
  }

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            onClick={() => handleClosingOthers()}
            ref={accordionRefs?.[index]}
            data-index={index}
            data-open={open}
            className={`hover:bg-oxford-blue flex w-full items-center justify-between px-4 py-4 text-left text-lg font-medium text-white focus:outline-none ${
              open ? "bg-oxford-blue" : ""
            }`}
          >
            <span>{title}</span>
            {open ? (
              <ChevronDown classes="w-[10px] h-[10px] rotate-180 transition-transform" />
            ) : (
              <ChevronDown classes="w-[10px] h-[10px] transition-transform" />
            )}
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="px-4 pb-4 text-sm text-white">
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Accordion;
