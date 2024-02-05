import Breadcrumbs from "@/components/header/Breadcrumbs";
import ROUTES from "@/helpers/routes";

const { OUR_BUSINESSES } = ROUTES;
const {
  RESIDENTIAL,
  CORPORATE_CENTERS,
  MALLS,
  TOWNSCAPES,
  MIXEDUSE_ESTATES,
  INDUSTRIAL,
  COLIVING,
} = OUR_BUSINESSES;

const BREADCRUMBS = [
  {
    title: OUR_BUSINESSES.name,
    link: OUR_BUSINESSES.url,
  },
];

const headerImage = "office-parks.png";

export const HEADER_INFO = {
  residential: {
    title: RESIDENTIAL.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: RESIDENTIAL.name }]} />
    ),
    image: headerImage,
  },
  corporateCenters: {
    title: CORPORATE_CENTERS.name,
    breadcrumbs: (
      <Breadcrumbs
        items={[...BREADCRUMBS, { title: CORPORATE_CENTERS.name }]}
      />
    ),
    image: "company-background-2.png",
  },
  malls: {
    title: MALLS.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: MALLS.name }]} />
    ),
    image: "mall-header-bg.png",
  },
  townscapes: {
    title: TOWNSCAPES.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: TOWNSCAPES.name }]} />
    ),
    image: "townscapes-header-bg.png",
  },
  mixedUseEstates: {
    title: MIXEDUSE_ESTATES.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: MIXEDUSE_ESTATES.name }]} />
    ),
    image: "mixed-use-header-bg.png",
    imageSmall: "mixed-use-header-bg-small.png",
  },
  industrial: {
    title: INDUSTRIAL.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: INDUSTRIAL.name }]} />
    ),
    image: "industrial-header-bg.png",
  },
  coliving: {
    title: COLIVING.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: COLIVING.name }]} />
    ),
    image: "coliving-header-bg.png",
  },
};
