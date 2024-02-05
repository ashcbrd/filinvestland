'use client';

import React from 'react';

const circleIcon = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="89"
      height="12"
      viewBox="0 0 89 12"
      fill="none"
    >
      <circle cx="25.1666" cy="5.92993" r="5.72876" fill="white" />
    </svg>
  </>
);

const Projects = (props: any) => {
  const { data } = props;
  const length = data.FeaturedProjects.length;
  const [current, setCurrent] = React.useState(0);
  const autoSlideInterval = 8000;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  React.useEffect(() => {
    const autoSlideTimer = setTimeout(nextSlide, autoSlideInterval);
    return () => {
      clearTimeout(autoSlideTimer);
    };
  }, [current]);

  return (
    <div className="relative">
      {data &&
        data.FeaturedProjects.map((x: any, index: any) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={x.Project.headerImage.url}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-[-80px] left-0 sm:left-[-120px] w-full sm:w-[900px] h-[400px] sm:h-[800px] flex items-center justify-center font-cormorant">
              <div>
                <h1 className="text-3xl sm:text-5xl text-black leading-normal  min-[375px]:text-[30px] min-[375px]:text-center">
                  {x.title}
                </h1>
              </div>
              <p className="text-lg sm:text-2xl text-black mt-4 leading-7 w-full sm:w-[75%] min-[375px]:text-[16px] min-[375px]:text-center">
                {x.description}
              </p>
            </div>
          </div>
        ))}
      <div className="absolute bottom-[-60px] sm:bottom-[80px] left-0 sm:left-[100px] flex items-center ">
        {/* Previous Button */}
        {length > 1 && (
          <button
            onClick={prevSlide}
            className="text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          >
            {circleIcon}
          </button>
        )}

        {/* Next Button */}
        {length > 1 && (
          <button
            onClick={nextSlide}
            className="text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          >
            {circleIcon}
          </button>
        )}

        {/* Third Button (assuming you want a total of 3 buttons) */}
        {length > 2 && (
          <button
            onClick={() => setCurrent(2)} // Assuming this button goes to the third slide
            className="text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          >
            {circleIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Projects;
