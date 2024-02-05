import { Navigation, NavigationMenu, NavigationSubMenu } from "shared-types";
import AboutUs from "../../menu/AboutUs";
import OurBusinesses from "../../menu/OurBusinesses";
import Residences from "../../menu/Residences";
import InvestorRelations from "../../menu/InvestorRelations";

const formatNavigations = (navigations: Navigation) => {
  return navigations.mainMenu.map((menu: NavigationMenu) => {
    const subMenus =
      menu.subMenu && menu.subMenu.length > 0
        ? menu.subMenu.map((sub: NavigationSubMenu) => {
          let link = sub.link.url;
          let target = "";
          if (menu.link.label === "Residences") {
            if (sub?.link.description?.includes("Browse By Property Type")) {
              link = `/projects?propertyType=${sub?.link.label}`;
            } else if (
              sub?.link.description?.includes("Browse By Location")
            ) {
              link = `/projects?group=${sub?.link.label}`;
            } else if (sub?.link.description?.includes("Browse By Brand")) {
              if (sub.link.label === "Filinvest") {
                link = `/projects?brand=${sub?.link.label}`;
              } else {
                link = sub?.link.url;
                target = "_blank";
              }
            }
          }

          return {
            title: sub.link.label,
            subTitle: sub.link.description,
            link,
            featured: sub.selectedFeatures === "news" ? sub.newsFeaturedSlug : sub.projectFeaturedSlug,
            newTab: sub.link.newTab ? true : false,
            target,
          };
        })
        : undefined;
    let wideMenuComponent;
    if (menu.link.label === "About Us") {
      wideMenuComponent = (
        <AboutUs
          aboutUsMenu={subMenus}
          firstAwards={menu.firstNewsFeaturedSlug}
          secondAwards={menu.secondNewsFeaturedSlug}
        />
      );
    } else if (menu.link.label.toLowerCase().includes("businesses")) {
      wideMenuComponent =
        <OurBusinesses ourBusinessesMenu={subMenus}
          propertyTypes={menu.browseByPropertyType}
          brandsTypes={menu.browseByBrand}
          locationGroupTypes={menu.browseByLocation} />;
    } else if (menu.link.label.toLowerCase().includes("residences")) {
      wideMenuComponent = (
        <Residences
          featuredType={menu.selectedFeatures}
          property={
            menu?.selectedFeatures === "news"
              ? menu.newsFeaturedSlug
              : menu.projectFeaturedSlug
          }
          propertyTypes={menu.browseByPropertyType}
          brandsTypes={menu.browseByBrand}
          locationGroupTypes={menu.browseByLocation}
        />
      );
    } else if (menu.link.label === "Investor Relations") {
      wideMenuComponent = (
        <InvestorRelations
          investorRelationsMenu={subMenus}
          news={menu.newsFeaturedSlug}
        />
      );
    }
    const isLink = !subMenus || subMenus.length === 0 ? true : undefined;
    const link = menu.link && menu.link.url !== "#" ? menu.link.url : undefined;
    const singleMenu = {
      text: menu.link.label,
      ...(isLink && { isLink }),
      ...(wideMenuComponent && { fullComponent: wideMenuComponent }),
      ...(subMenus && { subMenus }),
      ...(link && { link }),
      newTab: menu.link.newTab ? true : false,
    };
    return singleMenu;
    // TODO: fix type for this
  }) as any;
};

export default formatNavigations;
