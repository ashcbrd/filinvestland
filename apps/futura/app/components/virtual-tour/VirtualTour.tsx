"use client";

import { useVirtualTour } from "@/app/context/VirtualTourContext";
import { useVirtualTourUrl } from "@/app/context/VirtualTourUrlContext";

const VirtualTour: React.FC = () => {
  const { virtualTour, resetVirtualTour } = useVirtualTour();
  const { virtualTourUrlEmbed } = useVirtualTourUrl();
  return (
    <>
      {virtualTour && (
        <div className="fixed  z-[9999] top-0 left-0 block w-screen h-screen bg-black/50">
          <div className="relative w-full h-full">
            <button
              onClick={resetVirtualTour}
              className="cursor-pointer outline-none absolute top-5 right-5 w-12 h-12 rounded-full bg-black/50 before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-5 before:h-[3px] before:bg-white before:shadow before:rotate-45 after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:w-5 after:h-[3px] after:bg-white after:shadow after:-rotate-45"
            />
            <iframe
              frameBorder="0"
              src={
                virtualTourUrlEmbed.includes(
                  "my.matterport.com"
                )
                  ? `${virtualTourUrlEmbed}&play=1&brand=0&dh=0&mls=0&mt=1&title=0&search=0`
                  : virtualTourUrlEmbed
              }
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VirtualTour;
