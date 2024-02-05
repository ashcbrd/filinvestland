import Breadcrumbs from "../../header/Breadcrumbs";
import ROUTES from "@/helpers/routes";

const { HOME, CONTACT_US } = ROUTES;

const BREADCRUMBS = [
  {
    title: HOME.name,
    link: HOME.url,
  },
];

const headerImage = "/contact-us.png";
const headerImageSmall = "/contact-us-small.png";

export const HEADER_INFO = {
  contactUs: {
    title: CONTACT_US.name,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: CONTACT_US.name }]} />
    ),
    image: headerImage,
    imageSmall: headerImageSmall,
  },
};
