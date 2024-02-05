import React from 'react';
import Subtitle from '../typography/subtitle';

interface Props {
  title: string;
  children?: React.ReactNode;
}

function Content(props: Props) {
  const { title, children } = props;

  return (
    <div className="w-full bg-base-100 mt-6 flex flex-col items-center">
      <Subtitle styleClass="font-cormorant font-extralight text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
        {title}
      </Subtitle>
      <div className="max-w-full sm:max-w-screen-md pb-4 sm:pb-6 px-4 sm:px-6 md:px-8 w-full">
        {children}
      </div>
    </div>
  );
}

export default Content;
