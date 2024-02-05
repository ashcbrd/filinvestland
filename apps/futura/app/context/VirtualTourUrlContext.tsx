"use client";

import React, { createContext, useContext, useState } from "react";

interface VirtualTourUrlContextProps {
  virtualTourUrlEmbed: string;
  setVirtualTourUrlEmbed: React.Dispatch<React.SetStateAction<string>>;
}

const VirtualTourUrlContext = createContext<
  VirtualTourUrlContextProps | undefined
>(undefined);

export const VirtualTourUrlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [virtualTourUrlEmbed, setVirtualTourUrlEmbed] = useState<string>("");

  const value: VirtualTourUrlContextProps = {
    virtualTourUrlEmbed,
    setVirtualTourUrlEmbed,
  };

  return (
    <VirtualTourUrlContext.Provider value={value}>
      {children}
    </VirtualTourUrlContext.Provider>
  );
};

export const useVirtualTourUrl = (): VirtualTourUrlContextProps => {
  const context = useContext(VirtualTourUrlContext);
  if (!context) {
    throw new Error(
      "useVirtualTourUrl must be used within a VirtualTourUrlProvider"
    );
  }
  return context;
};
