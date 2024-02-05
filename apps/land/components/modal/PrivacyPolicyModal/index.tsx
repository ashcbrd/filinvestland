"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PrivacyPolicyModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const path = usePathname();

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = () => {
    // Handle the submission of the form (e.g., set a local storage flag)
    // You can store a flag in local storage to remember that the user has accepted the policy.
    localStorage.setItem("privacyPolicyAccepted", "true");
    onClose();
  };

  useEffect(() => {
    // Check if the user has accepted the policy before
    const hasAccepted = localStorage.getItem("privacyPolicyAccepted");
    if (hasAccepted) {
      setIsOpen(false);
    }
  }, []);

  return (
    <div>
      {path !== "/privacy" && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-[999] overflow-y-auto"
            onClose={onClose}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-bottom"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                style={{
                  background: "rgb(1 43 114)",
                  opacity: "95%",
                  textAlign: "center",
                }}
                className="border-1 absolute bottom-0 left-[5%] my-8 inline-block w-full max-w-[90%] transform overflow-hidden bg-white p-4 px-8 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                  style={{ color: "white" }}
                >
                  Cookie Policy
                </Dialog.Title>
                <div style={{ color: "white" }} className="mt-2">
                  {/* Add your policy content here */}
                  <p>
                    Filinvest.com uses cookies to ensure that you get the best
                    user experience. By continuing to browse our site, you are
                    agreeing to our use of cookies. For further info, please
                    read our{" "}
                    <Link
                      style={{
                        borderColor: "none",
                        textDecoration: "underline",
                        color: "white",
                        outline: "none",
                      }}
                      href="/privacy"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    onClick={onSubmit}
                    className=" bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500 inline-flex justify-center  rounded-md border border-solid border-white px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    I AGREE
                  </button>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition>
      )}
    </div>
  );
};

export default PrivacyPolicyModal;
