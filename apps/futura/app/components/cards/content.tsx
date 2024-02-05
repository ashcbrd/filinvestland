import React from "react";
import Subtitle from "../typography/subtitle";

interface Props {
  title: string;
  children: React.ReactNode;
}

function Content(props: Props) {
  const { title, children } = props;

  return (
    <div className="w-full bg-base-100 mt-6 flex flex-col items-center">
      <Subtitle styleClass="font-quicksand text-[24px] md:text-[35px]  mb-6">
        <p className="font-bold font-quicksand leading-10 text-center md:text-start">
          {title}
        </p>
      </Subtitle>
      <div className="max-w-screen-lg pb-6 md:w-[800px] relative text-center px-4 md:px-0">
        {children}
      </div>
    </div>
  );
}

export default Content;
