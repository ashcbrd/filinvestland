"use client";
import React, { Dispatch, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { T_ManatalCareerJob } from "@/types/global";
import ApplicationContent from "./ApplicationContent";

const CareersModal = ({
  setOpen,
  open,
  selectedCareer,
}: {
  setOpen: Dispatch<boolean>;
  open: boolean;
  selectedCareer: T_ManatalCareerJob;
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative !z-[52]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="mt-[120px] flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                <div className="flex items-center bg-dark-cornflower-blue p-5">
                  <Dialog.Title className="flex-1 text-2xl font-bold text-white">
                    Filinvest Dream Builders Talent Pool
                  </Dialog.Title>
                  <span
                    className="text-2xl font-normal text-white opacity-20 hover:cursor-pointer"
                    onClick={() => setOpen(false)}
                  >
                    x
                  </span>
                </div>
                <ApplicationContent
                  selectedCareer={selectedCareer}
                  withPosition
                  backButton={
                    <button
                      onClick={() => setOpen(false)}
                      className="mt-8 w-44 flex-none rounded-full bg-blue-ryb p-3 text-white"
                    >
                      Back To Careers
                    </button>
                  }
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CareersModal;
