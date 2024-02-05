import { Project } from "shared-types";
import { useState } from "react";
import { serializeRichText } from "@/helpers/serializeRichText";

const DetailsTab = ({ project }: { project: Project }) => {
  const [currentTab, setCurrentTab] = useState(1);
  const checkValue = (field: any) => {
    if (field?.length !== 1) {
      return true;
    } else if (field?.[0]?.children?.[0]?.text) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="mt-9">
      <div className="tabbed justify-items-center">
        {checkValue(project.featuresTab?.length) && (
          <input
            id="features_tab"
            className="hidden"
            type="radio"  
            name="project_tabs"
            checked={currentTab === 1}
          />
        )}
        {checkValue(project?.specificationTab?.length) && (
          <input
            id="specifications_tab"
            className="hidden"
            type="radio"
            name="project_tabs"
            checked={currentTab === 2}
          />
        )}
        {checkValue(project.locationTab?.length) && (
          <input
            id="location_tab"
            className="hidden"
            type="radio"
            name="project_tabs"
            checked={currentTab === 3}
          />
        )}
        <div className="tabs flex space-x-10 border-b md:space-x-4 lg:space-x-16">
          {checkValue(project.featuresTab) &&
            project.hasOwnProperty("featuresTab") && (
              <label
                htmlFor="features_tab"
                className="cursor-pointer border-dark-cornflower-blue py-2 text-lg font-bold text-dark-cornflower-blue md:text-sm lg:text-xl"
                onClick={() => setCurrentTab(1)}
                style={{ borderBottomWidth: currentTab === 1 ? "2px" : "0px" }}
              >
                Features
              </label>
            )}
          {checkValue(project.specificationTab) &&
            project.hasOwnProperty("specificationTab") && (
              <label
                htmlFor="specifications_tab"
                className="cursor-pointer border-dark-cornflower-blue py-2 text-lg font-bold text-dark-cornflower-blue md:text-sm lg:text-xl"
                onClick={() => setCurrentTab(2)}
                style={{ borderBottomWidth: currentTab === 2 ? "2px" : "0px" }}
              >
                Specifications
              </label>
            )}
          {checkValue(project.locationTab) &&
            project.hasOwnProperty("locationTab") && (
              <label
                htmlFor="location_tab"
                className="cursor-pointer border-dark-cornflower-blue py-2 text-lg font-bold text-dark-cornflower-blue md:text-sm lg:text-xl"
                onClick={() => setCurrentTab(3)}
                style={{ borderBottomWidth: currentTab === 3 ? "2px" : "0px" }}
              >
                Locations
              </label>
            )}
        </div>

        <div className="mt-4">
          {checkValue(project.featuresTab) && currentTab === 1 && (
            <div>{serializeRichText(project.featuresTab, true)}</div>
          )}
          {checkValue(project.specificationTab) && currentTab === 2 && (
            <div>{serializeRichText(project.specificationTab, true)}</div>
          )}
          {checkValue(project.locationTab) && currentTab === 3 && (
            <div>{serializeRichText(project.locationTab, true)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
