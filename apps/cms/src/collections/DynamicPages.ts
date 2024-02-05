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

export const DynamicPages: CollectionConfig = {
    slug: "dynamic-pages",
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
            name: "pageTitle",
            type: "text",
            required: true,
        },
        {
            name: "urlPath",
            type: "text",
            required: true,
        },
        {
            name: "content",
            type: "blocks",
            required: true,
            blocks: [
                RichTextBlock
            ],
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
        },
    ],
    admin: {
        useAsTitle: "pageTitle",
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
