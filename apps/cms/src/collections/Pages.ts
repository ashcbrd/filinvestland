import { CollectionConfig } from "payload/types";
import {
  HomeHeroSection,
  HomeProjectsSection,
  HomePropertySearchSection,
  HomeOurBusinessesSection,
  HomeOurServicesSection,
  HomeAboutUsSection,
  HomeNewsStoriesSection,
  HomeInvestorRelationSection,
  HomeStockReportSection,
  HomeFloatingButtons,
} from "../blocks/Home";
import {
  StockInformationTitle,
  StockInformationStockHolderTable,
  StockInformationOutstandingNumberOfShares,
} from "../blocks/StockInformation";
import {
  StructuresChartImage,
  StructuresChartTable,
  StructuresTitleText,
  StructuresDownloadButton,
} from "../blocks/Structures";
import { DisclosuresTable } from "../blocks/Disclosures";
import { PressReleasesAwards } from "../blocks/PressReleases";
import {
  InvestorRelationsProgramsPrograms,
  InvestorRelationsProgramsImage,
} from "../blocks/InvestorRelationsPrograms";
import {
  FinancialHighlightsTable,
  FinancialHighlightsLegends,
  FinancialHighlightsFinancialStatements,
  FinancialHighlightsChartImage,
  FinancialHighlightsAnnualReports,
} from "../blocks/FinancialHighlights";
import { Presentations } from "../blocks/Presentations";
import {
  ManualCorporateGovernance,
  CodeOfBusinessConductAndEthics,
  AnnualCorporateGovernanceAndReport,
  CorporateSocialResponsibilityTitleText,
  CorporateSocialResponsibilityEnvironmentalPreservation,
  CorporateSocialResponsibilityPrograms,
  CompanyPoliciesPolicy,
  BoardCommitteesTitleYear,
  BoardCommitteesSeniorManagementOfficers,
  BoardCommitteesBoardCommittees,
  BoardCommitteesKeyOfficers,
  EnterpriseRiskManagementTable,
  BoardCommitteesCharter,
} from "../blocks/CorporateGovernance";
import { CoLivingTitleText, CoLivingCoLiving } from "../blocks/CoLiving";
import {
  IndustrialTitleText,
  IndustrialIndustrial,
} from "../blocks/Industrial";
import {
  TownscapesTitleText,
  TownscapesTownscapes,
} from "../blocks/Townscapes";
import { MallsTitleText, MallsMalls } from "../blocks/Malls";
import { OfficeParksOfficeParks } from "../blocks/OfficeParks";
import { OfficesOfficeParks, OfficesOffices } from "../blocks/Offices";
// import { CorporateCenters } from "../blocks/CorporateCenters";
import { SubsidiariesCompanies } from "../blocks/Subsidiaries";
import {
  PusongFilinvestOurStory,
  PusongFilinvestCorporateSocialResponsibility,
  PusongFilinvestGallery,
} from "../blocks/PusongFilinvest";
import {
  DreamsBuiltGreenIconText,
  DreamsBuiltGreenTitleText,
  DreamsBuiltGreenMediaSection,
} from "../blocks/DreamsBuiltGreen";
import { VisionMissionCoreValues } from "../blocks/VisionMissionCoreValues";
import {
  CompanyBackgroundIconText,
  CompanyBackgroundImageText,
  CompanyBackgroundVideo,
} from "../blocks/CompanyBackground";
import {
  OurLeadershipBoardOfDirectors,
  OurLeadershipSeniorManagementTeam,
} from "../blocks/OurLeadership";
import { FilPayOnlinePaymentsSection } from "../blocks/FilPay";
import {
  MixedUsedEstatesTitleText,
  MixedUsedEstatesMixedUsedEstates,
} from "../blocks/MixedUseEstates";
import { NewsNews } from "../blocks/News";
import {
  ResidentialTitleText,
  ResidentialPrestige,
  ResidentialAspire,
  ResidentialFutura,
  ResidentialSlider,
} from "../blocks/Residential";
import { CareersCallHr, CareersImageText } from "../blocks/Careers";
import { AnnualReports } from "../blocks/AnnualReports";
import {
  DividendHistory,
  DividendHistoryTable,
} from "../blocks/DividendHistory";
import { DividendPolicy } from "../blocks/DividendPolicy";
import { ContactUs } from "../blocks/ContactUs";
import {
  InvestorRelationsBoxLinks,
  InvestorRelationsFinancialHighlights,
  InvestorRelationsLinks,
} from "../blocks/InvestorRelations";
import Header from "../blocks/Header";
import NextLink from "../blocks/NextLink";
import PreviousLink from "../blocks/PreviousLink";
import TermsText from "../blocks/TermsText";
import PrivacyPolicyText from "../blocks/PrivacyPolicyText";
import Sitemap from "../blocks/Sitemap";
import InvestorRelationsResearchReports from "../blocks/InvestorRelations/InvestorRelationsResearchReports";
import { Permissions, getPermission } from "../access/Permission";
import { slugField } from "../fields/slug";
import { isVisible } from "../access/isAdminOrEditor";
import { NewsCover } from "../blocks/News";
import { InvestorRelationsStockInformation } from "../blocks/InvestorRelations";
import RichTextBlock from "../blocks/blocks/RichTextBlock";
import FilesListing from "../blocks/blocks/FilesListing";
import AdvancedFilesListing from "../blocks/blocks/AdvancedFilesListing";
import link from "../fields/link";

