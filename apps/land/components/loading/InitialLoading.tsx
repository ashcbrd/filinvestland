"use client";
import React from "react";

const InitialLoading = () => {
  return (
    <div className="p-96">
      <div className="flex w-full items-center justify-center bg-transparent">
        <div className="flex w-full items-center justify-center bg-transparent">
          <div className="from-dark-cornflower-blue to-blue-ryb flex h-12 w-12 animate-spin items-center justify-center rounded-full bg-gradient-to-tr">
            <div className="h-9 w-9 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialLoading;
