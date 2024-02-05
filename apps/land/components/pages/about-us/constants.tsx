import Breadcrumbs from "../../header/Breadcrumbs";
import Tabs from "../../header/Tabs";
import ROUTES from "@/helpers/routes";

const { ABOUT_US } = ROUTES;
const { MISSION_VISION, COMPANY_BACKGROUND, DREAMS_BUILT_GREEN, SUBSIDIARIES } =
  ABOUT_US;

const TAB_ITEMS = [
  {
    title: COMPANY_BACKGROUND.name,
    link: COMPANY_BACKGROUND.url,
  },
  {
    title: MISSION_VISION.name,
    link: MISSION_VISION.url,
  },
];

const BREADCRUMBS = [
  {
    title: ABOUT_US.name,
    link: ABOUT_US.url,
  },
];

const headerImage = "company-background-2.png";
const headerImageSmall = "company-background-2-small.png";
const customTitle = "We Build The Filipino Dream";

export const HEADER_INFO = {
  companyBackground: {
    title: customTitle,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: COMPANY_BACKGROUND.name }]}
      />
    ),
    image: headerImage,
    imageSmall: headerImageSmall,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  missionVision: {
    title: customTitle,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: MISSION_VISION.name }]} />
    ),
    image: headerImage,
    imageSmall: headerImageSmall,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  dreamsBuiltGreen: {
    title: DREAMS_BUILT_GREEN.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: DREAMS_BUILT_GREEN.name }]}
      />
    ),
    image: "dreams-built-green.png",
    imageSmall: "dreams-built-green-small.png",
  },
  subsidiaries: {
    title: SUBSIDIARIES.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: SUBSIDIARIES.name }]} />
    ),
    image: "subsidiaries.png",
    imageSmall: "subsidiaries-small.png",
  },
};