export const Pages: CollectionConfig = {
  slug: "pages",
  versions: {
    drafts: false,
  },

  access: {
    create: getPermission(Permissions.admin | Permissions.editor),
    update: getPermission(Permissions.admin | Permissions.editor),
    read: () => true,
    delete: getPermission(Permissions.admin | Permissions.editor),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },

    {
      name: "pageType",
      type: "select",
      required: true,
      options: [
        {
          label: "Block Type",
          value: "blockType",
        },
        {
          label: "Field Type",
          value: "fieldType",
        }
      ],
      admin: {
        position: "sidebar",
      },
      defaultValue: 'blockType'
    },
    {
      name: "urlPath",
      type: "text",
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.pageType === "fieldType"
      }
    },
    {
      name: 'useAdvancedHeader',
      label:"Use advanced header",
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: "header",
      type: 'group',
      fields: [
        {
          type: "upload",
          name: "coverImage",
          relationTo: "files",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          type: "array",
          name: "breadcrumbs",
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
        {
          type: "array",
          name: "tabs",
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.pageType === "fieldType" && siblingData.useAdvancedHeader === true,
        style:{marginTop:'50px'}
      }
    },
    {
      name: "dynamicContent",
      type: "blocks",
      required: true,
      blocks: [
        RichTextBlock,
        // AdvancedFilesListing,
        FilesListing
      ],
      admin: {
        condition: (_, siblingData) => siblingData.pageType === "fieldType"
      }
    },

    {
      name: "content",
      type: "blocks",
      required: true,
      blocks: [
        Header,
        HomeHeroSection,
        HomeProjectsSection,
        HomePropertySearchSection,
        HomeOurBusinessesSection,
        HomeOurServicesSection,
        HomeAboutUsSection,
        HomeNewsStoriesSection,
        HomeInvestorRelationSection,
        HomeStockReportSection,
        HomeFloatingButtons,
        MallsTitleText,
        MallsMalls,
        OfficeParksOfficeParks,
        OfficesOfficeParks,
        OfficesOffices,
        SubsidiariesCompanies,
        PusongFilinvestOurStory,
        PusongFilinvestCorporateSocialResponsibility,
        PusongFilinvestGallery,
        DreamsBuiltGreenIconText,
        DreamsBuiltGreenTitleText,
        DreamsBuiltGreenMediaSection,
        VisionMissionCoreValues,
        CompanyBackgroundIconText,
        CompanyBackgroundImageText,
        StockInformationTitle,
        StockInformationOutstandingNumberOfShares,
        StockInformationStockHolderTable,
        StructuresChartImage,
        StructuresChartTable,
        StructuresTitleText,
        StructuresDownloadButton,
        DisclosuresTable,
        PressReleasesAwards,
        InvestorRelationsProgramsPrograms,
        InvestorRelationsProgramsImage,
        FinancialHighlightsTable,
        FinancialHighlightsLegends,
        FinancialHighlightsFinancialStatements,
        FinancialHighlightsChartImage,
        FinancialHighlightsAnnualReports,
        Presentations,
        ManualCorporateGovernance,
        CodeOfBusinessConductAndEthics,
        AnnualCorporateGovernanceAndReport,
        CorporateSocialResponsibilityTitleText,
        CorporateSocialResponsibilityEnvironmentalPreservation,
        CorporateSocialResponsibilityPrograms,
        CompanyPoliciesPolicy,
        BoardCommitteesTitleYear,
        BoardCommitteesSeniorManagementOfficers,
        BoardCommitteesBoardCommittees,
        BoardCommitteesKeyOfficers,
        BoardCommitteesCharter,
        EnterpriseRiskManagementTable,
        FilPayOnlinePaymentsSection,
        MixedUsedEstatesTitleText,
        MixedUsedEstatesMixedUsedEstates,
        CoLivingTitleText,
        CoLivingCoLiving,
        IndustrialTitleText,
        IndustrialIndustrial,
        TownscapesTitleText,
        TownscapesTownscapes,
        PreviousLink,
        NextLink,
        OurLeadershipBoardOfDirectors,
        OurLeadershipSeniorManagementTeam,
        NewsNews,
        NewsCover,
        ResidentialTitleText,
        ResidentialPrestige,
        ResidentialAspire,
        ResidentialFutura,
        ResidentialSlider,
        TermsText,
        CareersCallHr,
        CareersImageText,
        ContactUs,
        AnnualReports,
        DividendHistory,
        DividendHistoryTable,
        DividendPolicy,
        InvestorRelationsBoxLinks,
        InvestorRelationsFinancialHighlights,
        InvestorRelationsLinks,
        InvestorRelationsResearchReports,
        InvestorRelationsStockInformation,
        PrivacyPolicyText,
        Sitemap,
        CompanyBackgroundVideo,
      ],
      admin: {
        condition: (_, siblingData) => siblingData.pageType === "blockType"
      }
    },
    {
      name: "site",
      type: "relationship",
      relationTo: "sites",
      required: true,
      // If user is not admin, set the site by default
      // to the first site that they have access to
      defaultValue: ({ user }) => {
        if (!user.roles.includes("admin") && user.sites?.[0]) {
          return user.sites[0];
        }
      },
    },
    {
      name: "_status",
      label: "Status",
      type: "select",
      defaultValue: "published",
      hidden: true,
      options: ["unpublished", "published"],
    },
    {
      name: "previewWebsiteLink",
      type: "text",
      required: false,
      admin: {
        condition: (_, siblingData) => siblingData.pageType === "blockType"
      }
    },
  ],
  admin: {
    useAsTitle: "title",
    group: "Filinvest",
    preview: (doc: any) => {
      if (doc?.previewWebsiteLink) {
        const preview = doc?.previewWebsiteLink;
        const regex = /https?:\/\/\S+/g;
        const matches = preview.match(regex);
        return matches
          ? preview
          : `${process.env.PAYLOAD_PUBLIC_LAND_URL}/${doc.previewWebsiteLink}`;
      }
      return null;
    },
    hidden: ({ user }) => {
      return !isVisible("read", "pages", "63db1aca51fa9424f93f6591", user);
    },
  },
};
