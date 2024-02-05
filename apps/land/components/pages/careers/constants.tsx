import Breadcrumbs from "../../header/Breadcrumbs";
import ROUTES from "@/helpers/routes";

const { HOME, CAREERS } = ROUTES;

const BREADCRUMBS = [
  {
    title: HOME.name,
    link: HOME.url,
  },
];

const headerImage = "careers.png";

export const HEADER_INFO = {
  careers: {
    title: CAREERS.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: CAREERS.name }]} />
    ),
    image: headerImage,
  },
};
