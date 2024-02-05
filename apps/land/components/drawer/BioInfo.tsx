"use client";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Facebook from "../svg/Facebook";
import Twitter from "../svg/Twitter";
import LinkedIn from "../svg/LinkedIn";
import localFont from "next/font/local";

const futuraHeavy = localFont({
  src: "../../assets/fonts/Futura/Futura Heavy font.ttf",
});

export default function BioInfo({
  sidebarOpen = false,
  setSidebarOpen,
  information,
}: any) {
  let refDiv = useRef(null);
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40"
            onClose={setSidebarOpen}
            initialFocus={refDiv}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            {/* className="fixed bottom-0 left-0 right-0 top-32 z-40 flex md:left-44 md:top-80 lg:left-96"*/}
            {/* className="fixed bottom-[120px] left-44 right-[10rem] top-32 z-40 flex */}
            <div className="fixed bottom-0 left-0 right-0 top-[1rem] z-40 flex md:bottom-[120px] md:left-44 md:right-[10rem] md:top-32 lg:left-44">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="relative mb-[0.8rem] flex w-full flex-1 flex-col bg-white">
                  <div className="flex justify-end px-8 pt-6 lg:px-16">
                    <p
                      className="text-dark-cornflower-blue p-3 text-3xl hover:cursor-pointer focus:cursor-pointer"
                      onClick={() => setSidebarOpen(false)}
                    >
                      x
                    </p>
                  </div>
                  <div className="flex h-0 flex-1 flex-col gap-12 overflow-y-auto px-16 pb-16 pt-6 lg:flex-row">
                    <div className="mt-[5px] flex flex-col gap-3">
                      <Image
                        src={`${information?.directorImage?.url}`}
                        width={323}
                        height={355}
                        alt="Picture of the author"
                      />
                      <div>
                        <h3
                          className={`text-dark-cornflower-blue text-xl font-black ${futuraHeavy.className}`}
                        >
                          {information.directorFullName}
                        </h3>
                        <p className="text-dim-gray">
                          {information.directorTitle}
                        </p>
                      </div>
                      <div>
                        <p className="text-dim-gray italic">
                          {information.email}
                        </p>
                        <p className="text-dim-gray italic">
                          {information.phoneNumber}
                        </p>
                      </div>
                      <div className="mt-4 flex gap-4">
                        {information.facebookLink ? (
                          <a
                            href={`${information.facebookLink}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Facebook color="#303030" />
                          </a>
                        ) : null}
                        {information.twitterLink ? (
                          <a
                            href={`${information.twitterLink}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Twitter color="#303030" />
                          </a>
                        ) : null}
                        {information.linkedInLink ? (
                          <a
                            href={`${information.linkedInLink}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <LinkedIn color="#303030" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col gap-6">
                      <p className="text-dark-cornflower-blue text-xl font-bold">
                        Bio
                      </p>
                      <div
                        className="text-dim-gray"
                        dangerouslySetInnerHTML={{ __html: information?.bio }}
                      ></div>
                      <p className="text-dark-cornflower-blue text-xl font-bold">
                        Company Info
                      </p>
                      <p className="text-dim-gray pb-12">
                        {information.companyInformation}
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
}
