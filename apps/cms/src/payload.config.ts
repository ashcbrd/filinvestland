import { buildConfig } from "payload/config";
import path from "path";
import seo from "@payloadcms/plugin-seo";

import { Users } from "./collections/Users";
import { Sites } from "./collections/Sites";
// import { Awards } from "./collections/Awards";
import { Files } from "./collections/Files";
import { Pages } from "./collections/Pages";
import { News } from "./collections/News";
import { FuturaNews } from "./collections/Futura/FuturaNews";
import { PrestigeNews } from "./collections/Prestige/PrestigeNews";
import { AspireNews } from "./collections/Aspire/AspireNews";
import { Projects } from "./collections/Projects";

// brands projects
import { AspireProjects } from "./collections/Aspire/AspireProjects";
import { FuturaProjects } from "./collections/Futura/FuturaProjects";
import { PrestigeProjects } from "./collections/Prestige/PrestigeProjects";

import { PrestigePages } from "./collections/Prestige/PrestigePages";
import { PrestigeFeaturedVirtualTours } from "./collections/Prestige/PrestigeFeaturedVirtualTours";
import { AspirePages } from "./collections/Aspire/AspirePages";
import { FuturaPages } from "./collections/Futura/FuturaPages";

import { AspireFeaturedProjects } from "./collections/Aspire/AspireFeaturedProjects";
import { FuturaFeaturedProjects } from "./collections/Futura/FuturaFeaturedProjects";
import { PrestigeFeaturedProjects } from "./collections/Prestige/PrestigeFeaturedProjects";

import { FuturaFeaturedNews } from "./collections/Futura/FuturaFeaturedNews";
import { PrestigeFeaturedNews } from "./collections/Prestige/PrestigeFeaturedNews";

// import { Careers } from "./collections/Careers";

import { CareerCategories } from "./collections/CareerCategories";
import { ProjectCategories } from "./collections/ProjectCategories";
import { PropertyCategories } from "./collections/PropertyCategories";
import { LocationGroupCategories } from "./collections/LocationGroupCategories";
import { LocationCategories } from "./collections/LocationCategories";
import { SubLocationCategories } from "./collections/SubLocationCategories";
import { ProjectStatusCategories } from "./collections/ProjectStatusCategories";
import { StockHistories } from "./collections/StockHistories";

import {
  Navigation,
  AspireNavigation,
  PrestigeNavigation,
  FuturaNavigation,
} from "./globals/Navigation";
import { AspireFeaturedNews } from "./collections/Aspire/AspireFeaturedNews";
import {
  Footer,
  AspireFooter,
  PrestigeFooter,
  FuturaFooter,
} from "./globals/Footer";

import Logo from "./graphics/Logo";
import Icon from "./graphics/Icon";
import {
  PropertySearch,
  AspirePropertySearch,
  PrestigePropertySearch,
  FuturaPropertySearch,
} from "./globals/PropertySearch";
import { NewsCategories } from "./collections/NewsCategories";
import { ManatalCareers } from "./collections/ManatalCareers";
import { FeatureCategories } from "./collections/FeaturesAndAmenities";
import { FloatingMenu } from "./globals/FloatingMenu";
import { PressRelease } from "./collections/PressRelease";
import { DisclosureCategories } from "./collections/DisclosureCategories";
import { Disclosure } from "./collections/Disclosure";
import { PlaceCategories } from "./collections/PlaceCategories";
import { AspireFloatingMenu, PrestigeFloatingMenu, FuturaFloatingMenu } from "./globals/FloatingMenu";
import { DynamicPages } from "./collections/DynamicPages";

export default buildConfig({
  cors: "*",
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, "styles/custom.scss"),
    meta: {
      titleSuffix: "- Filinvest CMS",
      favicon: "/assets/filinvest-cms-logo.png",
      ogImage: "/assets/filinvest-cms-logo.png",
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
  },
  collections: [
    News,
    PressRelease,
    Disclosure,
    Projects,
    Pages,
    // DynamicPages,
    AspireNews,
    PrestigeNews,
    // Awards,
    // Careers,
    AspireProjects,
    AspirePages,
    PrestigeProjects,
    PrestigePages,
    FuturaNews,
    FuturaProjects,
    FuturaPages,
    Users,
    Sites,
    CareerCategories,
    DisclosureCategories,
    ProjectCategories,
    NewsCategories,
    PropertyCategories,
    LocationGroupCategories,
    LocationCategories,
    SubLocationCategories,
    ProjectStatusCategories,
    FeatureCategories,
    PlaceCategories,
    Files,
    StockHistories,
    ManatalCareers

  ],
  plugins: [
    seo({
      collections: [
        "news",
        "projects",
        "pages",
        "aspire-news",
        "aspire-projects",
        "aspire-pages",
        "prestige-news",
        "prestige-projects",
        "prestige-pages",
        "futura-news",
        "futura-projects",
        "futura-pages",
      ],
      uploadsCollection: "files",
    })
  ],
  globals: [
    FuturaFeaturedProjects,
    FuturaFeaturedNews,
    FuturaPropertySearch,
    PrestigeFeaturedProjects,
    PrestigeFeaturedVirtualTours,
    PrestigeFeaturedNews,
    PrestigePropertySearch,
    AspireFeaturedProjects,
    AspireFeaturedNews,
    AspirePropertySearch,
    PropertySearch,
    Navigation,
    AspireNavigation,
    FuturaNavigation,
    PrestigeNavigation,
    Footer,
    AspireFooter,
    PrestigeFooter,
    FuturaFooter,
    FloatingMenu,
    AspireFloatingMenu,
    PrestigeFloatingMenu,
    FuturaFloatingMenu
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});
