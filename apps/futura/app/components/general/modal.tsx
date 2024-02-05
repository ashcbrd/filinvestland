"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

function Modal(props: Props) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999] outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl mt-[280px]">
          <div className="border-0 rounded-lg shadow-lg relative flex fleex-col w-full bg-white outline-none focus:outline-none">
            {props.children}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default Modal;
