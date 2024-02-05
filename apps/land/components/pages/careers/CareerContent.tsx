import React, { Dispatch } from "react";
import serializeChildren from "@/helpers/serializeChildren";

type T_RichText = {
  [k: string]: unknown;
}[];

const CareerContent = ({
  setModalOpen,
  responsibilities,
  requirements,
}: {
  setModalOpen: Dispatch<boolean>;
  responsibilities: T_RichText;
  requirements: T_RichText;
}) => {
  return (
    <div className="mx-6 mb-4">
      <h3 className="text-jet text-2xl font-bold underline">
        RESPONSIBILITIES:
      </h3>
      <div className="mx-9 mt-6">{serializeChildren(responsibilities)}</div>
      <h3 className="text-jet mt-9 text-2xl font-bold underline">
        REQUIREMENTS:
      </h3>
      <div className="mx-9 mt-6">{serializeChildren(requirements)}</div>
      <button
        className="bg-blue-ryb mt-8 rounded-full px-8 py-3 text-white"
        onClick={() => setModalOpen(true)}
      >
        Apply for this Position Now
      </button>
    </div>
  );
};

export default CareerContent;
