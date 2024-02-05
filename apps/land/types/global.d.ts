export type T_Locations = {
  [k: string]: string[];
};

export type T_SearchQuery = {
  propertyType?: string;
  location?: string;
  unitSize?: string;
  bedrooms?: string;
  unitSizeFrom?: string | number;
  unitSizeTo?: string | number;
  priceRangeFrom?: string | number;
  priceRangeTo?: string | number;
  priceRange?: number[];
  brand?: string;
  bedroomsFrom?: string | number;
  bedroomsTo?: string | number;
  propertyName?: string;
  subLocation?: string;
  projectType?: string;
  locationGroup?: string;
  page?:number
};

export type T_Brands = "Land" | "Prestige" | "Futura" | "Aspire";

export interface T_ManatalCareerJob {
  id: number;
  _hash: string;
  organization_name: string;
  position_name: string;
  description: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zipcode: string;
  location_display: string;
  is_salary_visible: boolean;
  is_remote?: any;
  contract_details: string;
  is_pinned_in_career_page: boolean;
}

export interface Site {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
}

export interface File {
  id: string;
  alt: string;
  site: string | Site;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  createdAt: string;
  updatedAt: string;
}

export interface InvestorRelationSection {
  title: string;
  subTitle: string;
  description: string;
  learnMoreLink: string;
  sliderItems: {
    sliderItem: {
      logo: File;
      title: string;
      cost: string;
      year: string;
      id?: string;
    }[];
    id?: string;
  }[];
  id?: string;
  blockName?: string;
  blockType: "homeInvestorRelationSection";
}

export interface ArrayResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
