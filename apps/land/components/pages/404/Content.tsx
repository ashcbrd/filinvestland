import NotFound404 from "@/components/svg/NotFound404";
import React from "react";

const Content = () => {
  return (
    <div className="pb-32 pt-64">
      <div className="flex justify-center">
        <NotFound404 />
      </div>
      <h1 className="text-oxford-blue mt-6 text-center text-6xl font-bold">
        Page Not Found
      </h1>
      <p className="text-dim-gray mt-6 text-center">
        The page you are looking for might be renamed, removed or might never
        exist in this website.
      </p>
    </div>
  );
};

export default Content;
