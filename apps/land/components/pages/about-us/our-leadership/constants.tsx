import ROUTES from "@/helpers/routes";
import Breadcrumbs from "@/components/header/Breadcrumbs";
import Tabs from "@/components/header/Tabs";

const { ABOUT_US } = ROUTES;
const { OUR_LEADERSHIP } = ABOUT_US;
const { BOARD_OF_DIRECTORS, SENIOR_MANAGEMENT_TEAM } = OUR_LEADERSHIP;

const TAB_ITEMS = [
  {
    title: BOARD_OF_DIRECTORS.name,
    link: BOARD_OF_DIRECTORS.url,
  },
  {
    title: SENIOR_MANAGEMENT_TEAM.name,
    link: SENIOR_MANAGEMENT_TEAM.url,
  },
];

const BREADCRUMBS = [
  {
    title: ABOUT_US.name,
    link: ABOUT_US.url,
  },
  {
    title: OUR_LEADERSHIP.name,
    link: OUR_LEADERSHIP.url,
  },
];

const headerImage = "our-leadership.png";
const customTitle = OUR_LEADERSHIP.name;

export const HEADER_INFO = {
  boardOfDirectors: {
    title: customTitle,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: BOARD_OF_DIRECTORS.name }]}
      />
    ),
    image: headerImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  seniorManagementTeam: {
    title: customTitle,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: SENIOR_MANAGEMENT_TEAM.name }]}
      />
    ),
    image: headerImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
};
