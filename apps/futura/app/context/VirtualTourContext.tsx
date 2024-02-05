"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface VirtualTourContextProps {
  children: ReactNode;
}

interface VirtualTourContextValue {
  virtualTour: boolean;
  startVirtualTour: () => void;
  resetVirtualTour: () => void;
}

const VirtualTourContext = createContext<VirtualTourContextValue | undefined>(
  undefined
);

export const VirtualTourProvider: React.FC<VirtualTourContextProps> = ({
  children,
}) => {
  const [virtualTour, setVirtualTour] = useState(false);

  const startVirtualTour = () => {
    setVirtualTour(true);
  };

  const resetVirtualTour = () => {
    setVirtualTour(false);
  };

  const value: VirtualTourContextValue = {
    virtualTour,
    startVirtualTour,
    resetVirtualTour,
  };

  return (
    <VirtualTourContext.Provider value={value}>
      {children}
    </VirtualTourContext.Provider>
  );
};

export const useVirtualTour = (): VirtualTourContextValue => {
  const context = useContext(VirtualTourContext);
  if (!context) {
    throw new Error("useVirtualTour must be used within a VirtualTourProvider");
  }
  return context;
};
