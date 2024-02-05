"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Modal({ children, className }: Props) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          <div
            className={`relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none ${className}`}
          >
            {children}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}

export default Modal;
