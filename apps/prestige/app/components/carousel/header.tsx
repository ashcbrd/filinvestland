import React from 'react';

interface Props {
  imageUrl: string;
  title?: string;
  description?: string;
  headerline?: boolean;
}

const Header = ({ imageUrl, title, description }: Props) => {
  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt="Banner"
        className="w-full h-full  object-cover opacity-[0.7px]"
      />
      {title && (
        <div className="absolute top-[-15rem] left-0 w-full h-full flex flex-col items-center justify-center">
          <div className="w-[900px] text-center">
            <h1 className="text-[40px] md:text-6xl font-marcellus text-white font-normal">
              {title}
            </h1>
            {description && (
              <p className="text-[25px] font-normal  text-white mt-7">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
