export const ABOUT_US = {
  url: "/about-us",
  name: "About Us",
  directory: ["About Us"],
};
const COMPANY_BACKGROUND = {
  url: `${ABOUT_US.url}/company-background`,
  name: "Company Background",
  directory: [...ABOUT_US.directory, "Company Background"],
};
const MISSION_VISION = {
  url: `${ABOUT_US.url}/mission-vision`,
  name: "Vision, Mission, and Core Values",
  directory: [...ABOUT_US.directory, "Vision, Mission, and Core Values"],
};
const DREAMS_BUILT_GREEN = {
  url: `${ABOUT_US.url}/dreams-built-green`,
  name: "Dreams Built Green",
  directory: [...ABOUT_US.directory, "Dreams Built Green"],
};
const PUSONG_FILINVEST = {
  url: `/pusong-filinvest`,
  name: "#PusongFilinvest",
  directory: ["#PusongFilinvest"],
};
const SUBSIDIARIES = {
  url: `${ABOUT_US.url}/subsidiaries`,
  name: "Subsidiaries",
  directory: [...ABOUT_US.directory, "Subsidiaries"],
};

// OUR LEADERSHIP
const OUR_LEADERSHIP = {
  url: `${ABOUT_US.url}/our-leadership`,
  name: "Our Leadership",
  directory: [...ABOUT_US.directory, "Our Leadership"],
};
const BOARD_OF_DIRECTORS = {
  url: `${OUR_LEADERSHIP.url}/board-of-directors`,
  name: "Board of Directors",
  directory: [...OUR_LEADERSHIP.directory, "Board of Directors"],
};
const SENIOR_MANAGEMENT_TEAM = {
  url: `${OUR_LEADERSHIP.url}/senior-management-team`,
  name: "Senior Management Team",
  directory: [...OUR_LEADERSHIP.directory, "Senior Management Team"],
};
const COMBINED_OUR_LEADERSHIP = {
  ...OUR_LEADERSHIP,
  BOARD_OF_DIRECTORS,
  SENIOR_MANAGEMENT_TEAM,
};

// STRUCTURES
const STRUCTURES = {
  url: `${ABOUT_US.url}/structures`,
  name: "Structures",
  directory: [...ABOUT_US.directory, "Structures"],
};
const ORGANIZATIONAL_CHART = {
  url: `${STRUCTURES.url}/organizational-chart`,
  name: "Organizational Chart",
  directory: [...STRUCTURES.directory, "Organizational Chart"],
};
const CONGLOMERATE_CHART = {
  url: `${STRUCTURES.url}/conglomerate-chart`,
  name: "Conglomerate Chart",
  directory: [...STRUCTURES.directory, "Conglomerate Chart"],
};
const SHAREHOLDING_STRUCTURE = {
  url: `${STRUCTURES.url}/shareholding-structure`,
  name: "Shareholding Structure",
  directory: [...STRUCTURES.directory, "Shareholding Structure"],
};
const COMBINED_STRUCTURES = {
  ...STRUCTURES,
  ORGANIZATIONAL_CHART,
  CONGLOMERATE_CHART,
  SHAREHOLDING_STRUCTURE,
};

const ABOUT_US_ROUTES = {
  ...ABOUT_US,
  COMPANY_BACKGROUND,
  MISSION_VISION,
  DREAMS_BUILT_GREEN,
  PUSONG_FILINVEST,
  OUR_LEADERSHIP: COMBINED_OUR_LEADERSHIP,
  SUBSIDIARIES,
  STRUCTURES: COMBINED_STRUCTURES,
};
export const ABOUT_US_SUB_ROUTES = [
  COMPANY_BACKGROUND,
  MISSION_VISION,
  DREAMS_BUILT_GREEN,
  PUSONG_FILINVEST,
  SUBSIDIARIES,
  COMBINED_STRUCTURES,
  COMBINED_OUR_LEADERSHIP,
];
export default ABOUT_US_ROUTES;
