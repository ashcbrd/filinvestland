import Breadcrumbs from "../../header/Breadcrumbs";
import ROUTES from "@/helpers/routes";

const { HOME, BUYERS } = ROUTES;
const { CALCULATOR } = BUYERS;

const BREADCRUMBS = [
  {
    title: HOME.name,
    link: HOME.url,
  },
  {
    title: BUYERS.name,
    link: BUYERS.url,
  },
];

export const HEADER_INFO = {
  contactUs: {
    title: CALCULATOR.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: CALCULATOR.name }]} />
    ),
  },
};
