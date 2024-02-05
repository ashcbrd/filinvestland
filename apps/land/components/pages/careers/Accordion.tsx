"use client";
import ChevronDown from "@/components/svg/ChevronDown";
import React, { Dispatch, ReactNode, useState } from "react";

const Accordion = ({
  title,
  children,
  setCareer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  setCareer: Dispatch<string>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className="bg-cultured border-dark-cornflower-blue flex items-center border-l-4 px-6 py-5 hover:cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
          setCareer(title);
        }}
      >
        <div className="flex-1">
          <h3 className="text-dark-cornflower-blue text-xl font-bold">
            {title}
          </h3>
        </div>
        <div className={isOpen ? "rotate-180" : ""}>
          <ChevronDown color="#163E82" />
        </div>
      </div>
      {isOpen && <>{children}</>}
    </>
  );
};

export default Accordion;
