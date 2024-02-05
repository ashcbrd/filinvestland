import Breadcrumbs from "@/components/header/Breadcrumbs";
import Tabs from "@/components/header/Tabs";
import ROUTES from "@/helpers/routes";

const { ABOUT_US } = ROUTES;
const { STRUCTURES } = ABOUT_US;
const { ORGANIZATIONAL_CHART, CONGLOMERATE_CHART, SHAREHOLDING_STRUCTURE } =
  STRUCTURES;

const TAB_ITEMS = [
  {
    title: ORGANIZATIONAL_CHART.name,
    link: ORGANIZATIONAL_CHART.url,
  },
  {
    title: CONGLOMERATE_CHART.name,
    link: CONGLOMERATE_CHART.url,
  },
  {
    title: SHAREHOLDING_STRUCTURE.name,
    link: SHAREHOLDING_STRUCTURE.url,
  },
];

const BREADCRUMBS = [
  {
    title: ABOUT_US.name,
    link: ABOUT_US.url,
  },
  {
    title: STRUCTURES.name,
    link: STRUCTURES.url,
  },
];

const headerImage = "structures.png";
const headerImageSmall = "structures-small.png";

export const HEADER_INFO = {
  organizationalChart: {
    title: STRUCTURES.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: ORGANIZATIONAL_CHART.name }]}
      />
    ),
    imageSmall: headerImageSmall,
    image: headerImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  conglomerateChart: {
    title: STRUCTURES.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: CONGLOMERATE_CHART.name }]}
      />
    ),
    imageSmall: headerImageSmall,
    image: headerImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
  shareholdingStructure: {
    title: STRUCTURES.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: SHAREHOLDING_STRUCTURE.name }]}
      />
    ),
    imageSmall: headerImageSmall,
    image: headerImage,
    tabs: <Tabs items={TAB_ITEMS} />,
  },
};
