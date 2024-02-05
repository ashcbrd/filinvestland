import ROUTES from "@/helpers/routes";

// STATIC VERSION OF MAIN NAVIGATION MENUS
// NOT ALL THESE ARE BEING USED
// OLD VERSION, CONVERTED TO CMS

export const menus = [
  {
    text: ROUTES.ABOUT_US.name,
    fullComponent: null,
    subMenus: [
      {
        title: ROUTES.ABOUT_US.COMPANY_BACKGROUND.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.ABOUT_US.COMPANY_BACKGROUND.url,
        newTab: false,
      },
      {
        title: ROUTES.ABOUT_US.MISSION_VISION.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.ABOUT_US.MISSION_VISION.url,
        newTab: false,
      },
      {
        title: ROUTES.ABOUT_US.DREAMS_BUILT_GREEN.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.ABOUT_US.DREAMS_BUILT_GREEN.url,
        newTab: false,
      },
      {
        title: ROUTES.ABOUT_US.PUSONG_FILINVEST.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.ABOUT_US.PUSONG_FILINVEST.url,
        newTab: false,
      },
      {
        title: ROUTES.ABOUT_US.SUBSIDIARIES.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.ABOUT_US.SUBSIDIARIES.url,
        newTab: false,
      },
      {
        title: ROUTES.ABOUT_US.STRUCTURES.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.ABOUT_US.STRUCTURES.url,
        newTab: false,
      },
      {
        title: ROUTES.ABOUT_US.OUR_LEADERSHIP.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.ABOUT_US.OUR_LEADERSHIP.url,
        newTab: false,
      },
    ],
  },
  {
    text: ROUTES.OUR_BUSINESSES.name,
    fullComponent: null,
    subMenus: [
      {
        title: ROUTES.OUR_BUSINESSES.RESIDENTIAL.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.OUR_BUSINESSES.RESIDENTIAL.url,
        newTab: false,
      },
      {
        title: ROUTES.OUR_BUSINESSES.CORPORATE_CENTERS.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.OUR_BUSINESSES.CORPORATE_CENTERS.url,
        newTab: false,
      },
      {
        title: ROUTES.OUR_BUSINESSES.OFFICES.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.OUR_BUSINESSES.OFFICES.url,
        newTab: false,
      },
      {
        title: ROUTES.OUR_BUSINESSES.MALLS.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.OUR_BUSINESSES.MALLS.url,
        newTab: false,
      },
      {
        title: ROUTES.OUR_BUSINESSES.INDUSTRIAL.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.OUR_BUSINESSES.INDUSTRIAL.url,
        newTab: false,
      },
      {
        title: ROUTES.OUR_BUSINESSES.COLIVING.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.OUR_BUSINESSES.COLIVING.url,
        newTab: false,
      },
      {
        title: ROUTES.OUR_BUSINESSES.MIXEDUSE_ESTATES.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.OUR_BUSINESSES.MIXEDUSE_ESTATES.url,
        newTab: false,
      },
    ],
  },
  {
    text: ROUTES.RESIDENCES.name,
    fullComponent: null,
    subMenus: [],
    newTab: false,
  },
  {
    text: ROUTES.SELLERS.name,
    subMenus: [
      {
        title: "Seller's Hub",
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.SELLERS.SELLER_HUB.url,
        newTab: false,
      },
      {
        title: "Seller Accreditation Tool",
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.SELLERS.SELLER_ACCREDITATION_TOOL.url,
        newTab: false,
      },
    ],
  },
  {
    text: ROUTES.BUYERS.name,
    subMenus: [
      {
        title: ROUTES.BUYERS.CALCULATOR.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.BUYERS.CALCULATOR.url,
        newTab: false,
      },
      {
        title: ROUTES.BUYERS.ONLINE_APPOINTMENT.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.BUYERS.ONLINE_APPOINTMENT.url,
        newTab: false,
      },
      {
        title: ROUTES.BUYERS.FILPAY.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.BUYERS.FILPAY.url,
        newTab: false,
      },
      {
        title: ROUTES.BUYERS.MYHOME.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.BUYERS.MYHOME.url,
        newTab: false,
      },
    ],
  },
  {
    text: ROUTES.NEWS.name,
    isLink: true,
    link: ROUTES.NEWS.url,
    newTab: false,
  },
  {
    text: ROUTES.PUSONG_FILINVEST.name,
    isLink: true,
    link: ROUTES.PUSONG_FILINVEST.url,
    newTab: false,
  },
  {
    text: ROUTES.INVESTOR_RELATIONS.name,
    fullComponent: null,
    subMenus: [
      {
        title: ROUTES.INVESTOR_RELATIONS.OUR_COMPANY.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.INVESTOR_RELATIONS.OUR_COMPANY.url,
        newTab: false,
      },
      {
        title: ROUTES.INVESTOR_RELATIONS.OUR_LEADERSHIP.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.INVESTOR_RELATIONS.OUR_LEADERSHIP.url,
        newTab: false,
      },
      {
        title: ROUTES.INVESTOR_RELATIONS.STRUCTURES.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.INVESTOR_RELATIONS.STRUCTURES.url,
        newTab: false,
      },
      {
        title: ROUTES.INVESTOR_RELATIONS.CORPORATE_GOVERNANCE.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.INVESTOR_RELATIONS.CORPORATE_GOVERNANCE.url,
        newTab: false,
      },
      {
        title: ROUTES.INVESTOR_RELATIONS.INVESTOR_RELATIONS_PROGRAM.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.INVESTOR_RELATIONS.INVESTOR_RELATIONS_PROGRAM.url,
        newTab: false,
      },
      {
        title: ROUTES.INVESTOR_RELATIONS.STOCK_INFORMATION.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.INVESTOR_RELATIONS.STOCK_INFORMATION.url,
        newTab: false,
      },
      {
        title: ROUTES.INVESTOR_RELATIONS.FINANCIAL_HIGHLIGHTS.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.INVESTOR_RELATIONS.FINANCIAL_HIGHLIGHTS.url,
        newTab: false,
      },
      {
        title: ROUTES.INVESTOR_RELATIONS.PRESS_RELEASES.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.INVESTOR_RELATIONS.PRESS_RELEASES.url,
        newTab: false,
      },
      {
        title: ROUTES.INVESTOR_RELATIONS.PRESENTATIONS.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.INVESTOR_RELATIONS.PRESENTATIONS.url,
        newTab: false,
      },
      {
        title: ROUTES.INVESTOR_RELATIONS.RESEARCH_REPORTS.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.INVESTOR_RELATIONS.RESEARCH_REPORTS.url,
        newTab: false,
      },
      {
        title: ROUTES.INVESTOR_RELATIONS.DISCLOSURES.name,
        subTitle: "Lorem ipsum volpar makeri totga ginuis",
        link: ROUTES.INVESTOR_RELATIONS.DISCLOSURES.url,
        newTab: false,
      },
    ],
  },
];
