import Breadcrumbs from "../../header/Breadcrumbs";
import ROUTES from "@/helpers/routes";

const { HOME, PUSONG_FILINVEST } = ROUTES;

const BREADCRUMBS = [
  {
    title: HOME.name,
    link: HOME.url,
  },
];

const headerImage = "pusong-filinvest.png";
const headerImageSmall = "pusong-filinvest-small.png";
const customTitle = "#PusongFilinvest";

export const HEADER_INFO = {
  pusongFilinvest: {
    title: customTitle,
    breadcrumbs: (
      <Breadcrumbs items={[...BREADCRUMBS, { title: PUSONG_FILINVEST.name }]} />
    ),
    imageSmall: headerImageSmall,
    image: headerImage,
  },
};
